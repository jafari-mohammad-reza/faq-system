import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

export function initSwagger(app, port) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJsdoc({
        swaggerDefinition: {
          openapi: "3.0.0",
          info: {
            title: "(FAQ) system Api",
            version: "1.0.0",
            description: "(FAQ) system Api documentations",
            contact: {
              name: "mohammadreza jafari",
              email: "mohammadrezajafari.dev@gmail.com",
            },
          },
          servers: [
            {
              url: `http://localhost:${port}`,
            },
          ],
          components: {
            securitySchemes: {
              BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          },
          security: [{ BearerAuth: [] }],
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
      })
    )
  );
}
