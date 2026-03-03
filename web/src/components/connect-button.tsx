/**
 * Connect Button
 * Handles wallet connection + SIWE auth flow
 */

"use client";

import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { useAuth } from "@/hooks/useAuth";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { user, isAuthenticated, signIn, signOut, isSigningIn, isLoading } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);

  // When wallet connects but user isn't authenticated, prompt SIWE
  useEffect(() => {
    if (isConnected && !isAuthenticated && !isLoading && !isSigningIn) {
      setShowSignIn(true);
    } else {
      setShowSignIn(false);
    }
  }, [isConnected, isAuthenticated, isLoading, isSigningIn]);

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <RainbowConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Wrong Network
                    </button>
                  );
                }

                // Wallet connected, check auth status
                if (showSignIn) {
                  return (
                    <button
                      onClick={handleSignIn}
                      disabled={isSigningIn}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium rounded-lg transition-colors"
                    >
                      {isSigningIn ? "Signing..." : "Sign In"}
                    </button>
                  );
                }

                // Fully authenticated
                return (
                  <button
                    onClick={openAccountModal}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                  >
                    {user?.ensName || user?.displayName || (
                      <span className="font-mono">
                        {account.displayName}
                      </span>
                    )}
                    {chain.hasIcon && chain.iconUrl && (
                      <img
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        className="w-4 h-4"
                      />
                    )}
                  </button>
                );
              })()}
            </div>
          );
        }}
      </RainbowConnectButton.Custom>

      {/* Sign out button when authenticated */}
      {isAuthenticated && (
        <button
          onClick={signOut}
          className="px-3 py-2 text-gray-400 hover:text-white transition-colors"
          title="Sign Out"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
