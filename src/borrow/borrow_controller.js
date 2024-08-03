import express from "express";
import { prisma } from "../app.js";
import { borrow_book_by_id } from "./borrow_services.js";

const router = express.Router();

export default router;

router.post("/", async (req, res) => {
  try {
    await borrow_book_by_id(prisma, req.body.member_id, req.body.book_id);
    return res.send();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});
