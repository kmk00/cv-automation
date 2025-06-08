async function analyzeJobListing(fastify, options) {
  fastify.post("/api/analyze-job-listing", async (request, reply) => {
    return { message: "Analyzed job listing" };
  });
}

export default analyzeJobListing;
