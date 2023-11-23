import { Web3Auth } from '@web3auth/modal';
import { SolanaWallet } from '@web3auth/solana-provider';
import { Payload as SIWPayload, SIWWeb3 } from '@web3auth/sign-in-with-web3';
import { CustomChainConfig } from '@web3auth/base';

import base58 from 'bs58';

export const useSignature = () => {
  const signatureObject = async (blockchainAddress: string) => {
    const chainConfig: CustomChainConfig = {
      chainNamespace: 'solana',
      chainId: '0x1', // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
      rpcTarget: process.env.NEXT_PUBLIC_RPC_TARGET,
      displayName: 'Solana Mainnet',
      blockExplorer: 'https://explorer.solana.com',
      ticker: 'SOL',
      tickerName: 'Solana',
    };

    const web3auth = new Web3Auth({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      web3AuthNetwork: process.env.NEXT_PUBLIC_AUTH_NETWORK as any,
      chainConfig: chainConfig,
    });

    await web3auth.initModal();

    const web3authProvider = await web3auth.connect();

    const solanaWallet = new SolanaWallet(web3authProvider);

    const domain = window.location.host;

    const origin = window.location.origin;

    const payload = new SIWPayload();
    payload.domain = domain;
    payload.uri = origin;
    payload.address = blockchainAddress;
    payload.statement = 'Sign in to SkyTrade app.';
    payload.version = '1';
    payload.chainId = 1;

    const header = { t: 'sip99' };
    const network = 'solana';

    let message = new SIWWeb3({ header, payload, network });

    const messageText = message.prepareMessage();
    const msg = new TextEncoder().encode(messageText);
    const result = await solanaWallet.signMessage(msg);

    const signature = base58.encode(result);

    const formattedDate = new Date(message.payload.issuedAt).toISOString();

    return {
      sign: signature,
      sign_nonce: message.payload.nonce,
      sign_issue_at: formattedDate,
      sign_address: blockchainAddress,
    };
  };

  return { signatureObject };
};