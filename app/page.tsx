import Link from "next/link";

export default function Main() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-24">
      <div className="flex flex-col items-center w-full max-w-sm">
        <span className="text-4xl">🔥</span>
        <Link
          href="/login"
          className="flex justify-center mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold shadow-sm transition-colors duration-200 ease-in-out bg-purple-100 text-purple-800 hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >시작하기</Link>
        <Link
          href="/create-account"
          className="flex justify-center mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold shadow-sm transition-colors duration-200 ease-in-out bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
        >
          계정이 없으신가요?
        </Link>
      </div>
    </main>
  );
}