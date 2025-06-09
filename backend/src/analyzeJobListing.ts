import OpenAI from "openai";
import personalInfoData from "./data/personal-information.json";
import "dotenv/config";

async function analyzeJobListing(fastify, options) {
  fastify.post("/api/analyze-job-listing", async (request, reply) => {
    const { jobListing } = request.body;

    if (!jobListing) {
      throw new Error("Job listing is required");
    }

    const prompt = createPrompt(
      jobListing,
      "pl",
      JSON.stringify(personalInfoData)
    );

    const apiResponse = await queryOpenAI(prompt);

    return { data: apiResponse };
  });
}

const createPrompt = (
  jobListing: string,
  language: string,
  personalInfo: string
) => {
  if (language === "pl") {
    return `Zaktualizuj mój JSON z informacjami aby jak najbardziej pasował do podanej oferty pracy. Możesz zmodyfikować niektóre zadania, które wykonywałem aby bardziej pasowały do danej oferty. Bazuj na tych podanych danych, próbuj jednak napisać to w jak najlepszy sposób aby było czytelne dla systemów ats. Nie dodawaj nowych obiektów w education, work_experience, projects.\n\nJSON: ${personalInfo}\n\nOferta pracy: ${jobListing} Zwróć tylko poprawny JSON.`;
  }

  return `Zaktualizuj mój JSON z informacjami aby jak najbardziej pasował do podanej oferty pracy. Możesz zmodyfikować niektóre zadania, które wykonywałem aby bardziej pasowały do danej oferty. Bazuj na tych podanych danych, próbuj jednak napisać to w jak najlepszy sposób aby było czytelne dla systemów ats. Nie dodawaj nowych obiektów w education, work_experience, projects.\n\nJSON: ${personalInfo}\n\nOferta pracy: ${jobListing}. Zapisz wszystko w języku angielskim. Zwróć tylko poprawny JSON.`;
};

const queryOpenAI = async (prompt: string) => {
  // !TODO: Prevent exceeding token limit
  try {
    const openAIClient = new OpenAI();
    const response = await openAIClient.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing job listing:", error);
    throw error;
  }
};

export default analyzeJobListing;
