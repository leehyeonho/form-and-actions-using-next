import AddResponse from "@/components/AddResponse";
import LikeButton from "@/components/LikeButton";
import Navigation from "@/components/Navigation";
import { getResponses } from "@/service/responseService";
import { notFound } from "next/navigation";
import { getTweet } from "./action";
import { getCachedLikeStatus } from "@/service/likeService";

function formatDateTime(date: Date | undefined): string {
    if (!date) {
        return "";
    }

    const koreaTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

    const hours = koreaTime.getHours();
    const minutes = koreaTime.getMinutes();
    const period = hours < 12 ? '오전' : '오후';
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');

    const year = koreaTime.getFullYear();
    const month = koreaTime.getMonth() + 1; // 0-based
    const day = koreaTime.getDate();

    return `${period} ${formattedHour}:${formattedMinutes}, ${year}년 ${month}월 ${day}일`;
}

export default async function Tweet({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }

    const tweet = await getTweet(id);
    const responses = await getResponses(id);
    const { isLiked, likeCount } = await getCachedLikeStatus(id);

    return <>
        <div className="flex min-h-screen max-w-7xl mx-auto">


            <main className="w-full border-r border-gray-700">
                <Navigation current="트윗" />


                <article className="p-4 border-b border-gray-700">
                    <div className="flex space-x-3 items-start">
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold hover:underline">{tweet?.user.email}</p>
                                    <p className="text-gray-500 text-sm">
                                        <span>@{tweet?.user.username}</span>
                                        <span> · {formatDateTime(tweet?.created_at)}</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <p className="mt-3 text-2xl">{tweet?.tweet}</p>

                    <div className="flex justify-end mt-3 text-gray-500">
                        <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
                        <a className="flex items-center space-x-1 hover:text-green-500 group ">
                            <svg data-slot="icon" fill="none" width="25" height="25" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"></path>
                            </svg>
                            <span>{responses.length}</span>
                        </a>
                    </div>
                </article>

                <AddResponse tweetId={id} />

                <div className="divide-y divide-gray-700">
                    {
                        responses?.map(response => (
                            <article className="p-4 hover:bg-gray-800 transition duration-150">
                                <div className="flex space-x-3">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-bold hover:underline">답글 작성자</span>
                                                <span className="text-gray-500 ml-1">@{response.user.username} · {formatDateTime(response.created_at)}</span>
                                            </div>

                                        </div>
                                        <p className="mt-1">{response.response}</p>
                                    </div>
                                </div>
                            </article>
                        ))
                    }
                </div>
            </main>
        </div>
    </>;
}