import fs from "fs";
import path from "path";
import GoogleDriveService from "./GoogleDriveService"; // Update this path

async function uploadCV(fastify, options) {
  const driveService = new GoogleDriveService();

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
        });
      }

      const result = await driveService.uploadFile(filePath, fileName);

      try {
        fs.unlinkSync(filePath);
        console.log(`Deleted uploaded CV file: ${fileName}`);
      } catch (deleteError) {
        console.warn(
          `Failed to delete uploaded CV file ${fileName}:`,
          deleteError.message
        );
        // Continue execution even if deletion fails
      }

      reply.send({
        message: "CV uploaded successfully",
        cvLink: result.webViewLink,
        fileId: result.fileId,
        fileName: result.fileName,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return reply.code(500).send({
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
}

export default uploadCV;
