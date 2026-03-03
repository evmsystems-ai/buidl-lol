/**
 * Iron Session Configuration
 * Handles session management for SIWE auth
 */

import { SessionOptions } from "iron-session";

export interface SessionData {
  nonce?: string;
  address?: string;
  chainId?: number;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long_for_dev",
  cookieName: "buidl_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};
