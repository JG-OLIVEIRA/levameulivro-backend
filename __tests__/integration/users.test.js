const request = require("supertest");

const { faker } = require('@faker-js/faker');

const app = require("../../src/app");
const truncate = require("../utils/truncate");

describe("User's CRUD", () => {
  beforeEach(async () => {
    await truncate();
  });

  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
    birth_date: faker.date.birthdate(),
    zip_code: faker.location.zipCode()
  }

  it("Should create a new user successfully.", async () => {
    const response = await request(app).post("/users").send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The user was created.");
  });
});