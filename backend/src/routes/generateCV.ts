import fs from "fs";
import path from "path";
import latex from "node-latex";
import handlebars from "handlebars";

async function generateCV(fastify, options) {
  fastify.post("/api/generate-cv", async (request, reply) => {
    const data = request.body;

    const inputTemplatePath = path.resolve(
      "src/data/templates/mainCVTemplate.tex"
    );

    deleteOldCVs();

    const PDFfileName = "CV_" + Date.now().toString() + ".pdf";
    const outputTexPath = path.resolve("src/data/generatedCV/mainCV.tex");
    const outputPDFPath = path.resolve(`src/data/generatedCV/${PDFfileName}`);

    try {
      const templateSource = fs.readFileSync(inputTemplatePath, "utf8");

      const compiledTemplate = handlebars.compile(templateSource);
      const renderedTex = compiledTemplate(data.CVData);

      fs.writeFileSync(outputTexPath, renderedTex);

      const input = fs.createReadStream(outputTexPath);
      const output = fs.createWriteStream(outputPDFPath);
      const pdfStream = latex(input, {
        cmd: "F:\\Latex\\miktex\\bin\\x64\\pdflatex.exe", // ścieżka do pdflatex
      });

      pdfStream.pipe(output);

      // Wait for PDF generation to complete before sending response
      await new Promise((resolve, reject) => {
        pdfStream.on("end", () => {
          console.log("PDF generated successfully!");
          console.log(`PDF saved to: ${PDFfileName}`);
          resolve(null);
        });

        pdfStream.on("error", (error) => {
          console.error("PDF generation error:", error);
          reject(error);
        });

        output.on("error", (error) => {
          console.error("Output stream error:", error);
          reject(error);
        });
      });

      // Send response only after PDF is generated
      reply.send({ fileName: PDFfileName });
    } catch (err) {
      console.error("Unexpected error:", err);
      if (!reply.sent) {
        reply.code(500).send({ error: "Unhandled server error" });
      }
    }
  });
}

function deleteOldCVs() {
  const generatedCVDir = path.resolve("src/data/generatedCV");
  try {
    const files = fs.readdirSync(generatedCVDir);
    const cvFiles = files.filter(
      (file) => file.startsWith("CV_") && file.endsWith(".pdf")
    );

    if (!cvFiles) return;

    cvFiles.forEach((file) => {
      const filePath = path.join(generatedCVDir, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`Deleted old CV file: ${file}`);
      } catch (deleteError) {
        console.warn(
          `Failed to delete old CV file ${file}:`,
          deleteError.message
        );
      }
    });
  } catch (dirError) {
    console.warn("Could not read generated CV directory:", dirError.message);
  }
}

export default generateCV;
