/**
 * SIWE Signature Verification
 * Verifies the signed message and creates/updates user
 */

import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { parseSiweMessage, validateSiweMessage } from "viem/siwe";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { sessionOptions, SessionData } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, signature } = body;

    if (!message || !signature) {
      return NextResponse.json(
        { error: "Message and signature are required" },
        { status: 400 }
      );
    }

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    // Parse the SIWE message
    const siweMessage = parseSiweMessage(message);
    
    if (!siweMessage.address) {
      return NextResponse.json(
        { error: "Invalid message: missing address" },
        { status: 400 }
      );
    }

    if (!siweMessage.nonce || siweMessage.nonce !== session.nonce) {
      return NextResponse.json(
        { error: "Invalid nonce" },
        { status: 400 }
      );
    }
    
    const address = siweMessage.address as `0x${string}`;

    // Validate the message
    const isValid = await validateSiweMessage({
      address,
      message,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid message" },
        { status: 400 }
      );
    }

    // Verify the signature
    const valid = await publicClient.verifyMessage({
      address,
      message,
      signature,
    });

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Create or update user in database
    const user = await prisma.user.upsert({
      where: { address: address.toLowerCase() },
      update: {
        updatedAt: new Date(),
      },
      create: {
        address: address.toLowerCase(),
      },
    });

    // Try to get ENS name
    let ensName = null;
    try {
      ensName = await publicClient.getEnsName({ address });
      
      if (ensName && ensName !== user.ensName) {
        await prisma.user.update({
          where: { id: user.id },
          data: { ensName },
        });
      }
    } catch (e) {
      // ENS lookup failed, continue without it
    }

    // Update session
    session.address = address.toLowerCase();
    session.chainId = siweMessage.chainId;
    session.isLoggedIn = true;
    session.nonce = undefined; // Clear nonce after use
    await session.save();

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        address: user.address,
        ensName: ensName || user.ensName,
        displayName: user.displayName,
      },
    });
  } catch (error) {
    console.error("SIWE verification error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
