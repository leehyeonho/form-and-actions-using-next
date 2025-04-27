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

export default async function Profile() {
    const user = await getUser();
    const logOut = async () => {
        "use server";
        const session = await getSession();
        session.destroy();
        redirect("/");
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-24">
            <div className="flex flex-col items-center w-full max-w-sm">
                <h1 className="text-red-800 text-xl">{user?.username}</h1>
                <form action={logOut}>
                    <button className="flex justify-center mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold shadow-sm transition-colors duration-200 ease-in-out bg-red-100 text-red-800 hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Log out</button>
                </form>
            </div>
        </main>
    );
}