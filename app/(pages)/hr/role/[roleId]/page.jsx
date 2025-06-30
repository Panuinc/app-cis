import Header from "@/components/other/Header";
import UIRoleForm from "@/components/ui/hr/role/UIRoleForm";
import React from "react";

export default function RoleUpdate() {
  return (
    <>
      <Header Header="Role Update" />
      <UIRoleForm isUpdate />
    </>
  );
}
