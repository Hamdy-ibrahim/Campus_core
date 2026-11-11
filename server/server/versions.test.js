
require("dotenv").config();

const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("./app");

const apiKey = (process.env.API_KEYS || "")
  .split(",")[0]
  .trim();

function readJson(filename) {
  const filePath = path.join(__dirname, filename);
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content.replace(/^\uFEFF/, ""));
}

describe("CampusCore API version compatibility", () => {
  const before = readJson("v1_before.json");
  const after = readJson("v1_after.json");

  test("legacy endpoint and v1 snapshots are identical", () => {
    expect(after).toEqual(before);
    expect(after).toHaveProperty("events");
    expect(after).not.toHaveProperty("data");
  });

  test("v1 includes deprecation headers", async () => {
    const response = await request(app)
      .get("/v1/events")
      .set("X-API-Key", apiKey);

    expect(response.status).toBe(200);
    expect(response.headers.deprecation).toBe("true");
    expect(response.headers.sunset).toBeDefined();
    expect(response.headers.link).toContain("successor-version");
  });

  test("v2 uses the new data and count structure", async () => {
    const response = await request(app)
      .get("/v2/events")
      .set("X-API-Key", apiKey);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("count");
    expect(response.body.count).toBe(response.body.data.length);
    expect(response.body).not.toHaveProperty("events");
  });
});
