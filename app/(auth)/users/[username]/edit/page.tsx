import Navigation from "@/components/Navigation";
import UpdateProfile from "@/components/UpdateProfile";
import { getUserInfo } from "./action";
import { redirect } from "next/navigation";



type PageParams = Promise<{ username: string }>;

export default async function Profile({ params }: { params: PageParams }) {
    const username = (await params).username;

    const user = await getUserInfo(username);
    if (!user) {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen max-w-7xl mx-auto">
            <main className="w-full border-r border-gray-700">
                <Navigation current="내 정보 수정" />

                <div className="sticky top-0 bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <a href="profile.html" className="text-xl hover:bg-gray-800 p-2 rounded-full">

                        </a>
                        <h1 className="text-xl font-bold">내 정보 수정</h1>
                    </div>
                </div>


                <div className="p-4">
                    <UpdateProfile user={user} />
                </div>
            </main>
        </div>
    );
}