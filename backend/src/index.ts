import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";

import analyzeJobListing from "./analyzeJobListing";
import generateCV from "./generateCV";
import uploadCV from "./uploadCV";
import authCallbackRoute from "./authCallback";

const fastify = Fastify({ logger: true });

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

await fastify.register(cors, {
  origin: true,
});

fastify.register(multipart, {
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});

fastify.register(analyzeJobListing);
fastify.register(generateCV);
fastify.register(authCallbackRoute);
fastify.register(uploadCV);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
