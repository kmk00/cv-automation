import axios from "axios";
import type { CV } from "../../types/CV";

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
  generateCv: async (CVData: CV) => {
    if (!CVData) {
      throw new Error("CV Data is required");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/generate-cv",
        {
          CVData,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to generate CV");
      }

      console.log("CV response from backend:", response.data);

      const fileName = response.data.fileName;
      console.log("Generated CV filename:", fileName);

      return response.data;
    } catch (error) {
      console.error("Error generating CV:", error);
      throw error;
    }
  },
  uploadCv: async (fileName: string) => {
    console.log("Uploading CV..." + fileName);

    const response = await axios.get(
      `http://localhost:3000/api/upload-cv?fileName=${fileName}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to upload CV");
    }

    console.log("CV uploaded successfully" + response.data);
    return response.data;
  },
};
