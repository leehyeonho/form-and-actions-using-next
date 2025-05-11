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
    <main className="bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex flex-col justify-center items-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#1DA1F2" height="100" width="100" version="1.1" id="Layer_1" viewBox="0 0 310 310" xmlSpace="preserve">
            <g id="XMLID_826_">
              <path id="XMLID_827_" d="M302.973,57.388c-4.87,2.16-9.877,3.983-14.993,5.463c6.057-6.85,10.675-14.91,13.494-23.73   c0.632-1.977-0.023-4.141-1.648-5.434c-1.623-1.294-3.878-1.449-5.665-0.39c-10.865,6.444-22.587,11.075-34.878,13.783   c-12.381-12.098-29.197-18.983-46.581-18.983c-36.695,0-66.549,29.853-66.549,66.547c0,2.89,0.183,5.764,0.545,8.598   C101.163,99.244,58.83,76.863,29.76,41.204c-1.036-1.271-2.632-1.956-4.266-1.825c-1.635,0.128-3.104,1.05-3.93,2.467   c-5.896,10.117-9.013,21.688-9.013,33.461c0,16.035,5.725,31.249,15.838,43.137c-3.075-1.065-6.059-2.396-8.907-3.977   c-1.529-0.851-3.395-0.838-4.914,0.033c-1.52,0.871-2.473,2.473-2.513,4.224c-0.007,0.295-0.007,0.59-0.007,0.889   c0,23.935,12.882,45.484,32.577,57.229c-1.692-0.169-3.383-0.414-5.063-0.735c-1.732-0.331-3.513,0.276-4.681,1.597   c-1.17,1.32-1.557,3.16-1.018,4.84c7.29,22.76,26.059,39.501,48.749,44.605c-18.819,11.787-40.34,17.961-62.932,17.961   c-4.714,0-9.455-0.277-14.095-0.826c-2.305-0.274-4.509,1.087-5.294,3.279c-0.785,2.193,0.047,4.638,2.008,5.895   c29.023,18.609,62.582,28.445,97.047,28.445c67.754,0,110.139-31.95,133.764-58.753c29.46-33.421,46.356-77.658,46.356-121.367   c0-1.826-0.028-3.67-0.084-5.508c11.623-8.757,21.63-19.355,29.773-31.536c1.237-1.85,1.103-4.295-0.33-5.998   C307.394,57.037,305.009,56.486,302.973,57.388z" />
            </g>
          </svg>
          <h1 className="text-3xl font-bold text-white mt-2">트위터 회원가입하기</h1>
        </div>
        <form action={dispatch} className="w-full max-w-sm space-y-4 mt-6">
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