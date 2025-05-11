import { uploadTweet } from "@/app/(auth)/action";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import Button from "./button";

export default function AddTweet() {
    const [state, action] = useFormState(uploadTweet, null);
    
    return <>
        <div className="divide-y divide-gray-700 m-10">
            <div className="flex justify-center space-x-3">
                <form action={action} className="w-full max-w-sm space-y-4">
                    <Input name="tweet" placeholder="트윗 내용을 입력하세요~!" errors={state?.fieldErrors.tweet} />
                    <div className="flex justify-center items-center mt-2 pt-2 border-t border-gray-800">
                        <Button text="등록" />
                    </div>
                </form>
            </div>
        </div>
    </>
}