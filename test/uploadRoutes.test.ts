import request from "supertest";
import fs from "fs";
import path from "path";
import app from "@App/app";

describe("POST /api/upload", () => {
  const testFilePath = path.join(__dirname, "test-assets", "test-file.txt");

  afterEach(async () => {
    // Delete the uploaded test file(s) after each test
    const uploadedFiles = fs.readdirSync(
      path.join(__dirname, "..", "src", "uploads", "my-folder")
    );
    for (const file of uploadedFiles) {
      fs.unlinkSync(
        path.join(__dirname, "..", "src", "uploads", "my-folder", file)
      );
    }
  });

  it("should upload a single file", async () => {
    const response = await request(app)
      .post("/api/upload")
      .attach("files", testFilePath)
      .field("folder", "my-folder");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Files uploaded successfully");
    expect(response.body.files).toHaveLength(1);
    expect(response.body.files[0].filename).toContain("test-file.txt");
  });

  it("should return a 400 status if no files are attached", async () => {
    const response = await request(app)
      .post("/api/upload")
      .field("folder", "my-folder");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("No files uploaded");
  });
});
