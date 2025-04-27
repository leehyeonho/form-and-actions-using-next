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
        className={`
        mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold shadow-sm transition-colors duration-200 ease-in-out
        ${pending
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-purple-100 text-purple-800 hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600'
          }
      `}
      >
        {pending ? '로그인 중...' : '로그인'}
      </button>
    </>
  );
}