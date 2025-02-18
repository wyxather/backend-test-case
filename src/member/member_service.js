export async function get_all_members(prisma) {
  const members = await prisma.member.findMany();
  return members;
}

export async function find_member_by_id(prisma, id) {
  const found_member = await prisma.member.findUnique({ where: { id } });
  return found_member;
}

export async function insert_new_member(prisma, new_member) {
  const inserted_member = await prisma.member.create({
    data: {
      code: new_member.code,
      name: new_member.name,
      penalized_until: null,
      borrowed_books: [],
    },
  });
  return inserted_member;
}

export async function delete_member_by_id(prisma, id) {
  const deleted_member = await prisma.member.delete({
    where: { id },
  });
  return deleted_member;
}

export async function insert_or_replace_member_by_id(prisma, id, new_member) {
  const inserted_or_replaced_member = await prisma.member.upsert({
    where: { id },
    create: {
      id,
      code: new_member.code,
      name: new_member.name,
      penalized_until: null,
      borrowed_books: [],
    },
    update: {
      code: new_member.code,
      name: new_member.name,
      penalized_until: new_member.penalized_until,
      borrowed_books: new_member.borrowed_books,
    },
  });
  return inserted_or_replaced_member;
}

export async function update_member_by_id(prisma, id, member) {
  const updated_member = await prisma.member.update({
    where: { id },
    data: {
      code: member.code,
      name: member.name,
      penalized_until: member.penalized_until,
      borrowed_books: member.borrowed_books,
    },
  });
  return updated_member;
}

export async function update_member(prisma, member, new_member) {
  const updated_member = await prisma.member.update({
    where: { ...member },
    data: {
      code: new_member.code,
      name: new_member.name,
      penalized_until: new_member.penalized_until,
      borrowed_books: new_member.borrowed_books,
    },
  });
  return updated_member;
}
