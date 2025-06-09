import axios from "axios";

const TIME = 20000;

export const cvCreationApi = {
  analyzeJobListing: async (jobListing: string) => {
    if (!jobListing) {
      throw new Error("Job listing is required");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/analyze-job-listing",
        {
          jobListing,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to analyze job listing");
      }

      console.log("Job listing response from backend:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error analyzing job listing:", error);
      throw error;
    }
  },
  generateCv: async (jobListing: string) => {
    console.log("Generating CV...");
    await new Promise((resolve) => setTimeout(resolve, TIME));
    return "CV Data";
  },
  uploadCv: async (cvData: string) => {
    console.log("Uploading CV...");
    await new Promise((resolve) => setTimeout(resolve, TIME));
    return "CV uploaded successfully";
  },
};
