"use client";
import { Fragment, useEffect, useState } from "react";

import PageHeader from "@/Components/PageHeader";
import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import UserService from "@/services/UserService";
import Switcher from "@/Components/Referral/Switcher";
import InviteYourFriends from "@/Components/Referral/InviteYourFriends";
import YourReferrals from "@/Components/Referral/YourReferrals/YourReferrals";
import Share from "@/Components/Referral/Share/Share";
import AlertMessage from "@/Components/Referral/AlertMessage";
import ReferralProgramOverview from "@/Components/Referral/ReferralProgramOverview/ReferralProgramOverview";
import Sidebar from "@/Components/Shared/Sidebar";
import PointBalance from "@/Components/Referral/PointBalance";
import TransactionTable from "@/Components/Referral/ReferralHistory/ReferralHistory";
import { useMobile } from "@/hooks/useMobile";
import ReferralActivities from "@/Components/Referral/ReferralActivities";

const Referral = () => {
  const [fetchingCode, setFetchingCode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [data, setData] = useState({
    referralCode: "",
    registeredFriends: 0,
    registeredAirspaces: 0,
    validatedProperties: 0,
  });
  const { user, web3authStatus } = useAuth();
  const { retrieveUserReferralData } = UserService();
  const sections = ["The Program", "Share", "My Referrals"];
  useEffect(() => {
    (async () => {
      try {
        setFetchingCode(true);
        if (!user) return;
        const responseData = await retrieveUserReferralData();
        if (responseData) {
          setData(responseData);
          setFetchingCode(false);
        }
      } catch (error) {
        console.log(error);
        setFetchingCode(false);
      }
    })();
  }, [user, web3authStatus]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const {isMobile} = useMobile();


  return (
    <Fragment>
      <Head>
        <title>SkyTrade - Referral Program</title>
      </Head>

      <div className="relative rounded bg-[#F6FAFF] h-screen w-screen flex items-center justify-center overflow-hidden">
        <Sidebar />
        <div className="w-full h-full flex flex-col">
          <PageHeader pageTitle={"Referral Program"} />
          <section className="relative w-full h-full py-6 md:py-[37px] flex flex-col gap-8 mb-[78.22px] md:mb-0 overflow-y-scroll">
               <Switcher
               sections={sections}
               activeSection={activeIndex}
               setActiveSection={setActiveIndex}
             />
           
            <AlertMessage />

           
            <div className="md:flex justify-between items-center w-full">
            <PointBalance registeredFriends={data?.registeredFriends} />
            <ReferralActivities />
            </div>
              <div>
              <div className="flex flex-col items-center">
                {!isMobile && (
                <div className="flex  gap-10 border-b-4 border-[#D3D3D3] w-[95%]">
                {['The Program', 'Share Referral Link', 'Your Referral History'].map((item, index) => (
                  <div
                  key={index}
                  onClick={() => handleClick(index)}
                  className=" text-[#222222] text-[16px] relative px-8 py-1.5 cursor-pointer transition ease-linear delay-75"
                >
                  <span>{item}</span>
                  {activeIndex === index && (
                    <div className="absolute bottom-[-4px] left-0 right-0 h-1 bg-[#0653EA]"></div>
                  )}
                </div>
              ))}
            </div>
                )}

                <div className="mt-8 w-full mx-auto">
                {activeIndex === 0 &&  
                <ReferralProgramOverview
                  activeSection={activeSection}
                  section={0}
                />
                }
                {activeIndex === 1 &&  
                <div>
                  <Share
                    isLoading={fetchingCode}
                    referralCode={data?.referralCode}
                  />
                  <InviteYourFriends referralCode={data?.referralCode} /> 
                </div>
                }
                {activeIndex === 2 && 
                  <div className="container mx-auto p-4">
                  <div className="flex  flex-wrap-reverse w-full h-full gap-10 justify-center">
                    <div className=" w-full md:w-[55%]">
                      <TransactionTable />
                    </div>
                    <div className=" md:w-[40%]">
                      <YourReferrals
                        registeredFriends={data.registeredFriends}
                        registeredAirspaces={data.registeredAirspaces}
                        validatedProperties={data.validatedProperties}
                      />
                    </div>
                  </div>
                </div>
                }
                </div>  
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default Referral;