import getTweetTimeAgo from "@/util/dateUtil";
import { Tweet } from "@prisma/client";
import Link from "next/link";

interface TweetContent {
    tweet: string;
    id: number;
    created_at: Date;
    updated_at: Date;
    userId: number;
    user: {
        username: string,
        email: string
    },
    _count: {
        likes: number,
        Response: number
    }
}

export default function TweetContent({ tweet }: { tweet: TweetContent }) {
    return <>
        <article key={tweet.id} className="p-4 hover:bg-gray-800 transition duration-150">
            <div className="flex space-x-3">
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href={`/users/${tweet.user.username}`}><span className="font-bold hover:underline">{tweet.user.email}</span></Link>
                            <span className="text-gray-500 ml-1">@{tweet.user.username} · {getTweetTimeAgo(tweet.created_at)}</span>
                        </div>
                    </div>
                    <Link href={`/tweets/${tweet.id}`}>
                        <p className="mt-1">{tweet.tweet}</p>
                    </Link>
                    <div className="flex justify-end mt-3 text-gray-500">
                        <a className="flex items-center space-x-1 hover:text-twitter group mx-5">
                            <svg data-slot="icon" fill="none" width="25" height="25" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                            </svg>
                            <span>{tweet._count?.likes}</span>
                        </a>
                        <Link href={`/tweets/${tweet.id}`} className="flex items-center space-x-1 hover:text-green-500 group ">
                            <svg data-slot="icon" fill="none" width="25" height="25" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"></path>
                            </svg>
                            <span>{tweet._count?.Response}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    </>
}