import { LoginForm } from '../components/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-24">
      <div className="flex flex-col items-center space-y-8 w-full max-w-sm">
        <span className="text-4xl">🔥</span>
        <LoginForm />
      </div>
    </main>
  );
}