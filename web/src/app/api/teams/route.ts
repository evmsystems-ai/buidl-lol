import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/teams - List teams for a hackathon
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hackathonId = searchParams.get("hackathonId");
  
  if (!hackathonId) {
    return NextResponse.json(
      { error: "hackathonId is required" },
      { status: 400 }
    );
  }

  try {
    const teams = await db.team.findMany({
      where: { hackathonId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                ensName: true,
                avatar: true,
                skills: true,
              },
            },
          },
        },
        _count: {
          select: { submissions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

// POST /api/teams - Create a new team
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hackathonId, name, description, userId } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Create team with creator as leader
    const team = await db.team.create({
      data: {
        name,
        description,
        hackathonId,
        members: {
          create: {
            userId,
            role: "LEADER",
          },
        },
      },
      include: {
        members: {
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
        },
      },
    });

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}
