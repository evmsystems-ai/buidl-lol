import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/submissions/[id] - Get submission details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const submission = await db.submission.findUnique({
      where: { id },
      include: {
        team: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    displayName: true,
                    ensName: true,
                    avatar: true,
                    github: true,
                  },
                },
              },
            },
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
        track: true,
        hackathon: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        scores: {
          include: {
            criteria: true,
          },
        },
      },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 }
    );
  }
}

// PATCH /api/submissions/[id] - Update submission
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const body = await request.json();
    
    // Check if submission exists and is editable
    const existing = await db.submission.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    // Can only edit draft or submitted (before judging)
    if (existing.status !== "DRAFT" && existing.status !== "SUBMITTED") {
      return NextResponse.json(
        { error: "Cannot edit submission in current status" },
        { status: 400 }
      );
    }

    // Handle submit action
    const data: any = { ...body };
    if (body.submit && existing.status === "DRAFT") {
      data.status = "SUBMITTED";
      data.submittedAt = new Date();
      delete data.submit;
    }

    const submission = await db.submission.update({
      where: { id },
      data,
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}
