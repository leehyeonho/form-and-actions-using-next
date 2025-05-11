"use server";
import {
    PASSWORD_MIN_LENGTH
} from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import getUser from "@/util/sessionUtil";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("admin");

const checkPasswords = ({
    password,
    confirm_password,
}: {
    password: string;
    confirm_password: string;
}) => password === confirm_password;

const formSchema = z
    .object({
        id: z.number().min(1),
        username: z
            .string()
            .toLowerCase()
            .trim()
            .refine(checkUsername, "No admin allowed!"),
        email: z.string().email().toLowerCase(),
        bio: z.string().nullable(),
        password: z.string().min(PASSWORD_MIN_LENGTH, { message: `패스워드는 최소 ${PASSWORD_MIN_LENGTH}자 이상을 입력해주세요.` }),
        confirm_password: z.string().min(PASSWORD_MIN_LENGTH, { message: `패스워드는 최소 ${PASSWORD_MIN_LENGTH}자 이상을 입력해주세요.` }),
    })
    .superRefine(async ({ username }, ctx) => {
        const user = await db.user.findUnique({
            where: {
                username,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "해당 사용자명은 이미 사용중입니다.",
                path: ["username"],
                fatal: true,
            });
            return z.NEVER;
        }
    })
    .superRefine(async ({ email }, ctx) => {
        const user = await db.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "해당 이메일은 이미 사용중입니다.",
                path: ["email"],
                fatal: true,
            });
            return z.NEVER;
        }
    })
    .refine(checkPasswords, {
        message: "패스워드 및 패스워드 확인 값이 다릅니다.",
        path: ["confirm_password"],
    });

export async function getUserInfo(username: string) {
    return await db.user.findUnique({
        where: {
            username,
        }
    })
}

export async function updateProfile(_: any, formData: FormData) {
    const user = await getUser();
    const data = {
        id: user.id,
        username: formData.get("username"),
        email: formData.get("email"),
        bio: formData.get("bio"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };
    const result = await formSchema.spa(data);
    if (!result.success) {
        console.log(result.error.flatten());
        return result.error.flatten();
    } else {
        const hashedPassword = await bcrypt.hash(result.data.password, 12);
        const user = await db.user.update({
            where: {
                id: result.data.id
            },
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword,
                bio: result.data.bio
            },
            select: {
                id: true,
            },
        });
        const session = await getSession();
        session.id = user.id;
        await session.save();
        redirect("/");
    }
}