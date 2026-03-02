import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/hackathons - List all hackathons
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  
  try {
    const hackathons = await db.hackathon.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        organizer: {
          select: {
            id: true,
            displayName: true,
            ensName: true,
            avatar: true,
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
      orderBy: { hackathonStart: "desc" },
    });

    return NextResponse.json(hackathons);
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    return NextResponse.json(
      { error: "Failed to fetch hackathons" },
      { status: 500 }
    );
  }
}

// POST /api/hackathons - Create a new hackathon
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Get user from session/auth
    const organizerId = body.organizerId;
    
    if (!organizerId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const hackathon = await db.hackathon.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
        description: body.description,
        longDescription: body.longDescription,
        registrationStart: new Date(body.registrationStart),
        registrationEnd: new Date(body.registrationEnd),
        hackathonStart: new Date(body.hackathonStart),
        hackathonEnd: new Date(body.hackathonEnd),
        maxParticipants: body.maxParticipants,
        maxTeamSize: body.maxTeamSize || 4,
        minTeamSize: body.minTeamSize || 1,
        prizePool: body.prizePool,
        organizerId,
      },
    });

    return NextResponse.json(hackathon, { status: 201 });
  } catch (error) {
    console.error("Error creating hackathon:", error);
    return NextResponse.json(
      { error: "Failed to create hackathon" },
      { status: 500 }
    );
  }
}
