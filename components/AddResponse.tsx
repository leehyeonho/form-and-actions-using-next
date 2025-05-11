"use client";

import { uploadResponse } from "@/app/(auth)/tweets/[id]/action";
import { useFormState } from "react-dom";
import Button from "./button";
import Input from "@/components/input";

export default function AddResponse({ tweetId }: { tweetId: number }) {
    const [state, action] = useFormState(uploadResponse, null);

    return <>
        <div className="p-4 border-b border-gray-700">
            <form action={action} className="w-full space-y-4">
                <input className="hidden" type="hidden" name="tweetId" value={tweetId} />
                <div className="flex space-x-3">
                    <div className="flex-1">
                        <Input name="response" placeholder="댓글을 입력하세요" errors={state?.fieldErrors.tweet} />
                        <div className="flex justify-center items-center mt-2 pt-2">
                            <Button text="등록" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
}