/**
 * SIWE Nonce Generation
 * Returns a nonce for the client to sign
 */

import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { generateSiweNonce } from "viem/siwe";
import { sessionOptions, SessionData } from "@/lib/session";

export async function GET() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  
  // Generate a new nonce
  const nonce = generateSiweNonce();
  session.nonce = nonce;
  await session.save();
  
  return NextResponse.json({ nonce });
}
