require("dotenv").config();
const request = require("supertest");
const app = require("../src/index");
const { closeConnection } = require("../src/database");

describe("GET /api/sum", () => {
  beforeAll(() => {
    // Reset database to initial state if needed for testing
  });

  // Close the connection after all tests are done
  afterAll(async () => {
    await closeConnection();
  });

  it("should return the sum of two numbers", async () => {
    const response = await request(app).get("/api/sum").query({ a: 5, b: 10 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ sum: 15 });
  });

  it("should return 400 if a parameter is missing", async () => {
    const response = await request(app).get("/api/sum").query({ a: 5 });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Missing query parameters 'a' and/or 'b'",
    });
  });

  it("should return 400 if parameters are not numbers", async () => {
    const response = await request(app)
      .get("/api/sum")
      .query({ a: "five", b: "ten" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "'a' and 'b' must be valid numbers",
    });
  });
});
