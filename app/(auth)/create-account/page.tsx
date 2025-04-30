"use client";

import Button from "@/components/button";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { SubmitInput } from "@/components/SubmitInput";
import { EmailIcon, KeyIcon, UserIcon } from "@/components/IconBase";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-24">
      <div className="flex flex-col items-center w-full max-w-sm">
        <span className="text-4xl">🔥</span>
        <form action={dispatch} className="w-full max-w-sm space-y-4 mt-6">
          <SubmitInput
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            icon={<UserIcon />}
            errors={state?.fieldErrors.username}
            minLength={3}
            maxLength={10}
          />
          <SubmitInput
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            icon={<EmailIcon />}
            errors={state?.fieldErrors.email}
            required
          />
          <SubmitInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            icon={<KeyIcon />}
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
            required
            minLength={PASSWORD_MIN_LENGTH}
            errors={state?.fieldErrors.confirm_password}
          />
          <Button text="회원가입" />
        </form>
      </div>
    </main>
  );
}