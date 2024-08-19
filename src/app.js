require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require("express");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load(path.join(__dirname, '../swagger.yaml'))))
  }
}

module.exports = new AppController().express;