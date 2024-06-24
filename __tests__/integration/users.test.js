const request = require("supertest");

const { faker } = require('@faker-js/faker');

const app = require("../../src/app");
const truncate = require("../utils/truncate");

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
        birthDate: faker.date.birthdate(),
        zipCode: faker.location.zipCode()
      });

    expect(response.body).toHaveProperty("token");
  });
});