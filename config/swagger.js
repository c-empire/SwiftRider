// const swaggerJsDoc = require('swagger-jsdoc');

// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'SwiftRider API',
//       version: '1.0.0',
//       description: 'API documentation forDispatch Rider Platform',
//     },
//     servers: [
//       { url: 'http://localhost:3000/api', description: 'Local server' },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//     },
//     security: [{ bearerAuth: [] }],
//   },
//   apis: ["./routes/*.js", "./routes/**/*.js"], // Path to the API docs
// };

// module.exports = swaggerJsDoc(swaggerOptions);
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SwiftRider API',
      version: '1.0.0',
      description: 'API documentation for Dispatch Rider Platform',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./routes/**/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

