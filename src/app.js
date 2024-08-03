import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express from "express";
import books from "./book/book_controller.js";
import borrow from "./borrow/borrow_controller.js";
import members from "./member/member_controller.js";

export const prisma = new PrismaClient();

dotenv.config();

const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());

app.use("/api/books", books);
app.use("/api/members", members);

app.use("/api/borrow", borrow);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
