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
      className="flex justify-center mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold shadow-sm transition-colors duration-200 ease-in-out bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}