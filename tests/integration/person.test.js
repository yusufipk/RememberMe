const request = require("supertest");
const { createToken } = require("../../token");
const mongoose = require("mongoose");
const { Person } = require("../../models/person-model");

let server;
let token;
let personId;
let person;

describe("person route", () => {
  beforeAll((done) => {
    server = require("../../index");
    if (!mongoose.connection.db) {
      mongoose.connection.on("connected", done);
    } else {
      done();
    }
  });

  beforeEach(async () => {
    personId = mongoose.Types.ObjectId();
    person = new Person({
      _id: personId,
      name: "Mike",
      place: "Taksim",
    });
    await person.save();

    token = createToken();
  });

  afterEach(async () => {
    await server.close();
    await Person.deleteMany({});
  });

  describe("GET", () => {
    describe("GET /api/person", () => {
      const exec = async () => {
        return await request(server)
          .get("/api/person/")
          .set({ "x-auth-token": token });
      };

      it("should return 401 if no token provided", async () => {
        token = "";
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it("should return 400 if token is not valid", async () => {
        token = "a";
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it("should return all objects if token is valid", async () => {
        const res = await exec();
        expect(res.status).toBe(200);
      });
    });

    describe("GET /api/person/:id", () => {
      let id;
      const exec = async () => {
        return await request(server)
          .get(`/api/person/${id}`)
          .set({ "x-auth-token": token });
      };

      it("should return 401 if no token provided", async () => {
        token = "";
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it("should return 400 if token is not valid", async () => {
        token = "a";
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it("should return 404 if objectId is not valid", async () => {
        id = mongoose.Types.ObjectId().toString();
        const res = await exec();
        expect(res.status).toBe(404);
      });

      it("should return 404 if person does not exist", async () => {
        id = mongoose.Types.ObjectId().toString();
        const res = await exec();
        expect(res.status).toBe(404);
      });

      it("should return person if id is valid", async () => {
        id = personId;
        const res = await exec();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("_id", personId.toString());
      });
    });

    describe("GET /api/person/get/:name", () => {
      let name;
      const exec = async () => {
        return await request(server)
          .get(`/api/person/get/${name}`)
          .set({ "x-auth-token": token });
      };

      it("should return 401 if no token provided", async () => {
        token = "";
        const res = await exec();
        expect(res.status).toBe(401);
      });

      it("should return 400 if token is not valid", async () => {
        token = "a";
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it("should return 404 if person does not exist", async () => {
        name = "Rigby";
        const res = await exec();
        expect(res.status).toBe(404);
      });

      it("should return 404 if name is invalid", async () => {
        name = null;
        const res = await exec();
        expect(res.status).toBe(404);
      });

      it("should return the person if name is valid", async () => {
        name = "Mike";
        const res = await exec();
        expect(res.status).toBe(200);
        expect(res.body[0]).toHaveProperty("name", "Mike");
      });

      it("case sensitivity", async () => {
        name = "mike";
        const res = await exec();
        expect(res.status).toBe(200);
        expect(res.body[0]).toHaveProperty("name", "Mike");
      });
    });
  });

  describe("POST /api/person", () => {
    let person;
    beforeEach(() => {
      person = {
        name: "Skips",
        place: "Car Maintanance",
      };
    });

    const exec = async () => {
      return await request(server)
        .post(`/api/person/`)
        .set({ "x-auth-token": token })
        .send(person);
    };

    it("should return 401 if no token provided", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if token is not valid", async () => {
      token = "a";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("joi should return 400 if input is invalid", async () => {
      person.name = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 200 if input is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
    });
  });
  describe("PUT /api/person/:id", () => {
    let person2;

    beforeEach(() => {
      person2 = {
        name: "Jimmy",
        place: "Texas",
      };
    });

    const exec = async () => {
      return await request(server)
        .put(`/api/person/${personId}`)
        .set({ "x-auth-token": token })
        .send(person2);
    };

    it("should return 401 if no token provided", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if token is not valid", async () => {
      token = "a";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 404 if objectId is not valid", async () => {
      personId = mongoose.Types.ObjectId().toString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return 200 if input is valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("ok", 1);
    });
  });
  describe("DELETE /api/person/:id", () => {
    const exec = async () => {
      return await request(server)
        .delete(`/api/person/${personId}`)
        .set({ "x-auth-token": token });
    };

    it("should return 401 if no token provided", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if token is not valid", async () => {
      token = "a";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 404 if objectId is not valid", async () => {
      personId = mongoose.Types.ObjectId().toString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return 200 if id is valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("deletedCount", 1);
    });
  });
});
