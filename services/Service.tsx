import React, { Fragment, useContext } from "react";
import { SolanaWallet } from "@web3auth/solana-provider";
import { Payload as SIWPayload, SIWWeb3 } from "@web3auth/sign-in-with-web3";
import { Web3authContext } from "@/providers/web3authProvider";
import axios from "axios";
import base58 from "bs58";
import { toast } from "react-toastify";

interface RequestI {
  uri: string;
  isPublic?: boolean;
  postData?: any;
  suppressErrorReporting?: boolean;
}

const Service = () => {
  const { provider } = useContext(Web3authContext);

  console.log({ NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL })

  const toastError = (error: any, suppressErrorReporting?: boolean) => {
    console.error(error);
    if (
      !suppressErrorReporting &&
      error.response &&
      error.response.status === 500 &&
      error.response?.data?.errorMessage
    ) {
      if (error.response?.data?.errorMessage !== "UNAUTHORIZED") {
        toast.error(error.response?.data?.errorMessage);
      }
    }
  };

  const createHeader = async ({ isPublic, uri }: {
    uri: string;
    isPublic?: boolean;
  }) => {
    try {
      let newHeader = {};

      if (provider && !isPublic) {
        const solanaWallet = new SolanaWallet(provider);
        const accounts = await solanaWallet.requestAccounts();
  
        const payload = new SIWPayload();
  
        payload.domain = String(process.env.NEXT_PUBLIC_FRONTEND_DOMAIN);
        payload.uri = String(process.env.NEXT_PUBLIC_FRONTEND_URI);
        payload.address = accounts[0];
        payload.statement = "Sign in to SkyTrade app.";
        payload.version = "1";
        payload.chainId = 1;
  
        const header = { t: "sip99" };
        const network = "solana";
  
        let message = new SIWWeb3({ header, payload, network });
  
        const messageText = message.prepareMessage();
        const msg = new TextEncoder().encode(messageText);
        const result = await solanaWallet.signMessage(msg);
  
        const signature = base58.encode(result);
  
        newHeader = {
          "Content-Type": "application/json",
          sign: signature,
          time: message.payload.issuedAt,
          nonce: message.payload.nonce,
          address: accounts[0],
        };

      } else {
        newHeader = {
          "Content-Type": "application/json",
        };
      }

      return {
        ...newHeader,
        api_key: process.env.NEXT_PUBLIC_FRONTEND_API_KEY, // TODO: remove
        uri,
      }

    } catch (error) {
      console.error(error);
    }
  };

  const getRequest = async ({ uri, isPublic, suppressErrorReporting }: RequestI) => {
    try {
      const headers = await createHeader({ isPublic, uri });

      if (!isPublic && !headers) return null;
      return await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/proxy?${Date.now()}`,
        headers,
      });
    } catch (error) {
      toastError(error, suppressErrorReporting);
    }
  };

  const postRequest = async ({
    uri,
    postData,
    isPublic,
    suppressErrorReporting,
  }: RequestI) => {
    try {
      const headers = await createHeader({ isPublic, uri });

      if (!isPublic && !headers) return null;

      return await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/proxy?${Date.now()}`,
        data: { ...postData },
        headers,
      });
    } catch (error) {
      toastError(error, suppressErrorReporting);
    }
  };

  const patchRequest = async ({
    uri,
    postData,
    isPublic,
    suppressErrorReporting,
  }: RequestI) => {
    try {
      const headers = await createHeader({ isPublic, uri });

      if (!isPublic && !headers) return null;

      return await axios({
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/proxy?${Date.now()}`,
        data: { ...postData },
        headers,
      });
    } catch (error) {
      toastError(error, suppressErrorReporting);
    }
  };

  const deleteRequest = async ({
    uri,
    postData,
    isPublic,
    suppressErrorReporting,
  }: RequestI) => {
    try {
      const headers = await createHeader({ isPublic, uri });

      if (!isPublic && !headers) return null;

      return await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/proxy?${Date.now()}`,
        data: { ...postData },
        headers,
      });
    } catch (error) {
      toastError(error, suppressErrorReporting);
    }
  };
  return { getRequest, postRequest, patchRequest, deleteRequest };
};

export default Service;
