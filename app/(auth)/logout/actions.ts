'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number;
}

export async function logout() {
  const session = await getIronSession<SessionContent>(await cookies(), {
    cookieName: 'logined',
    password: process.env.COOKIE_PASSWORD!,
  });

  session.destroy(); // 세션 제거
}