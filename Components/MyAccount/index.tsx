"use client";

import React, { Fragment, useEffect, useState, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { createPortal } from "react-dom";

import PageHeader from "../../Components/PageHeader";
import Spinner from "../../Components/Spinner";
import Backdrop from "../../Components/Backdrop";

import UserService from "../../services/UserService";
import { toast } from "react-toastify";
import AccountVerification from "../../Components/MyAccount/AccountVerification";
import PersonalInformation from "../../Components/MyAccount/PersonalInformation";
import { User } from "../../types";
import Sidebar from "../Shared/Sidebar";
import { checkPhoneIsValid } from "../Auth/PhoneValidation";
import { Web3authContext } from "@/providers/web3authProvider";

const Account = () => {
  const { user, updateProfile, signIn, web3authStatus } = useAuth();
  const { updateUser, getUser } = UserService();

  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [newUserDetail, setNewUserDetail] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { provider } = useContext(Web3authContext);
  useEffect(() => {
    (async () => {
      let userData = user;
      if(provider){

        const { error, data } = await getUser();
        if (!error) {
          userData = data;
          signIn({ user: data });
        }
        if (userData) {
          setNewUserDetail({ ...userData });
        }
      }
    })();
  }, [user?.KYCStatusId, user?.name, user?.phoneNumber, web3authStatus , provider]);

  const updateDataHandler = async (e) => {
    e.preventDefault();
    if (!user || !newUserDetail) return toast.error("User not logged in");

    const { name, email, phoneNumber, newsletter } = newUserDetail;

    const check = await checkPhoneIsValid(phoneNumber);

    if (!check.status) {
      setIsPhoneNumberValid(false);
      setErrorMessage(check.message);
      return;
    }
    setIsLoading(true);

    try {
      const responseData = await updateUser({
        userId: user.id,
        name,
        phoneNumber,
        email,
      });

      if (responseData && responseData.errorMessage) {
        toast.error(responseData.errorMessage);
      } else if (responseData && !responseData.errorMessage) {
        const updatedUser = {
          ...user,
          name,
          phoneNumber,
          newsletter,
          email,
        };

        updateProfile(updatedUser);
        toast.success("Record updated succesfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyMyAccount = async () => {
    setIsLoading(true);
    // @ts-ignore
    // eslint-disable-next-line no-undef
    const client = await new Persona.Client({
      templateId: process.env.NEXT_PUBLIC_TEMPLATE_ID,
      referenceId: user?.id.toString(),
      environmentId: process.env.NEXT_PUBLIC_ENVIRONMENT_ID,
      onReady: () => {
        setIsLoading(false);
        client.open();
      },
      onComplete: async () => {
        const responseData = await getUser();
        if (!responseData.error) {
          setNewUserDetail({ ...responseData.data });
          signIn({ user: responseData.data });
        }
      },
    });
  };

  return (
    <Fragment>
      {isLoading && createPortal(<Backdrop />, document.getElementById("backdrop-root")!)}
      {isLoading && createPortal(<Spinner />, document.getElementById("backdrop-root")!)}

      <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden rounded bg-[#F6FAFF]">
        <Sidebar />
        <div className="flex h-full w-full flex-col">
          <PageHeader pageTitle={"Account"} />
          <section className="relative flex h-full w-full flex-col gap-[29px] overflow-y-auto px-[21px] pb-32 pt-12 md:mb-0 md:pl-[54.82px] md:pr-[47px]">
            <div className="flex flex-col gap-[15px]">
              <h2 className="text-xl font-normal text-[#222222]">My Profile</h2>
              <p className="text-base font-normal text-[#87878D]">Update your account settings</p>
            </div>
            {newUserDetail && (
              <>
                <AccountVerification
                  KYCStatusId={newUserDetail.KYCStatusId}
                  isLoading={isLoading}
                  onVerifyMyAccount={onVerifyMyAccount}
                />
                <PersonalInformation
                  personalInformation={newUserDetail}
                  setPersonalInformation={setNewUserDetail}
                  isPhoneNumberValid={isPhoneNumberValid}
                  errorMessage={errorMessage}
                  isLoading={isLoading}
                  updateDataHandler={updateDataHandler}
                  setIsPhoneNumberValid={setIsPhoneNumberValid}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default Account;
