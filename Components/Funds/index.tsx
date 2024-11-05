"use client";

import React, { useState, Fragment, useContext } from "react";
import useAuth from "@/hooks/useAuth";

import PageHeader from "../PageHeader";
import Backdrop from "../Backdrop";
import Spinner from "../Spinner";
import AvailableBalance from "./AvailableBalance";
import DepositAndWithdraw from "./DepositAndWithdraw";
import TransactionHistory from "./TransactionHistory";
import Head from "next/head";
import Sidebar from "../Shared/Sidebar";
import { useMobile } from "@/hooks/useMobile";
import { useAppSelector } from "../../redux/store";

const Funds = () => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const { user } = useAuth();
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const { userUSDWalletBalance } = useAppSelector((state) => {
    const { userUSDWalletBalance } = state.userReducer;
    return { userUSDWalletBalance };
  });
  const { isMobile } = useMobile();

  return (
    <Fragment>
      <Head>
        <title>SkyTrade - Wallet</title>
      </Head>
      <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden rounded bg-white sm:bg-[#F6FAFF]">
        <Sidebar />
        <div className="flex h-full w-full flex-col">
          <PageHeader pageTitle={"Funds"} />
          <section className="relative mb-[78.22px] flex h-[calc(100%-91px)] w-full flex-col gap-8 overflow-y-scroll md:mb-0">
            <div className="flex w-full justify-center gap-10 p-8">
              <div
                className={`${isMobile ? "flex w-full flex-col items-center gap-5 sm:items-start" : "flex flex-col items-center gap-5 sm:w-[468px] sm:items-start"} border`}
              >
                <AvailableBalance />
                <DepositAndWithdraw
                  walletId={user?.blockchainAddress || ""}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  setTokenBalance={setTokenBalance}
                  tokenBalance={parseFloat(userUSDWalletBalance.amount)}
                />
              </div>
              <div className={`w-full sm:flex sm:w-auto sm:flex-grow`}>
                <TransactionHistory />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default Funds;
