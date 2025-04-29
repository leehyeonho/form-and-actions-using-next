import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getTweet(id: number) {
    return await db.tweet.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    })
}

export default async function tweet({
    params,
}: {
    params: { id: string }
}) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }

    const tweet = await getTweet(id);
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <div className="flex flex-col items-center w-full">
                <span className="text-4xl">🔥</span>
                {
                    tweet ? (
                        <div className="bg-white rounded-lg overflow-hidden">
                            <div className="p-6 border">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tweets</h2>
                                <ul className="divide-y divide-gray-200">
                                    <li key={tweet.id} className="cursor-pointer py-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <div className="mb-2 sm:mb-0 sm:ml-3">
                                            <p className="text-sm font-semibold text-indigo-600">{tweet.user.username}</p>
                                            <p className="text-base text-gray-800 mt-1">{tweet.tweet}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        </main>
    );
}