import fs from "fs";
import path from "path";
import GoogleDriveService from "../services/GoogleDriveService";

async function uploadCV(fastify, options) {
  fastify.get("/api/upload-cv", async (request, reply) => {
    try {
      const fileName = request.query.fileName;

      if (!fileName) {
        return reply.code(400).send({
          error: "fileName query parameter is required",
        });
      }

      const filePath = path.join("src/data/generatedCV", fileName);

      if (!fs.existsSync(filePath)) {
        return reply.code(404).send({
          error: "File not found",
          filePath: filePath,
        });
      }

      let driveService;
      try {
        driveService = new GoogleDriveService();
      } catch (error) {
        console.error("Failed to initialize Google Drive service:", error);

        console.log("🔄 Auto-redirecting to authentication...");
        return reply.redirect("/auth/login");
      }

      const result = await driveService.uploadFile(filePath, fileName);

      try {
        fs.unlinkSync(filePath);
        console.log(`✅ Deleted uploaded CV file: ${fileName}`);
      } catch (deleteError) {
        console.warn(
          `⚠️ Failed to delete uploaded CV file ${fileName}:`,
          deleteError.message
        );
      }

      reply.send({
        success: true,
        message: "CV uploaded successfully",
        cvLink: result.webViewLink,
        fileId: result.fileId,
        fileName: result.fileName,
      });
    } catch (error) {
      console.error("Upload error:", error);

      if (
        error.message?.includes("Authentication") ||
        error.message?.includes("invalid_grant")
      ) {
        console.log("🔄 Authentication failed, auto-redirecting to login...");
        return reply.redirect("/auth/login");
      }

      if (error.code === 403) {
        return reply.code(403).send({
          error: "Permission denied",
          message: "Check your Google Drive API permissions and folder access",
          details: error.message,
        });
      }

      if (error.code === 404) {
        return reply.code(404).send({
          error: "Resource not found",
          message: "Google Drive folder or file not found",
          details: error.message,
        });
      }

      return reply.code(500).send({
        error: "Upload failed",
        message: "An unexpected error occurred during upload",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });
    }
  });
}

export default uploadCV;
