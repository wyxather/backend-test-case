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

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   code:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   stock:
 *                     type: integer
 */
router.get("/", async (req, res) => {
  const books = await get_all_books(prisma);
  return res.send(books);
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *      200:
 *         description: A book content.
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   code:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   stock:
 *                     type: integer
 */
router.get("/:id", async (req, res) => {
  const found_book = await find_book_by_id(prisma, req.params.id);
  return res.send(found_book);
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A book has been added.
 */
router.post("/", async (req, res) => {
  const inserted_book = await insert_new_book(prisma, req.body);
  return res.send();
});

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: The book has been deleted.
 */
router.delete("/:id", async (req, res) => {
  const deleted_book = await delete_book_by_id(prisma, req.params.id);
  return res.send();
});

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Add or replace a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The book has been inserted or replaced.
 */
router.put("/:id", async (req, res) => {
  const inserted_or_replaced_book = await insert_or_replace_book_by_id(
    prisma,
    req.params.id,
    req.body,
  );
  return res.send();
});

/**
 * @swagger
 * /api/books/{id}:
 *   patch:
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The book has been updated.
 */
router.patch("/:id", async (req, res) => {
  const updated_book = await update_book_by_id(prisma, req.params.id, req.body);
  return res.send();
});
