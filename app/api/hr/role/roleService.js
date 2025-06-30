import prisma from "@/lib/prisma";

export class RoleService {
  static async getAllRole() {
    return prisma.role.findMany({
      include: {
        RoleCreateBy: {
          select: { empFirstNameTH: true, empLastNameTH: true },
        },
        RoleUpdateBy: {
          select: { empFirstNameTH: true, empLastNameTH: true },
        },
      },
    });
  }

  static async getRoleById(roleId) {
    return prisma.role.findUnique({
      where: { roleId },
      include: {
        RoleCreateBy: {
          select: { empFirstNameTH: true, empLastNameTH: true },
        },
        RoleUpdateBy: {
          select: { empFirstNameTH: true, empLastNameTH: true },
        },
      },
    });
  }

  static async getRoleByName(roleName) {
    return prisma.role.findFirst({
      where: { roleName: { equals: roleName, mode: "insensitive" } },
    });
  }

  static async createRole(data) {
    return prisma.role.create({ data });
  }

  static async updateRole(roleId, data) {
    return prisma.role.update({
      where: { roleId },
      data,
    });
  }
}
