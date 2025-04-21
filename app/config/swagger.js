const swaggerJsdoc = require('swagger-jsdoc');
const { PORT } = require('./env');

const APP_PORT = PORT;

const swaggerDefinitionV1 = JSON.parse(JSON.stringify({
  openapi: '3.0.0',
  info: {
    title: 'Sharp Drop API',
    version: '1.0.0',
    description: 'API documentation for sharp drop p2p chat system',
  },
  servers: [
    {
      url: `http://localhost:${APP_PORT}/api`,
      description: 'Local Development server',
    },
    {
      url: `https://sharp-drop.onrender.com/api`,
      description: 'Production server',
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
    responses: {
      UnauthorizedError: {
        description: 'Unauthorized access',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
      NotFoundError: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
      BadRequestError: {
        description: 'Bad request',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
      ServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
    },
    schemas: {
      SuccessResponse: {
        type: 'object',
        properties: {
          code: { type: 'string', example: '00', description: 'Success code' },
          message: { type: 'string', example: 'Operation successful' },
          data: { type: 'object', additionalProperties: true },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          code: { type: 'string', example: '99', description: 'Error code' },
          message: { type: 'string', example: 'An error occurred' },
        },
      },
    },
  },
}));

const optionsV1 = {
  swaggerDefinition: swaggerDefinitionV1,
  apis: ['./app/docs/*.js'],
};

const swaggerSpecV1 = swaggerJsdoc(optionsV1);

module.exports = { swaggerSpecV1 };