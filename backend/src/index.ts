import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";

import analyzeJobListing from "./routes/analyzeJobListing";
import generateCV from "./routes/generateCV";
import uploadCV from "./routes/uploadCV";
import authCallbackRoute from "./routes/authCallback";

const fastify = Fastify({ logger: true });

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
