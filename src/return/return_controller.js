import express from "express";
import { prisma } from "../app.js";
import { return_book_by_id } from "./return_service.js";

const router = express.Router();

export default router;

router.post("/", async (req, res) => {
  try {
    await return_book_by_id(prisma, req.body.member_id, req.body.book_id);
    return res.send();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});
