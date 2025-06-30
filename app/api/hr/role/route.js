import { RoleController } from "@/app/api/hr/role/roleController";

export async function GET(request) {
  return RoleController.getAllRole(request);
}

export async function POST(request) {
  return RoleController.createRole(request);
}
