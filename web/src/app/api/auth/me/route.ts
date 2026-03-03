/**
 * Get Current User
 * Returns the authenticated user or null
 */

import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.isLoggedIn || !session.address) {
    return NextResponse.json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { address: session.address.toLowerCase() },
    select: {
      id: true,
      address: true,
      ensName: true,
      displayName: true,
      avatar: true,
      bio: true,
      skills: true,
      github: true,
      twitter: true,
      discord: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user });
}
