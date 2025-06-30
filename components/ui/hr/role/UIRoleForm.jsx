"use client";
import React from "react";
import { Input, Button, Select, SelectItem } from "@heroui/react";

export default function UIRoleForm({
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  isUpdate,
  operatedBy,
}) {
  return (
    <>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-start w-full p-2 gap-2 bg-white rounded-2xl shadow-md overflow-auto"
      >
        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
            <Input
              name="roleName"
              type="text"
              label="Role Name"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              isClearable
              isRequired
              onChange={handleInputChange("roleName")}
              value={formData.roleName || ""}
              errorMessage={errors.roleName}
              isInvalid={!!errors.roleName}
            />
          </div>
        </div>
        {isUpdate && (
          <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
              <Select
                name="roleStatus"
                label="Role Status"
                labelPlacement="outside"
                placeholder="Please Enter Data"
                variant="bordered"
                color="default"
                isRequired
                selectedKeys={formData.roleStatus ? [formData.roleStatus] : []}
                onChange={handleInputChange("roleStatus")}
                value={formData.roleStatus || ""}
                errorMessage={errors.roleStatus}
                isInvalid={!!errors.roleStatus}
              >
                <SelectItem key="Active" value="Active">
                  Active
                </SelectItem>
                <SelectItem key="InActive" value="InActive">
                  InActive
                </SelectItem>
              </Select>
            </div>
          </div>
        )}

        <div className="flex flex-col xl:flex-row items-center justify-end w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
          <div className="flex items-center justify-center w-full h-full xl:w-4/12 p-2 gap-2 border-2 border-dark border-dashed">
            <Input
              name="operatedBy"
              type="text"
              label="Operated By"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="flat"
              color="default"
              isClearable
              isReadOnly
              value={operatedBy}
            />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
          <div className="flex items-center justify-end w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
            <Button
              type="submit"
              color="primary"
              className="flex items-center justify-center h-full p-3 gap-2"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
