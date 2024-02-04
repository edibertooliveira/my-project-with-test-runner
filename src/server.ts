import fastify from "fastify";
import registerPlugins from "./plugins";

const PORT = 3003;
const HOST = "::";
const PREFIX = "api";

export interface Config {
  port: number;
  host: string;
  prefix: string;
}

export function buildApp(config: Config) {
  const client = fastify({
    logger: true,
  });

  registerPlugins(client, config);

  return client;
}

export default async function () {
  const config = {
    port: PORT,
    host: HOST,
    prefix: PREFIX,
  };

  const app = buildApp(config);

  try {
    await app.listen({ port: PORT, host: HOST });
  } catch (error) {
    app.log.error(error)
    process.exit(1);
  }
}
