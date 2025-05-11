"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="w-full bg-twitter text-white font-bold py-2 px-4 rounded-full hover:bg-blue-500 transition duration-150"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}