import {
  Address,
  createWalletClient,
  custom,
  verifyMessage,
  WalletClient,
} from "viem";
import { mainnet } from "viem/chains";
import "viem/window";

export const connectWallet = async () => {
  const [account] = await window.ethereum!.request({
    method: "eth_requestAccounts",
  });

  const createdWalletClient = createWalletClient({
    account,
    chain: mainnet,
    transport: custom(window.ethereum!),
  });

  return { account, createdWalletClient };
};

export const getAndVerifySignature = async (
  address: Address,
  walletClient: WalletClient
) => {
  const message = `Please sign this message in order to verify ownership of ${address}`;

  // Getting signature
  const signature = await walletClient?.signMessage({
    message,
    account: address,
  });

  // Verifying owner
  const validation = await verifyMessage({
    address,
    message,
    signature,
  });

  return { validation, signature };
};
