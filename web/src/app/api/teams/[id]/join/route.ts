import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/teams/[id]/join - Join a team via invite code
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const body = await request.json();
    const { userId, inviteCode } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find team by ID or invite code
    const team = await db.team.findFirst({
      where: {
        OR: [
          { id },
          { inviteCode: inviteCode || id },
        ],
      },
      include: {
        hackathon: {
          select: {
            maxTeamSize: true,
          },
        },
        _count: {
          select: { members: true },
        },
      },
    });

    if (!team) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 }
      );
    }

    // Check team capacity
    if (team._count.members >= team.hackathon.maxTeamSize) {
      return NextResponse.json(
        { error: "Team is full" },
        { status: 400 }
      );
    }

    // Add member
    const member = await db.teamMember.create({
      data: {
        userId,
        teamId: team.id,
        role: "MEMBER",
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            ensName: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Already a member of this team" },
        { status: 400 }
      );
    }
    
    console.error("Error joining team:", error);
    return NextResponse.json(
      { error: "Failed to join team" },
      { status: 500 }
    );
  }
}
