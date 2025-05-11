'use client';

import AddTweet from "@/components/AddTweet";
import Navigation from "@/components/Navigation";
import Pagination from "@/components/Pagination";
import TweetContent from "@/components/TweetContent";
import { useEffect, useState } from "react";
import { getTweetsAction } from "./action";

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

  return (
    <>
      <div className="flex min-h-screen max-w-7xl mx-auto">

        <main className="w-full border-r border-gray-700">
          <Navigation current="홈" />

          <AddTweet />

          <div className="divide-y divide-gray-700">
            {
              tweets.map((tweet, idx) => (
                <TweetContent key={idx} tweet={tweet} />
              ))
            }
          </div>
          <Pagination total={totalCount} size={pageSize} limit={pageSize} page={page} setPage={setPage} />
        </main>
      </div>
    </>
  );
}