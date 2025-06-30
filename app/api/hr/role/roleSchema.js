import { z } from "zod";
import {
  preprocessInt,
  preprocessString,
  preprocessEnum,
  formatData,
} from "@/lib/zodSchema";

export const formatRoleData = (roles) =>
  formatData(roles, [], ["roleCreateAt", "roleUpdateAt"]);

export const rolePostSchema = z.object({
  roleName: preprocessString("Please provide the role name"),
  roleCreateBy: preprocessInt("Please provide the creator's user ID"),
});

export const rolePutSchema = z.object({
  roleId: preprocessInt("Please provide the role ID to update"),
  roleName: preprocessString("Please provide the role name"),
  roleStatus: preprocessEnum(
    ["Active", "InActive"],
    "Please provide the status as 'Active' or 'InActive'"
  ),
  roleUpdateBy: preprocessInt("Please provide the updater's user ID"),
});
