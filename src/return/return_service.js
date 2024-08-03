import { update_book_by_id } from "../book/book_service.js";
import {
  find_member_by_id,
  update_member_by_id,
} from "../member/member_service.js";

export async function return_book_by_id(prisma, member_id, book_id) {
  const found_member = await find_member_by_id(prisma, member_id);
  if (found_member == null) {
    throw new Error("Member doesn't exist.");
  }

  const borrowed_book = found_member.borrowed_books.find(
    (borrowed_book) => borrowed_book.book_id == book_id,
  );
  if (borrowed_book == null) {
    throw new Error("Member didn't borrow this book.");
  }

  const now = new Date();
  const borrowed_at = new Date(borrowed_book.borrowed_at);
  const delta_ms = now - borrowed_at;
  const delta_days = delta_ms / (1000 * 3600 * 24);
  if (delta_days > 7) {
    const penalized_until = new Date(now);
    penalized_until.setDate(now.getDate() + 3);
    await update_member_by_id(prisma, member_id, {
      penalized_until,
    });
  }

  // https://stackoverflow.com/questions/69364443/prisma-splice-item-from-array
  // Since this feature is not available, we need to remove the array here.
  await prisma.$transaction(async (prisma) => {
    await Promise.all([
      update_book_by_id(prisma, book_id, { stock: { increment: 1 } }),
      update_member_by_id(prisma, member_id, {
        borrowed_books: found_member.borrowed_books.filter(
          (borrowed_book) => borrowed_book.book_id != book_id,
        ),
      }),
    ]);
  });
}
