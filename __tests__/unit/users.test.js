const bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');

const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await User.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      avatar: faker.image.avatar(),
      birth_date: faker.date.birthdate(),
      zip_code: faker.location.zipCode(),
      completed_exchanges: faker.number.int(100),
      credit: faker.number.int(100),
    });

    const compareHash = await bcrypt.compare(user.password, user.password_hash);

    expect(compareHash).toBe(true);
  });
});