const request = require("supertest");

const { faker } = require('@faker-js/faker');

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories")

describe("Book's CRUD", () => {
    beforeEach(async () => {
        await truncate();
    });

    it("Should return a book when a book is created.", async () => {
        const user = await factory.create("User", {
            email: faker.internet.email(),
            password: faker.internet.password()
        });

        const response = await request(app)
            .post("/books")
            .auth(user.generateToken(), { type: "bearer" })
            .send({
                name: faker.lorem.words(3),
                author: faker.person.fullName(),
                isbn: faker.number.int(100),
                thumbnail_url: faker.internet.url(),
                description: faker.lorem.paragraph()
            })

        expect(response.status).toBe(201);
    });

});