async function uploadCV(fastify, options) {
  fastify.post("/api/upload-cv", async (request, reply) => {
    return { message: "upload-cv" };
  });
}

export default uploadCV;
