const request = require("supertest");

const { faker } = require('@faker-js/faker');

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("User's CRUD", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Should return a token when a user is created.", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
        birth_date: faker.date.birthdate(),
        zip_code: faker.location.zipCode()
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("Should return a token when a user is autenticated.", async () => {
    const user = await factory.create("User", {
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    const response = await request(app)
      .post("/users")
      .send({
        email: user.email,
        password: user.password
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should return a message with a invalid email or password", async () => {
    const user = await factory.create("User", {
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    const response = await request(app)
      .post("/users")
      .send({
        email: user.email,
        password: faker.internet.password()
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid email or password.");
  });
});