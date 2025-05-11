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
      className="bg-twitter text-white px-4 py-1 rounded-full font-bold hover:bg-blue-500 transition duration-150"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}