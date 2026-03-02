import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/hackathons/[slug]/register - Register for hackathon
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const body = await request.json();
    const { userId, lookingForTeam, skills, interests, availability, experience } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get hackathon
    const hackathon = await db.hackathon.findUnique({
      where: { slug },
      select: {
        id: true,
        status: true,
        maxParticipants: true,
        _count: { select: { participants: true } },
      },
    });

    if (!hackathon) {
      return NextResponse.json(
        { error: "Hackathon not found" },
        { status: 404 }
      );
    }

    // Check registration is open
    if (hackathon.status !== "REGISTRATION_OPEN") {
      return NextResponse.json(
        { error: "Registration is not open" },
        { status: 400 }
      );
    }

    // Check capacity
    if (hackathon.maxParticipants && hackathon._count.participants >= hackathon.maxParticipants) {
      return NextResponse.json(
        { error: "Hackathon is at capacity" },
        { status: 400 }
      );
    }

    // Create participant
    const participant = await db.participant.create({
      data: {
        userId,
        hackathonId: hackathon.id,
        lookingForTeam: lookingForTeam || false,
        skills: skills || [],
        interests,
        availability,
        experience,
      },
    });

    return NextResponse.json(participant, { status: 201 });
  } catch (error: any) {
    // Handle unique constraint violation (already registered)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Already registered for this hackathon" },
        { status: 400 }
      );
    }
    
    console.error("Error registering:", error);
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );
  }
}
