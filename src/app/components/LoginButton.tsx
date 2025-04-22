'use client';

import { useFormStatus } from 'react-dom';

export function LoginButton({ isSuccess }: { isSuccess: boolean } ) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending || isSuccess }
        aria-disabled={pending || isSuccess }
        className={`
        mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold shadow-sm transition-colors duration-200 ease-in-out
        ${pending || isSuccess
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-purple-100 text-purple-800 hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600'
          }
      `}
      >
        {pending ? 'Logging in...' : 'Log in'}
      </button>
      { isSuccess ? (
        <div className="mt-6 flex h-[48px] w-full items-center justify-center rounded bg-green-500 px-4 py-2 text-white font-semibold shadow-sm transition-opacity duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        Welcome Back!
      </div>
      ) : "" }
    </>
  );
}