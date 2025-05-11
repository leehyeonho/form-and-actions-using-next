"use client";

import { updateProfile } from "@/app/(auth)/users/[username]/edit/action";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { EmailIcon, KeyIcon, UserIcon } from "./IconBase";
import { SubmitInput } from "./SubmitInput";

export default function UpdateProfile({ user }: { user: User }) {
    const [state, action] = useFormState(updateProfile, null);

    return <>
        <div className="p-4 border-b border-gray-700">
            <form action={action} className="w-full space-y-4 flex flex-col items-center justify-center">
                <div className="flex space-x-3">
                    <div className="flex flex-col">
                        <SubmitInput
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            icon={<EmailIcon />}
                            value={`${user.email}`}
                            className="my-3 w-lg"
                            errors={state?.fieldErrors.email}
                            required
                        />
                        <SubmitInput
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            icon={<UserIcon />}
                            value={`${user.username}`}
                            className="my-3 w-lg"
                            errors={state?.fieldErrors.username}
                            minLength={3}
                            maxLength={10}
                        />
                        <SubmitInput
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon={<KeyIcon />}
                            className="my-3 w-lg"
                            minLength={PASSWORD_MIN_LENGTH}
                            required
                            errors={state?.fieldErrors.password}
                        />
                        <SubmitInput
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            icon={<KeyIcon />}
                            className="my-3 w-lg"
                            required
                            minLength={PASSWORD_MIN_LENGTH}
                            errors={state?.fieldErrors.confirm_password}
                        />
                        <textarea className="w-full bg-transparent text-xl p-2 resize-none placeholder-gray-500 border" value={`${user.bio? user.bio : ""}`} />
                    </div>
                </div>
                <button className="mt-2 px-4 py-2 border border-gray-600 rounded-full font-semibold hover:bg-gray-800 transition duration-150 cursor-pointer">
                    수정하기
                </button>
            </form>
        </div>
    </>
}