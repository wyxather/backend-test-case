export async function get_all_books(prisma) {
  const books = await prisma.book.findMany();
  return books;
}

export async function find_book_by_id(prisma, id) {
  const found_book = await prisma.book.findUnique({ where: { id } });
  return found_book;
}

export async function insert_new_book(prisma, new_book) {
  const inserted_book = await prisma.book.create({
    data: {
      code: new_book.code,
      title: new_book.title,
      author: new_book.author,
      stock: new_book.stock,
    },
  });
  return inserted_book;
}

export async function delete_book_by_id(prisma, id) {
  const deleted_book = await prisma.book.delete({
    where: { id },
  });
  return deleted_book;
}

export async function insert_or_replace_book_by_id(prisma, id, new_book) {
  const inserted_or_replaced_book = await prisma.book.upsert({
    where: { id },
    create: {
      id,
      code: new_book.code,
      title: new_book.title,
      author: new_book.author,
      stock: new_book.stock,
    },
    update: {
      code: new_book.code,
      title: new_book.title,
      author: new_book.author,
      stock: new_book.stock,
    },
  });
  return inserted_or_replaced_book;
}

export async function update_book_by_id(prisma, id, book) {
  const updated_book = await prisma.book.update({
    where: { id },
    data: {
      code: book.code,
      title: book.title,
      author: book.author,
      stock: book.stock,
    },
  });
  return updated_book;
}

export async function update_book(prisma, book, new_book) {
  const updated_book = await prisma.book.update({
    where: { ...book },
    data: {
      code: new_book.code,
      title: new_book.title,
      author: new_book.author,
      stock: new_book.stock,
    },
  });
  return updated_book;
}
