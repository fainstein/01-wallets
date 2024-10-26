"use client";

import React from "react";
import { Address, WalletClient } from "viem";
import { connectWallet, getAndVerifySignature } from "@/config";

export default function Home() {
  const [walletClient, setWalletClient] = React.useState<
    WalletClient | undefined
  >();
  const [address, setAddress] = React.useState<Address | undefined>();
  const [isAuth, setIsAuth] = React.useState(false);

  const handleConnect = async () => {
    const { account, createdWalletClient } = await connectWallet();
    setAddress(account);
    setWalletClient(createdWalletClient);
  };

  const isConnected = !!address;

  const handleDisconnect = async () => {
    setAddress(undefined);
    setWalletClient(undefined);
    setIsAuth(false);
  };

  const signMessage = async () => {
    if (!address || !walletClient) {
      throw new Error("Wallet address and wallet client must be provided");
    }

    const { validation } = await getAndVerifySignature(address, walletClient);

    setIsAuth(validation);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 p-16 rounded-xl border border-muted shadow-md w-full max-w-lg">
        <h3 className="text-xl font-semibold text-center">
          Connect and verify
        </h3>
        <button
          className="rounded-md border border-1 px-4"
          onClick={isConnected ? handleDisconnect : handleConnect}
        >
          {isConnected ? "Disconnect" : "Connect wallet"}
        </button>
        <p className="text-sm">Address: {address}</p>
        <button
          className="rounded-md border border-1 px-4 disabled:opacity-60"
          onClick={signMessage}
          disabled={!isConnected}
        >
          Sign Message
        </button>
        <p className="text-sm">
          Status: {isAuth ? "Authenticated!" : "Not authenticated"}
        </p>
      </div>
    </main>
  );
}
