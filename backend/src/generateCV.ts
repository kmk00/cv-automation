import fs from "fs";
import path from "path";
import latex from "node-latex";
import handlebars from "handlebars";

async function generateCV(fastify, options) {
  fastify.post("/api/generate-cv", async (request, reply) => {
    const data = request.body;

    console.log("Generating CV...");
    console.log(data);

    const inputTemplatePath = path.resolve(
      "src/data/templates/mainCVTemplate.tex"
    );

    const PDFfileName = "CV_" + Date.now().toString() + ".pdf";

    const outputTexPath = path.resolve(`src/data/generatedCV/mainCV.tex`);
    const outputPDFPath = path.resolve(`src/data/generatedCV/${PDFfileName}`);

    try {
      const templateSource = fs.readFileSync(inputTemplatePath, "utf8");
      const compiledTemplate = handlebars.compile(templateSource, {
        data: data,
      });
      const renderedTex = compiledTemplate(data);

      fs.writeFileSync(outputTexPath, renderedTex);

      const input = fs.createReadStream(outputTexPath);
      const output = fs.createWriteStream(outputPDFPath);
      const pdfStream = latex(input, {
        cmd: "F:\\Latex\\miktex\\bin\\x64\\pdflatex.exe", // Your pdflatex path
      });

      let replied = false;

      pdfStream.pipe(output);

      const handleError = (err) => {
        if (!replied) {
          replied = true;
          console.error("PDF generation error:", err);
          reply.code(500).send({ error: "PDF generation failed" });
        }
      };

      const handleFinish = () => {
        if (!replied) {
          replied = true;
          reply.send({ message: "CV generated successfully." });
        }
      };

      pdfStream.on("error", handleError);
      output.on("error", handleError);
      output.on("finish", handleFinish);
    } catch (err) {
      console.error("Unexpected error:", err);
      reply.code(500).send({ error: "Unhandled server error" });
    }
    return { message: "CV generated successfully." };
  });
}

export default generateCV;
