const TIME = 2000;

export const cvCreationApi = {
  analyzeJobListing: async (jobListing: string) => {
    console.log("Analyzing job listing...");
    await new Promise((resolve) => setTimeout(resolve, TIME));
    return "Job listing Data";
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
