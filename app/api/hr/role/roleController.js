import { NextResponse } from "next/server";
import { RoleService } from "./roleService";
import { validateRequest } from "@/lib/validateRequest";
import { getLocalNow } from "@/lib/getLocalNow";
import { handleErrors, handleGetErrors } from "@/lib/errorHandler";
import { rolePostSchema, rolePutSchema, formatRoleData } from "./roleSchema";

export class RoleController {
  static async getAllRole(request) {
    let ip = "";
    try {
      ip = await validateRequest(request);

      const role = await RoleService.getAllRole();

      if (!role?.length) {
        return NextResponse.json(
          {
            message: "No roles found",
            role: [],
          },
          { status: 200 }
        );
      }

      const formattedRoles = formatRoleData(role);
      return NextResponse.json(
        {
          message: "Successfully retrieved role",
          role: formattedRoles,
        },
        { status: 200 }
      );
    } catch (error) {
      return handleGetErrors(error, ip, "Failed to retrieve role");
    }
  }

  static async getRoleById(request, roleId) {
    let ip = "";
    try {
      ip = await validateRequest(request);
      const parsedRoleId = parseInt(roleId, 10);
      if (isNaN(parsedRoleId)) {
        return NextResponse.json({ error: "Invalid role ID" }, { status: 400 });
      }

      const role = await RoleService.getRoleById(parsedRoleId);
      if (!role) {
        return NextResponse.json({ error: "Role not found" }, { status: 404 });
      }

      const formattedRole = formatRoleData([role]);
      return NextResponse.json(
        {
          message: "Successfully retrieved role",
          role: formattedRole,
        },
        { status: 200 }
      );
    } catch (error) {
      return handleGetErrors(error, ip, "Failed to retrieve role");
    }
  }

  static async createRole(request) {
    let ip = "";
    try {
      ip = await validateRequest(request);
      const formData = await request.formData();
      const data = Object.fromEntries(formData.entries());
      const parsedData = rolePostSchema.parse(data);

      const existingRole = await RoleService.getRoleByName(parsedData.roleName);
      if (existingRole) {
        return NextResponse.json(
          { error: `Role name '${parsedData.roleName}' already exists` },
          { status: 400 }
        );
      }

      const localNow = getLocalNow();
      const newRole = await RoleService.createRole({
        ...parsedData,
        roleCreateAt: localNow,
      });

      return NextResponse.json(
        { message: "Role created successfully", role: newRole },
        { status: 201 }
      );
    } catch (error) {
      return handleErrors(error, ip, "Failed to create role");
    }
  }

  static async updateRole(request, roleId) {
    let ip = "";
    try {
      ip = await validateRequest(request);
      const parsedRoleId = parseInt(roleId, 10);
      if (isNaN(parsedRoleId)) {
        return NextResponse.json({ error: "Invalid role ID" }, { status: 400 });
      }

      const formData = await request.formData();
      const data = Object.fromEntries(formData.entries());

      const parsedData = rolePutSchema.parse({
        ...data,
        roleId: parsedRoleId,
      });

      const localNow = getLocalNow();
      const updatedRole = await RoleService.updateRole(parsedRoleId, {
        ...parsedData,
        roleUpdateAt: localNow,
      });

      return NextResponse.json(
        {
          message: "Role updated successfully",
          role: updatedRole,
        },
        { status: 200 }
      );
    } catch (error) {
      return handleErrors(error, ip, "Failed to update role");
    }
  }
}
