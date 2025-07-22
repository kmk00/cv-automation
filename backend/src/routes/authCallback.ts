import fs from "fs";
import path from "path";
import { google } from "googleapis";

const TOKEN_PATH = path.resolve("src/data/token.json");

const client_id = process.env.GOOGLE_CLIENT_ID!;
const client_secret = process.env.GOOGLE_SECRET_KEY!;
const redirect_uri = process.env.GOOGLE_REDIRECT_URI!;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
);

export default function authRoutes(fastify, options) {
  fastify.get("/auth/status", async (request, reply) => {
    try {
      if (!fs.existsSync(TOKEN_PATH)) {
        return reply.send({
          authenticated: false,
          message: "No token found",
        });
      }

      const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
      oAuth2Client.setCredentials(token);

      await oAuth2Client.getAccessToken();

      reply.send({
        authenticated: true,
        message: "Token is valid",
        tokenInfo: {
          hasAccessToken: !!token.access_token,
          hasRefreshToken: !!token.refresh_token,
          expiryDate: token.expiry_date,
        },
      });
    } catch (error) {
      console.error("Token validation failed:", error);

      if (fs.existsSync(TOKEN_PATH)) {
        fs.unlinkSync(TOKEN_PATH);
      }

      reply.send({
        authenticated: false,
        message: "Token is invalid or expired",
        error: error.message,
      });
    }
  });

  fastify.get("/auth/login", async (request, reply) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/drive.file"],
      prompt: "consent",
    });
    reply.redirect(authUrl);
  });

  fastify.get("/auth/callback", async (request, reply) => {
    const code = request.query.code;

    if (!code) {
      return reply.code(400).send({ error: "Missing authorization code" });
    }

    try {
      const { tokens } = await oAuth2Client.getToken(code);

      // Ensure we have both access and refresh tokens
      if (!tokens.access_token || !tokens.refresh_token) {
        throw new Error("Incomplete token response from Google");
      }

      oAuth2Client.setCredentials(tokens);

      // Ensure directory exists
      const tokenDir = path.dirname(TOKEN_PATH);
      if (!fs.existsSync(tokenDir)) {
        fs.mkdirSync(tokenDir, { recursive: true });
      }

      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
      console.log("✅ New tokens saved successfully");

      reply.redirect(process.env.FRONTEND_URL!);
    } catch (error) {
      console.error("Token exchange failed:", error);
      reply.code(500).send({
        error: "Failed to exchange authorization code for tokens",
        details: error.message,
        authenticated: false,
      });
    }
  });

  // Route to manually revoke and clear tokens
  fastify.post("/auth/revoke", async (request, reply) => {
    try {
      if (fs.existsSync(TOKEN_PATH)) {
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
        oAuth2Client.setCredentials(token);

        // Revoke the token with Google
        await oAuth2Client.revokeCredentials();

        // Delete local token file
        fs.unlinkSync(TOKEN_PATH);
      }

      reply.send({ message: "Tokens revoked successfully" });
    } catch (error) {
      console.error("Token revocation failed:", error);

      // Still delete local file even if revocation failed
      if (fs.existsSync(TOKEN_PATH)) {
        fs.unlinkSync(TOKEN_PATH);
      }

      reply.send({
        message: "Local tokens cleared (revocation may have failed)",
        error: error.message,
      });
    }
  });
}
