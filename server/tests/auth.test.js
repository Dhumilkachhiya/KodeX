import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import User from "../src/models/user.model.js";
import connectDB from "../src/config/connectdb.js";
import { jest } from '@jest/globals';

// Utility to generate random email
const generateEmail = () => `testuser_${Date.now()}@example.com`;

describe("KodeX Auth API Tests", () => {
  let testUser = {
    username: `testuser_${Date.now()}`,
    email: generateEmail(),
    password: "Secure123Password!",
  };

  // Give DB connection and hashing operations enough time
  jest.setTimeout(30000);

  beforeAll(async () => {
    // Connect to database before running tests
    await connectDB();
  });

  // Ensure DB connection is closed after all tests
  afterAll(async () => {
    // Delete the test user to clean up
    await User.deleteOne({ email: testUser.email });
    await mongoose.connection.close();
  });

  // TC-API-01: Register new user - success
  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  // TC-API-02: Login - valid credentials
  it("should login with valid credentials", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.user).toBeDefined();
    
    // Check if token was attached as an HTTPOnly cookie
    expect(response.headers["set-cookie"]).toBeDefined();
  });

  // TC-API-03: Login - invalid credentials
  it("should fail login with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: testUser.email,
        password: "WrongPassword123!",
      });

    expect(response.status).toBe(400); // Or 400
    expect(response.body.message).toBe("Invalid email or password");
  });
});
