"use client";

import React, { useEffect, useState } from "react";
import Button from "./Shared/Button";

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const localConsent = localStorage.getItem("localConsent");
    if (!localConsent) setShowConsent(true);
  }, []);

  const acceptCookie = () => {
    setShowConsent(false);
    localStorage.setItem("localConsent", "false");
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed z-[20000000000]">
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-between gap-4 border-t bg-white px-4 py-4 text-[10px] text-[#222222] md:flex-row md:text-[14px]">
        <p className="text-justify">
          Welcome to SkyTrade! Like many websites, we use cookies to enhance your browsing experience, analyze site
          traffic, and personalize content. By clicking &ldquo; Accept &rdquo; you agree to the storing of cookies on
          your device. You can manage your preferences or withdraw your consent at any time by accessing our Cookie
          Settings.
        </p>

        <div className="flex w-full items-center justify-center gap-6 lg:w-[40%]">
          <Button onClick={acceptCookie} label="Accept" textColor="text-white" />

          <Button
            onClick={() => setShowConsent(false)}
            label="Decline"
            color="bg-white"
            textColor="text-[#0653EA]"
            className="border border-[#0653EA] md:mt-0"
          />
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
