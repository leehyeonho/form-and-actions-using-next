"use client";

import { logout } from "@/app/(auth)/logout/actions";
import { redirect } from "next/navigation";

interface NavigationProps {
    current: string;
}

export default function Navigation({ current }: NavigationProps) {
    const handleLogout = async () => {
        await logout(); // 서버 액션 호출
        redirect("/");
    };

    return (
        <div className="sticky top-0 bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 border-b border-gray-700 flex justify-between">
            <h1 className="text-xl font-bold">{current}</h1>
            <h1 className="text-xl font-bold cursor-pointer" onClick={handleLogout}>
                로그아웃
            </h1>
        </div>
    );
}