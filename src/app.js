import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import book_routes from "./book/book_controller.js";
import borrow_routes from "./borrow/borrow_controller.js";
import member_routes from "./member/member_controller.js";
import return_routes from "./return/return_controller.js";

export const prisma = new PrismaClient();

dotenv.config();

const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());

app.use("/api/books", book_routes);
app.use("/api/members", member_routes);

app.use("/api/borrow", borrow_routes);
app.use("/api/return", return_routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
