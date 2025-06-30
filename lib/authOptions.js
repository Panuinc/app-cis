import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password or PIN", type: "password" },
        loginType: { label: "Login Type", type: "text" },
      },
      async authorize(credentials) {
        if (
          !credentials?.username ||
          !credentials?.password ||
          !credentials?.loginType
        ) {
          throw new Error("Please Enter Username & Password/PIN");
        }

        const user = await prisma.empUser.findFirst({
          where: {
            empUserUsername: credentials.username,
          },
          include: {
            EmpUserEmpBy: {
              include: {
                empEmpEmployment: {
                  include: {
                    EmpEmploymentDivisionId: true,
                    EmpEmploymentDepartmentId: true,
                    EmpEmploymentRoleId: true,
                    EmpEmploymentPositionId: true,
                    EmpEmploymentParentBy: true,
                  },
                },
              },
            },
          },
        });

        if (!user) {
          throw new Error("Username Is Wrong");
        }

        if (!user.EmpUserEmpBy) {
          throw new Error("Employee details not found");
        }

        if (user.EmpUserEmpBy.empStatus !== "Active") {
          throw new Error("Account Is Not Active. Please Contact Admin");
        }

        if (credentials.loginType === "password") {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.empUserPassword ?? ""
          );
          if (!isPasswordValid) {
            throw new Error("Password Is Wrong");
          }
        } else if (credentials.loginType === "pin") {
          if (!user.empUserPin) {
            throw new Error("PIN is not set for this user");
          }
          const isPinValid = await bcrypt.compare(
            credentials.password,
            user.empUserPin
          );
          if (!isPinValid) {
            throw new Error("PIN Is Wrong");
          }
        } else {
          throw new Error("Invalid login type");
        }

        const employment = user.EmpUserEmpBy.empEmpEmployment?.[0];

        return {
          id: user.empUserId.toString(),
          nameTH: `${user.EmpUserEmpBy.empFirstNameTH} ${user.EmpUserEmpBy.empLastNameTH}`,
          nameEN: `${user.EmpUserEmpBy.empFirstNameEN} ${user.EmpUserEmpBy.empLastNameEN}`,
          email: user.EmpUserEmpBy.empEmail,
          tel: user.EmpUserEmpBy.empTel,
          divisionName: employment?.EmpEmploymentDivisionId?.divisionName,
          departmentName: employment?.EmpEmploymentDepartmentId?.departmentName,
          roleName: employment?.EmpEmploymentRoleId?.roleName,
          positionNameTH: employment?.EmpEmploymentPositionId?.positionNameTH,
          positionNameEN: employment?.EmpEmploymentPositionId?.positionNameEN,
          isFirstLogin: user.isFirstLogin,
          parentEmpEmployment: employment?.EmpEmploymentParentBy,
          picture: employment?.empEmploymentPicture ?? null,
          signature: employment?.empEmploymentSignature ?? null,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000;

      if (user) {
        token.user = user;
        token.lastActive = Date.now();
      } else if (token.lastActive) {
        const timeSinceLastActive = Date.now() - token.lastActive;
        if (timeSinceLastActive > INACTIVITY_TIMEOUT_MS) {
          token.user = undefined;
          return token;
        }
      }

      token.lastActive = Date.now();
      return token;
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      } else {
        session.user = undefined;
      }
      return session;
    },
  },
};
