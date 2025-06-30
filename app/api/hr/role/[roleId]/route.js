import { RoleController } from "@/app/api/hr/role/roleController";

export async function GET(request, context) {
  const { roleId } = await context.params;
  return RoleController.getRoleById(request, roleId);
}

export async function PUT(request, context) {
  const { roleId } = await context.params;
  return RoleController.updateRole(request, roleId);
}
