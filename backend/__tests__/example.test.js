const request = require("supertest");
const app = require("../src/index");

describe("GET /api/sum", () => {
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
