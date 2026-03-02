import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/hackathons/[slug] - Get hackathon details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const hackathon = await db.hackathon.findUnique({
      where: { slug },
      include: {
        organizer: {
          select: {
            id: true,
            displayName: true,
            ensName: true,
            avatar: true,
          },
        },
        tracks: true,
        criteria: true,
        announcements: {
          where: { published: true },
          orderBy: { publishAt: "desc" },
          take: 5,
        },
        agentConfigs: {
          select: {
            agentType: true,
            enabled: true,
          },
        },
        _count: {
          select: {
            participants: true,
            teams: true,
            submissions: true,
          },
        },
      },
    });

    if (!hackathon) {
      return NextResponse.json(
        { error: "Hackathon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hackathon);
  } catch (error) {
    console.error("Error fetching hackathon:", error);
    return NextResponse.json(
      { error: "Failed to fetch hackathon" },
      { status: 500 }
    );
  }
}

// PATCH /api/hackathons/[slug] - Update hackathon
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const body = await request.json();
    
    // TODO: Verify user is organizer
    
    const hackathon = await db.hackathon.update({
      where: { slug },
      data: body,
    });

    return NextResponse.json(hackathon);
  } catch (error) {
    console.error("Error updating hackathon:", error);
    return NextResponse.json(
      { error: "Failed to update hackathon" },
      { status: 500 }
    );
  }
}
