/**
 * Update User Profile
 * Allows authenticated users to update their profile
 */

import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.isLoggedIn || !session.address) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { displayName, bio, skills, github, twitter, discord, timezone } = body;

    // Validate skills is an array of strings
    const validatedSkills = Array.isArray(skills) 
      ? skills.filter((s) => typeof s === "string").slice(0, 10)
      : undefined;

    const user = await prisma.user.update({
      where: { address: session.address.toLowerCase() },
      data: {
        displayName: displayName?.slice(0, 50),
        bio: bio?.slice(0, 500),
        skills: validatedSkills,
        github: github?.slice(0, 100),
        twitter: twitter?.slice(0, 100),
        discord: discord?.slice(0, 100),
        timezone: timezone?.slice(0, 50),
      },
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
        timezone: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
