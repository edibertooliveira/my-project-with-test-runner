import { describe, test, before } from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "@base/server";
import { FastifyInstance } from "fastify";

const PORT = 3003;
const HOST = "::";
const PREFIX = "api";

const serverTest = async () => {
  const config = {
    port: PORT,
    host: HOST,
    prefix: PREFIX,
  };

  const app = buildApp(config);

  app.ready();

  return app;
};

describe("HTTP", () => {
  let server: { inject: Function; close: Function };

  before(async () => {
    server = await serverTest();
  });
  
  test("GET /healthcheck returns status 200", async () => {
    const response = await server.inject({
      method: "GET",
      url: "api/healthcheck",
    });

    const expected = {
      statusCode: 200,
      status: "ok",
    };

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(JSON.parse(response.payload), expected);

    server.close();
  });
});
