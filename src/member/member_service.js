import { prisma } from "../app.js";

export async function get_all_members() {
  const members = await prisma.member.findMany();
  return members;
}

export async function find_member_by_id(id) {
  const found_member = await prisma.member.findUnique({ where: { id } });
  return found_member;
}

export async function insert_new_member(new_member) {
  const inserted_member = await prisma.member.create({
    data: {
      code: new_member.code,
      name: new_member.name,
      penalized_until: null,
    },
  });
  return inserted_member;
}

export async function delete_member_by_id(id) {
  const deleted_member = await prisma.member.delete({
    where: { id },
  });
  return deleted_member;
}

export async function insert_or_replace_member_by_id(id, new_member) {
  const inserted_or_replaced_member = await prisma.member.upsert({
    where: { id },
    create: {
      id,
      code: new_member.code,
      name: new_member.name,
      penalized_until: null,
    },
    update: {
      code: new_member.code,
      name: new_member.name,
      penalized_until: null,
    },
  });
  return inserted_or_replaced_member;
}

export async function update_member_by_id(id, member) {
  const updated_member = await prisma.member.update({
    where: { id },
    data: {
      code: member.code,
      name: member.name,
      penalized_until: null,
    },
  });
  return updated_member;
}
