"use client";
import Header from "@/components/other/Header";
import toast, { Toaster } from "react-hot-toast";
import UIRoleForm from "@/components/ui/hr/role/UIRoleForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useCallback } from "react";

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;

export default function RoleUpdate() {
  return (
    <>
      <Toaster position="top-right" />
      <Header Header="Role Update" />
      <UIRoleForm isUpdate />
    </>
  );
}
