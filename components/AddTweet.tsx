import { uploadTweet } from "@/app/(auth)/action";
import { useFormState } from "react-dom";
import Button from "./button";
import Input from "@/components/input";

export default function AddTweet() {
    const [state, action] = useFormState(uploadTweet, null);

    return <>
        <div className="border p-6 m-6">
            <form action={action} className="w-full max-w-sm space-y-4">
                <Input name="tweet" placeholder="tweet 내용 입력" errors={state?.fieldErrors.tweet} />
                <Button text="등록" />
            </form>
        </div>
    </>
}