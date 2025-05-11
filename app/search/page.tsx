'use client';

import Navigation from "@/components/Navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SearchTweetAction } from "./action";
import TweetContent from "@/components/TweetContent";

export default function Search() {
    const [state, formAction] = useFormState(SearchTweetAction, null); // formAction으로 이름 변경
    const [tweets, setTweets] = useState<any[]>([]);
    const [currentKeyword, setCurrentKeyword] = useState("");

    useEffect(() => {
        if (state) {
            if (state.tweets) {
                setTweets(state.tweets); // 타입 단언
            } else {
                setTweets([]); // 검색 결과가 없거나 오류 시 빈 배열로
            }
            if (state?.keyword) {
                setCurrentKeyword(state.keyword);
            }
        }
    }, [state]);


    

    return (
        <>
            <div className="flex min-h-screen max-w-7xl mx-auto">


                <main className="w-full border-r border-gray-700">
                    <Navigation current="검색" />

                    <div className="sticky top-0 bg-gray-900 bg-opacity-80 backdrop-blur-md p-3 border-b border-gray-700">
                        <form action={formAction} className="w-full space-y-4 mt-6">
                            <div className="relative">
                                <input type="text" placeholder="트위터 검색" name="keyword" defaultValue={currentKeyword}
                                    className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-twitter focus:bg-gray-900" />
                            </div>
                        </form>
                    </div>

                    <div className="p-4">
                        {
                            tweets.map((tweet, idx) => (
                                <TweetContent key={idx} tweet={tweet} />
                            ))
                        }
                    </div>
                </main>
            </div>
        </>
    );
}