const request = require("supertest");
const { createToken } = require("../../token");
const mongoose = require("mongoose");

let server;
let token;

describe("auth middleware", () => {
  beforeAll((done) => {
    server = require("../../index");
    if (!mongoose.connection.db) {
      mongoose.connection.on("connected", done);
    } else {
      done();
    }
  });

  beforeEach(() => {
    token = createToken();
  });

  afterEach(async () => {
    await server.close();
  });

  const exec = async () => {
    return await request(server)
      .get("/api/person/")
      .set({ "x-auth-token": token });
  };

  it("should return 401 if no token is provided", async () => {
    token = "";

    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";

    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
