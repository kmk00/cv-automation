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
      const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
      this.oAuth2Client.setCredentials(token);
    } else {
      throw new Error("No token found, please authenticate via /auth/login");
    }

    this.drive = google.drive({ version: "v3", auth: this.oAuth2Client });
  }

  async uploadFile(filePath: string, fileName: string) {
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

    const shareableLink = `https://drive.google.com/file/d/${fileId}/view`;
    return {
      webViewLink: shareableLink,
      fileId,
      fileName,
    };
  }
}

export default GoogleDriveService;
