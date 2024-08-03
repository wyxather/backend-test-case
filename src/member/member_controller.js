import express from "express";
import { prisma } from "../app.js";
import {
  delete_member_by_id,
  find_member_by_id,
  get_all_members,
  insert_new_member,
  insert_or_replace_member_by_id,
  update_member_by_id,
} from "./member_service.js";

const router = express.Router();

export default router;

router.get("/", async (req, res) => {
  let members = await get_all_members(prisma);
  members = members.map((member) => ({
    ...member,
    borrowed_books_count: member.borrowed_books.length,
  }));
  return res.send(members);
});

router.get("/:id", async (req, res) => {
  const found_member = await find_member_by_id(prisma, req.params.id);
  return res.send(found_member);
});

router.post("/", async (req, res) => {
  const inserted_member = await insert_new_member(prisma, req.body);
  return res.send();
});

router.delete("/:id", async (req, res) => {
  const deleted_member = await delete_member_by_id(prisma, req.params.id);
  return res.send();
});

router.put("/:id", async (req, res) => {
  const inserted_or_replaced_member = await insert_or_replace_member_by_id(
    prisma,
    req.params.id,
    req.body,
  );
  return res.send();
});

router.patch("/:id", async (req, res) => {
  const updated_member = await update_member_by_id(
    prisma,
    req.params.id,
    req.body,
  );
  return res.send();
});
