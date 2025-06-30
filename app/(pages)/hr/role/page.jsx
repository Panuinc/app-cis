"use client";
import Header from "@/components/other/Header";
import React, { useEffect, useState } from "react";
import UIRoleList from "@/components/ui/hr/role/UIRoleList";

const SECRET_TOKEN = process.env.NEXT_PUBLIC_SECRET_TOKEN;

export default function RoleList() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const res = await fetch("/api/hr/role", {
          headers: {
            "secret-token": SECRET_TOKEN || "",
          },
        });
        const json = await res.json();
        if (res.ok && json.role) {
          setRoles(json.role);
        } else {
          console.error(json.error || "Failed to load roles");
        }
      } catch (err) {
        console.error("Error loading roles", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRoles();
  }, []);

  return (
    <>
      <Header Header="Role List" />
      <UIRoleList roles={roles} isLoading={isLoading} />
    </>
  );
}
