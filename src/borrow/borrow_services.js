import { prisma } from "../app.js";
import { update_book } from "../book/book_service.js";
import { find_member_by_id, update_member } from "../member/member_service.js";

export async function borrow_book_by_id(member_id, book_id) {
  const found_member = await find_member_by_id(member_id);
  if (found_member == null) {
    throw new Error("Member doesn't exist.");
  }

  // https://github.com/prisma/prisma/discussions/22974
  // Since the feature is not available we need to check it here.
  // FIXME: Might need to check for race conditions and avoid it.
  if (found_member.borrowed_books.length >= 2) {
    throw new Error("Member has borrowed 2 books.");
  }

  await prisma.$transaction(async (prisma) => {
    await Promise.all([
      update_book(
        prisma,
        { id: book_id, stock: { gt: 0 } },
        { stock: { decrement: 1 } },
      ),
      update_member(
        prisma,
        { id: member_id, penalized_until: null },
        {
          borrowed_books: { push: [{ book_id, borrowed_at: new Date() }] },
        },
      ),
    ]);
  });
}
