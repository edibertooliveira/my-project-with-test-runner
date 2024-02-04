import fastifyHealthcheck from "fastify-healthcheck";
import { Config } from "./server";
import { FastifyInstance } from "fastify";

function healthcheck(client: FastifyInstance, config: Config) {
  client.register(fastifyHealthcheck, {
    healthcheckUrl: `/${config.prefix}/healthcheck`,
  });
}

const plugins = [healthcheck]

export default function(client: FastifyInstance, config: Config) {
    for (const plugin of plugins) {
        plugin(client, config)
    }
}