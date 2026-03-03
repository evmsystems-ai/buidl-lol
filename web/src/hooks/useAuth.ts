/**
 * Auth Hook
 * Handles SIWE authentication flow
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import { createSiweMessage } from "viem/siwe";

interface User {
  id: string;
  address: string;
  ensName?: string | null;
  displayName?: string | null;
  avatar?: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isSigningIn: boolean;
  error: string | null;
}

export function useAuth() {
  const { address, isConnected, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isSigningIn: false,
    error: null,
  });

  // Check current session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // Re-check when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      checkSession();
    }
  }, [isConnected, address]);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      
      setState((prev) => ({
        ...prev,
        user: data.user,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        user: null,
        isLoading: false,
      }));
    }
  };

  const signIn = useCallback(async () => {
    if (!address || !chainId) {
      setState((prev) => ({ ...prev, error: "Wallet not connected" }));
      return;
    }

    setState((prev) => ({ ...prev, isSigningIn: true, error: null }));

    try {
      // Get nonce from server
      const nonceRes = await fetch("/api/auth/nonce");
      const { nonce } = await nonceRes.json();

      // Create SIWE message
      const message = createSiweMessage({
        address,
        chainId,
        domain: window.location.host,
        nonce,
        uri: window.location.origin,
        version: "1",
        statement: "Sign in to buidl.lol",
      });

      // Sign the message
      const signature = await signMessageAsync({ message });

      // Verify on server
      const verifyRes = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature }),
      });

      const result = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(result.error || "Verification failed");
      }

      setState({
        user: result.user,
        isLoading: false,
        isSigningIn: false,
        error: null,
      });

      return result.user;
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isSigningIn: false,
        error: error.message || "Sign in failed",
      }));
      throw error;
    }
  }, [address, chainId, signMessageAsync]);

  const signOut = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      disconnect();
      setState({
        user: null,
        isLoading: false,
        isSigningIn: false,
        error: null,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [disconnect]);

  return {
    user: state.user,
    isLoading: state.isLoading,
    isSigningIn: state.isSigningIn,
    error: state.error,
    isAuthenticated: !!state.user,
    signIn,
    signOut,
    checkSession,
  };
}
