'use client';

import { useFormState } from 'react-dom';
import { handleForm } from '../app/(auth)/login/actions';
import { LoginButton } from './LoginButton';
import { SetStateAction, useState } from 'react';
import { LoginInput } from './LoginInput';

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.566-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
  </svg>
);

export function LoginForm() {
  const [state, action] = useFormState(handleForm, null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form action={action} className="w-full max-w-sm space-y-4">
      <LoginInput
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
        icon={<EmailIcon />}
        errors={state?.errors?.email}
      />
      <LoginInput
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
        icon={<UserIcon />}
        errors={state?.errors?.username}
      />
      <LoginInput
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
        icon={<KeyIcon />}
        errors={state?.errors?.password}
      />
      <LoginButton
        isSuccess={state?.type === 'success'}
      />
    </form>
  );
}