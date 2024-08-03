import { update_book } from "../book/book_service.js";
import {
  find_member_by_id,
  update_member,
  update_member_by_id,
} from "../member/member_service.js";

// FIXME: Might need to check for race conditions and avoid it.
export async function borrow_book_by_id(prisma, member_id, book_id) {
  const found_member = await find_member_by_id(prisma, member_id);
  if (found_member == null) {
    throw new Error("Member doesn't exist.");
  }

  if (found_member.penalized_until != null) {
    const now = new Date();
    const penalized_until = new Date(found_member.penalized_until);
    if (now > penalized_until) {
      await update_member_by_id(prisma, member_id, { penalized_until: null });
    } else {
      throw new Error("Member is penalized.");
    }
  }

  // https://github.com/prisma/prisma/discussions/22974
  // Since the feature is not available we need to check it here.
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
