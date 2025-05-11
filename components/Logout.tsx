import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id,
            },
        });
        if (user) {
            return user;
        }
    }
    notFound();
}

export default async function Navigation() {
    const user = await getUser();
    const logOut = async () => {
        "use server";
        const session = await getSession();
        session.destroy();
        redirect("/");
    };
    return (
        <div className="sticky top-0 bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 border-b border-gray-700 flex justify-between">
            <h1 className="text-xl font-bold">홈</h1>
            <h1 className="text-xl font-bold">로그아웃</h1>
        </div>
    );
}