'use client';

import AddTweet from "@/components/AddTweet";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTweetsAction } from "./action";

const pageSize = 2;

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


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col items-center w-full">
        <span className="text-4xl">🔥</span>
        <AddTweet />
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-6 border">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tweets</h2>
            <ul className="divide-y divide-gray-200">
              {
                tweets.map(tweet => (
                  <li key={tweet.id} className="cursor-pointer py-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition duration-150 ease-in-out">
                    <Link href={`/tweets/${tweet.id}`}>
                      <div className="mb-2 sm:mb-0 sm:ml-3">
                        <p className="text-sm font-semibold text-indigo-600">{tweet.user.username}</p>
                        <p className="text-base text-gray-800 mt-1">{tweet.tweet}</p>
                      </div>

                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <Pagination total={totalCount} size={2} limit={pageSize} page={page} setPage={setPage} />
        </div>
      </div>
    </main>
  );
}