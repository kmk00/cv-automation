import fs from "fs";
import path from "path";
import latex from "node-latex";

async function generateCV(fastify, options) {
  fastify.post("/api/generate-cv", async (request, reply) => {
    const inputPath = path.resolve("src/data/generatedCV/main.tex");
    const outputPath = path.resolve("src/data/generatedCV/main.pdf");

    try {
      const input = fs.createReadStream(inputPath);
      const output = fs.createWriteStream(outputPath);

      const pdfStream = latex(input, {
        cmd: "F:\\Latex\\miktex\\bin\\x64\\pdflatex.exe", // TODO: FIX PATH
      });

      pdfStream.pipe(output);

      let replied = false;

      const handleError = (err) => {
        if (!replied) {
          replied = true;
          console.error("PDF generation error:", err);
          return { message: "PDF generation error" };
        }
      };

      const handleFinish = () => {
        if (!replied) {
          replied = true;
          return { message: "CV generated successfully" };
        }
      };

      pdfStream.on("error", handleError);
      output.on("error", handleError);
      output.on("finish", handleFinish);
    } catch (err) {
      console.error("Unexpected error:", err);
      return { message: "Unexpected error" };
    }
  });
}

export default generateCV;
