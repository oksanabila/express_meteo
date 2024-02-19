import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Weather API',
            version: '1.0.0',
            description: 'A simple Weather API',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./src/routers/*.ts', './src/models/*.ts'],

};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
