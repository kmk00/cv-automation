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
      return reply.code(400).send({ error: "Missing code" });
    }

    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      reply.send("✅ Auth successful! You can close this window.");
    } catch (error) {
      reply.code(500).send({ error: "Failed to get token", details: error });
    }
  });
}
