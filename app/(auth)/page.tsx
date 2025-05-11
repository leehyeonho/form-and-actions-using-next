'use client';

import AddTweet from "@/components/AddTweet";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTweetsAction } from "./action";
import Navigation from "@/components/Navigation";

const pageSize = 5;

export default function Main() {
  const [page, setPage] = useState(1);
  const [tweets, setTweets] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadTweets = async () => {
      const result = await getTweetsAction(page, pageSize);
      setTweets(result.tweets);
      setTotalCount(result.totalCount);
    };

    loadTweets();
  }, [page]);


  function getTweetTimeAgo(created_at: any): import("react").ReactNode {
    const now = new Date();
    const diffMs = now.getTime() - created_at.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays >= 1) {
      return `${diffDays}일 전`;
    } else if (diffHours >= 1) {
      return `${diffHours}시간 전`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes <= 0 ? '방금 전' : `${diffMinutes}분 전`;
    }
  }

  return (
    <>
      <div className="flex min-h-screen max-w-7xl mx-auto">

        <main className="w-full border-r border-gray-700">
          <Navigation current="홈" />

          <AddTweet />

          <div className="divide-y divide-gray-700">
            {
              tweets.map(tweet => (
                <article key={tweet.id} className="p-4 hover:bg-gray-800 transition duration-150">
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold hover:underline">{tweet.user.email}</span>
                          <span className="text-gray-500 ml-1">@{tweet.user.username} · {getTweetTimeAgo(tweet.created_at)}</span>
                        </div>
                      </div>
                      <Link href={`/tweets/${tweet.id}`}>
                        <p className="mt-1">{tweet.tweet}</p>
                      </Link>
                      <div className="flex justify-end mt-3 text-gray-500">
                        <a className="flex items-center space-x-1 hover:text-twitter group mx-5">
                          <svg data-slot="icon" fill="none" width="25" height="25" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                          </svg>
                          <span>123</span>
                        </a>
                        <Link href={`/tweets/${tweet.id}`} className="flex items-center space-x-1 hover:text-green-500 group ">
                          <svg data-slot="icon" fill="none" width="25" height="25" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"></path>
                          </svg>
                          <span>45</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            }
          </div>
          <Pagination total={totalCount} size={pageSize} limit={pageSize} page={page} setPage={setPage} />
        </main>
      </div>
    </>
  );
}