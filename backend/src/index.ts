import Fastify from "fastify";
import analyzeJobListing from "./analyzeJobListing";
import generateCV from "./generateCV";
import uploadCV from "./uploadCV";
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

await fastify.register(cors, {
  origin: true, // for all origins
});

fastify.register(analyzeJobListing);
fastify.register(generateCV);
fastify.register(uploadCV);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
