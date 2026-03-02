import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/submissions - List submissions
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hackathonId = searchParams.get("hackathonId");
  const teamId = searchParams.get("teamId");
  const status = searchParams.get("status");
  
  try {
    const submissions = await db.submission.findMany({
      where: {
        ...(hackathonId && { hackathonId }),
        ...(teamId && { teamId }),
        ...(status && { status: status as any }),
      },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        submitter: {
          select: {
            id: true,
            displayName: true,
            ensName: true,
            avatar: true,
          },
        },
        track: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

// POST /api/submissions - Create/submit a project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      hackathonId,
      teamId,
      submitterId,
      trackId,
      name,
      tagline,
      description,
      githubUrl,
      demoUrl,
      videoUrl,
      deployedUrl,
      techStack,
      submit, // if true, mark as submitted
    } = body;
    
    if (!submitterId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Validate GitHub URL
    if (!githubUrl || !githubUrl.includes("github.com")) {
      return NextResponse.json(
        { error: "Valid GitHub URL is required" },
        { status: 400 }
      );
    }

    const submission = await db.submission.create({
      data: {
        hackathonId,
        teamId,
        submitterId,
        trackId,
        name,
        tagline,
        description,
        githubUrl,
        demoUrl,
        videoUrl,
        deployedUrl,
        techStack: techStack || [],
        status: submit ? "SUBMITTED" : "DRAFT",
        submittedAt: submit ? new Date() : null,
      },
      include: {
        team: true,
        track: true,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}
