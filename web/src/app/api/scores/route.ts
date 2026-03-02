import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/scores - Submit a score for a submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { judgeId, submissionId, criteriaId, value, comment } = body;
    
    if (!judgeId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Validate score value
    const criteria = await db.judgingCriteria.findUnique({
      where: { id: criteriaId },
    });

    if (!criteria) {
      return NextResponse.json(
        { error: "Invalid criteria" },
        { status: 400 }
      );
    }

    if (value < 0 || value > criteria.maxScore) {
      return NextResponse.json(
        { error: `Score must be between 0 and ${criteria.maxScore}` },
        { status: 400 }
      );
    }

    // Upsert score (update if exists, create if not)
    const score = await db.score.upsert({
      where: {
        judgeId_submissionId_criteriaId: {
          judgeId,
          submissionId,
          criteriaId,
        },
      },
      update: {
        value,
        comment,
      },
      create: {
        judgeId,
        submissionId,
        criteriaId,
        value,
        comment,
      },
    });

    return NextResponse.json(score);
  } catch (error) {
    console.error("Error submitting score:", error);
    return NextResponse.json(
      { error: "Failed to submit score" },
      { status: 500 }
    );
  }
}

// GET /api/scores - Get scores for a submission or by judge
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const submissionId = searchParams.get("submissionId");
  const judgeId = searchParams.get("judgeId");
  
  try {
    const scores = await db.score.findMany({
      where: {
        ...(submissionId && { submissionId }),
        ...(judgeId && { judgeId }),
      },
      include: {
        criteria: true,
        judge: {
          select: {
            id: true,
            displayName: true,
            ensName: true,
          },
        },
      },
    });

    return NextResponse.json(scores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 }
    );
  }
}
