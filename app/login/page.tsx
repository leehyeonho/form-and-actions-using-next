'use client';

import { useFormState } from 'react-dom';
import { logIn } from '@/app/login/actions';
import { LoginButton } from '@/components/LoginButton';
import { SetStateAction, useEffect, useState } from 'react';
import { LoginInput } from '@/components/LoginInput';
import { EmailIcon, KeyIcon, UserIcon } from '@/components/IconBase';

export default function LoginPage() {
    const [state, action] = useFormState(logIn, null);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (state?.formError) {
            alert(state.formError);

            state.formError = "";
        }
    }, [state?.formError]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-24">
            <span className="text-4xl">🔥</span>
            <form action={action} className="w-full max-w-sm space-y-4 mt-6">
                <LoginInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                    icon={<EmailIcon />}
                    errors={state?.fieldErrors.email}
                />
                <LoginInput
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
                    icon={<UserIcon />}
                />
                <LoginInput
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
                    icon={<KeyIcon />}
                    errors={state?.fieldErrors.password}
                />
                <LoginButton />
            </form>
        </main>
    );
}