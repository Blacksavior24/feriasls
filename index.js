const express = require("express");
const serverless = require("serverless-http");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const cors = require("cors");
const routerAPI = require("./src/routes");
const { logErrors, errorHandler, boomErrorHandler } = require("./src/middlewares/error.Middleware");

const app = express();

app.use(cors())
app.use(express.json());

// Configurar Swagger Docs y Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routerAPI(app)

app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
