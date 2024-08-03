import express from "express";
import { prisma } from "../app.js";
import {
  delete_book_by_id,
  find_book_by_id,
  get_all_books,
  insert_new_book,
  insert_or_replace_book_by_id,
  update_book_by_id,
} from "./book_service.js";

const router = express.Router();

export default router;

router.get("/", async (req, res) => {
  const books = await get_all_books(prisma);
  return res.send(books);
});

router.get("/:id", async (req, res) => {
  const found_book = await find_book_by_id(prisma, req.params.id);
  return res.send(found_book);
});

router.post("/", async (req, res) => {
  const inserted_book = await insert_new_book(prisma, req.body);
  return res.send();
});

router.delete("/:id", async (req, res) => {
  const deleted_book = await delete_book_by_id(prisma, req.params.id);
  return res.send();
});

router.put("/:id", async (req, res) => {
  const inserted_or_replaced_book = await insert_or_replace_book_by_id(
    prisma,
    req.params.id,
    req.body,
  );
  return res.send();
});

router.patch("/:id", async (req, res) => {
  const updated_book = await update_book_by_id(prisma, req.params.id, req.body);
  return res.send();
});
