"use client";
import Header from "@/components/other/Header";
import toast, { Toaster } from "react-hot-toast";
import UIRoleForm from "@/components/ui/hr/role/UIRoleForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useCallback } from "react";

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;

export default function RoleCreate() {
  const { data: sessionData } = useSession();
  const { id: userId = "", nameTH = "" } = sessionData?.user ?? {};

  const router = useRouter();
  const formRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ roleName: "" });

  const handleChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => {
        const { [field]: removed, ...rest } = prev;
        return rest;
      });
    },
    []
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formRef.current) return;

      const form = new FormData(formRef.current);
      form.append("roleCreateBy", userId);

      try {
        const res = await fetch("/api/hr/role", {
          method: "POST",
          body: form,
          headers: { "secret-token": SECRET_TOKEN || "" },
        });

        const result = await res.json();

        if (res.ok) {
          toast.success(result.message);
          setTimeout(() => router.push("/role"), 2000);
        } else {
          if (result.details) {
            const fieldErrors = Object.fromEntries(
              result.details.map((d) => [d.field?.[0], d.message])
            );
            setErrors(fieldErrors);
          }
          toast.error(result.error || "Failed to create role.");
        }
      } catch (err) {
        toast.error(`Failed to create role: ${err.message}`);
      }
    },
    [userId, router]
  );

  return (
    <>
      <Toaster position="top-right" />
      <Header Header="Role Create" />
      <UIRoleForm
        header="เพิ่ม ระดับตำแหน่ง"
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={nameTH}
      />
    </>
  );
}
