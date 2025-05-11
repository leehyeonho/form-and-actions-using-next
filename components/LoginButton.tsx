'use client';

import { useFormStatus } from 'react-dom';

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending }
        aria-disabled={pending }
        className="w-full bg-twitter text-white font-bold py-2 px-4 rounded-full hover:bg-blue-500 transition duration-150"
      >
        {pending ? '로그인 중...' : '로그인'}
      </button>
    </>
  );
}