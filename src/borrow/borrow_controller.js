import express from "express";
import { prisma } from "../app.js";
import { borrow_book_by_id } from "./borrow_service.js";

const router = express.Router();

export default router;

/**
 * @swagger
 * /api/borrow:
 *   post:
 *     summary: Borrow a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_id:
 *                 type: string
 *               book_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: A book has been borrowed.
 *       400:
 *         description: Failed to borrow a book. (Requirements are not satisfied)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/", async (req, res) => {
  try {
    await borrow_book_by_id(prisma, req.body.member_id, req.body.book_id);
    return res.send();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});
