async function generateCV(fastify, options) {
  fastify.post("/api/generate-cv", async (request, reply) => {
    return { message: "Generated CV" };
  });
}

export default generateCV;
