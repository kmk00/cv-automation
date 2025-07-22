import fs from "fs";
import path from "path";
import { google } from "googleapis";

const TOKEN_PATH = path.resolve("src/data/token.json");

class GoogleDriveService {
  private drive: any;
  private oAuth2Client: any;

  constructor() {
    const client_id = process.env.GOOGLE_CLIENT_ID!;
    const client_secret = process.env.GOOGLE_SECRET_KEY!;
    const redirect_uri = process.env.GOOGLE_REDIRECT_URI!;

    this.oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uri
    );

    if (fs.existsSync(TOKEN_PATH)) {
      try {
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
        this.oAuth2Client.setCredentials(token);
        console.log("✅ Token loaded successfully");
      } catch (error) {
        console.error("❌ Failed to parse token file:", error.message);
        fs.unlinkSync(TOKEN_PATH);
        throw new Error(
          "Token file corrupted, please authenticate via /auth/login"
        );
      }
    } else {
      console.log("❌ No token found at:", TOKEN_PATH);
      throw new Error("No token found, please authenticate via /auth/login");
    }

    this.drive = google.drive({ version: "v3", auth: this.oAuth2Client });
  }

  private async ensureValidToken() {
    try {
      await this.oAuth2Client.getAccessToken();
    } catch (error) {
      console.error("Token refresh failed:", error);

      if (fs.existsSync(TOKEN_PATH)) {
        fs.unlinkSync(TOKEN_PATH);
        console.log("Deleted invalid token file");
      }

      throw new Error(
        "Authentication token is invalid or expired. Please re-authenticate by visiting /auth/login"
      );
    }
  }

  private async saveUpdatedTokens() {
    try {
      const credentials = this.oAuth2Client.credentials;
      if (credentials) {
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(credentials));
        console.log("Updated token saved");
      }
    } catch (error) {
      console.error("Failed to save updated token:", error);
    }
  }

  async uploadFile(filePath: string, fileName: string) {
    try {
      await this.ensureValidToken();

      const fileMetadata = {
        name: fileName,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
      };

      const media = {
        mimeType: "application/pdf",
        body: fs.createReadStream(filePath),
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: "id",
      });

      const fileId = response.data.id;

      await this.drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      await this.saveUpdatedTokens();

      const shareableLink = `https://drive.google.com/file/d/${fileId}/view`;
      return {
        webViewLink: shareableLink,
        fileId,
        fileName,
      };
    } catch (error) {
      console.error("Upload failed:", error);

      if (error.code === 401 || error.message?.includes("invalid_grant")) {
        throw new Error(
          "Authentication failed. Please re-authenticate by visiting /auth/login"
        );
      }

      throw error;
    }
  }
}

export default GoogleDriveService;
