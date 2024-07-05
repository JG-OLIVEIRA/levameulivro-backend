const request = require("supertest");

const { faker } = require('@faker-js/faker');

const app = require("../../src/app");
const truncate = require("../utils/truncate");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
    birthDate: faker.date.birthdate(),
    zipCode: faker.location.zipCode()
  }

  it("Should return a JWT if the user's credentials are valid", async () => {
    await request(app).post("/users").send(user);

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: user.password
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The user was authenticated");
  });

  it("Should not return a jwt if the user does not exist.", async () => {
    const response = await request(app)
      .post("/sessions")
      .send({
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The user does not exist.");
  });

  it("Should not return a jwt if the user's password is incorret.", async () => {
    await request(app).post("/users").send(user);

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: faker.internet.password()
      });
    
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The user's password is incorret.");
  });
  
});