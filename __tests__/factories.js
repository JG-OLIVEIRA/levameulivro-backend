const { faker } = require('@faker-js/faker');
const { factory } = require("factory-girl");
const { User } = require("../src/app/models");

factory.define("User", User, {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatar: faker.image.avatar(),
  birth_date: faker.date.birthdate(),
  zip_code: faker.location.zipCode(),
  completed_swaps: faker.number.int(100),
  credit: faker.number.int(100),
});

module.exports = factory;