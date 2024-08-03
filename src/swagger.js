import swagger_js_doc from "swagger-jsdoc";

export const port = process.env.PORT || "3000";

const swagger_spec = swagger_js_doc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "API for Library",
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: [
    "src/book/book_controller.js",
    `src/borrow/borrow_controller.js`,
    `src/member/member_controller.js`,
    `src/return/return_controller.js`,
  ],
});

export default swagger_spec;
