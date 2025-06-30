"use client";
import Header from "@/components/other/Header";
import toast, { Toaster } from "react-hot-toast";
import UIRoleForm from "@/components/ui/hr/role/UIRoleForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useCallback } from "react";

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;

export default function RoleUpdate() {
  const { data: sessionData } = useSession();
  const { id: userId = "", nameTH = "" } = sessionData?.user ?? {};

  const router = useRouter();
  const { roleId } = useParams();
  const formRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ roleName: "", roleStatus: "" });

  useEffect(() => {
    if (!roleId) return;
    (async () => {
      try {
        const res = await fetch(`/api/hr/role/${roleId}`, {
          headers: { "secret-token": SECRET_TOKEN || "" },
        });
        const result = await res.json();

        if (res.ok && result.role?.length) {
          setFormData(result.role[0]);
        } else {
          toast.error(result.error || "Failed to load role data.");
        }
      } catch (err) {
        toast.error(`Failed to load data: ${err.message}`);
      }
    })();
  }, [roleId]);

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
      if (!roleId || !formRef.current) return;

      const form = new FormData(formRef.current);
      form.append("roleUpdateBy", userId);

      try {
        const res = await fetch(`/api/hr/role/${roleId}`, {
          method: "PUT",
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
          toast.error(result.error || "Failed to update role.");
        }
      } catch (err) {
        toast.error(`Failed to update role: ${err.message}`);
      }
    },
    [userId, roleId, router]
  );

  return (
    <>
      <Toaster position="top-right" />
      <Header Header="Role Update" />
      <UIRoleForm
        formRef={formRef}
        onSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        handleInputChange={handleChange}
        operatedBy={nameTH}
        isUpdate
      />
    </>
  );
}
