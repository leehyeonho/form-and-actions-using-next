"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

interface LogInErrorResponse {
  formError?: string;
  fieldErrors: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
}

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "해당 이메일이 존재하지 않습니다."),
  username: z.string(),
  password: z.string({
    required_error: "패스워드를 입력하세요",
  }),
});

export async function logIn(prevState: any, formData: FormData): Promise<LogInErrorResponse | void> {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return {
      formError: "입력 정보를 확인해주세요.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  } else {
    const user = await db.user.findFirst({
      where: {
        email: result.data.email,
        username: result.data.username
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      return {
        formError: "입력 정보를 확인해주세요.",
        fieldErrors: {
          email: [],
          password: [],
        },
      };
    }

    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/");
    } else {
      return {
        formError: "입력 정보를 확인해주세요.",
        fieldErrors: {
          password: [],
          email: [],
        },
      };
    }
  }
}