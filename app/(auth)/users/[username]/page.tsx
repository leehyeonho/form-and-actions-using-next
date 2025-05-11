import Navigation from "@/components/Navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { getProfile } from "./action";
import Link from "next/link";
import TweetContent from "@/components/TweetContent";

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

type PageParams = Promise<{ username: string }>;

export default async function Profile({ params }: { params: PageParams }) {
    const user = await getUser();
    const username = (await params).username;

    const profile = await getProfile(username);

    return (
        <div className="flex min-h-screen max-w-7xl mx-auto">
            <main className="w-full border-r border-gray-700">
                <Navigation current="프로필" />

                <div className="sticky top-0 bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 border-b border-gray-700 flex items-center justify-between space-x-6">
                    <div>
                        <h1 className="text-xl font-bold">{profile?.username}</h1>
                    </div>
                    {
                        user.id === profile?.id ? (
                            <div className="flex justify-between items-start">
                                <Link href={`${profile.username}/edit`} className="mt-2 px-4 py-2 border border-gray-600 rounded-full font-semibold hover:bg-gray-800 transition duration-150">
                                    프로필 수정
                                </Link>
                            </div>
                        ) : ""
                    }
                </div>


                <div>

                    <div className="p-4">


                        <div className="mt-2">
                            <h2 className="text-2xl font-bold">{profile?.email}</h2>
                            <p className="text-gray-500">@{profile?.username}</p>
                        </div>

                        <p className="mt-3">
                            {profile?.bio}
                        </p>

                        <div className="mt-3 flex space-x-4 text-gray-500 text-sm">
                            <span className="flex items-center space-x-1">

                                <span>{`${profile?.created_at?.getFullYear()}년 ${profile?.created_at?.getMonth()}월 가입`}</span>
                            </span>
                        </div>
                    </div>
                </div>


                <div className="border-b border-gray-700 flex">
                    <button className="flex-1 p-4 text-center font-semibold hover:bg-gray-800 border-b-2 border-twitter text-twitter">트윗</button>
                </div>


                <div className="divide-y divide-gray-700">
                    {
                        profile?.tweets.map((tweet, idx) => (
                            <TweetContent key={idx} tweet={tweet} />
                        ))
                    }
                </div>
            </main>
        </div>
    );
}