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

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   borrowed_books:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         book_id:
 *                           type: string
 *                         borrowed_at:
 *                           type: string
 *                   id:
 *                     type: string
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 *                   penalized_until:
 *                     type: string
 *                     nullable: true
 *                   borrowed_books_count:
 *                     type: integer
 */
router.get("/", async (req, res) => {
  let members = await get_all_members(prisma);
  members = members.map((member) => ({
    ...member,
    borrowed_books_count: member.borrowed_books.length,
  }));
  return res.send(members);
});

/**
 * @swagger
 * /api/members/{id}:
 *   get:
 *     summary: Get a member by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The member ID
 *     responses:
 *      200:
 *         description: A member content.
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   borrowed_books:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         book_id:
 *                           type: string
 *                         borrowed_at:
 *                           type: string
 *                   id:
 *                     type: string
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 *                   penalized_until:
 *                     type: string
 *                     nullable: true
 *                   borrowed_books_count:
 *                     type: integer
 */
router.get("/:id", async (req, res) => {
  const found_member = await find_member_by_id(prisma, req.params.id);
  return res.send(found_member);
});

/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: Add a member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 *     responses:
 *       200:
 *         description: A member has been added.
 */
router.post("/", async (req, res) => {
  const inserted_member = await insert_new_member(prisma, req.body);
  return res.send();
});

/**
 * @swagger
 * /api/members/{id}:
 *   delete:
 *     summary: Delete a member by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The member ID
 *     responses:
 *       200:
 *         description: The member has been deleted.
 */
router.delete("/:id", async (req, res) => {
  const deleted_member = await delete_member_by_id(prisma, req.params.id);
  return res.send();
});

/**
 * @swagger
 * /api/members/{id}:
 *   put:
 *     summary: Add or replace a member by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The member has been inserted or replaced.
 */
router.put("/:id", async (req, res) => {
  const inserted_or_replaced_member = await insert_or_replace_member_by_id(
    prisma,
    req.params.id,
    req.body,
  );
  return res.send();
});

/**
 * @swagger
 * /api/members/{id}:
 *   patch:
 *     summary: Update a member by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The member ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *            schema:
 *                 type: object
 *                 properties:
 *                   borrowed_books:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         book_id:
 *                           type: string
 *                         borrowed_at:
 *                           type: string
 *                   id:
 *                     type: string
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 *                   penalized_until:
 *                     type: string
 *                     nullable: true
 *                   borrowed_books_count:
 *                     type: integer
 *     responses:
 *       200:
 *         description: The member has been updated.
 */
router.patch("/:id", async (req, res) => {
  const updated_member = await update_member_by_id(
    prisma,
    req.params.id,
    req.body,
  );
  return res.send();
});
