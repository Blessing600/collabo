import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import Script from "next/script";

import CookieConsent from "@/Components/CookieConsent";

import { AuthProvider } from "@/hooks/useAuth";
import { msclaritConfig } from "@/hooks/msclaritConfig";
import { useMobile } from "@/hooks/useMobile";
import { useEffect, useState } from "react";
import { SidebarProvider } from "@/hooks/sidebarContext";
import { ToastContainer } from "react-toastify";
import { TourProvider } from "@reactour/tour";

import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const { isMobile } = useMobile();
  const [doItAgain, setDoItAgain] = useState(false);

  useEffect(() => {
    var Tawk_API = global?.Tawk_API || undefined;
    if (!Tawk_API) return;

    if (isMobile) {
      if (Tawk_API.hideWidget !== undefined) {
        Tawk_API.hideWidget();
      } else if (!doItAgain) {
        setDoItAgain(true);
      }
    } else {
      if (Tawk_API.showWidget !== undefined) {
        Tawk_API.showWidget();
      } else if (doItAgain) {
        setDoItAgain(false);
      }
    }
  }, [isMobile, global.Tawk_API, doItAgain]);

  return (
    <AuthProvider>
      <TourProvider
        steps={steps}
        prevButton={({ currentStep, setCurrentStep, steps }) => {
          const first = currentStep === 0;
          return (
            <button
              onClick={() => {
                if (first) {
                  setCurrentStep((s) => steps.length - 1);
                } else {
                  setCurrentStep((s) => s - 1);
                }
              }}
            >
              Back
            </button>
          );
        }}
        nextButton={({
          currentStep,
          stepsLength,
          setIsOpen,
          setCurrentStep,
          steps,
        }) => {
          const last = currentStep === stepsLength - 1;
          return (
            <button
              onClick={() => {
                if (last) {
                  setIsOpen(false);
                } else {
                  setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1));
                }
              }}
            >
              {last ? "Close!" : "Next"}
            </button>
          );
        }}
      >
        <Provider store={store}>
          <>
            <Script src="https://cdn.withpersona.com/dist/persona-v4.8.0.js" />
            <Script id="show-banner" dangerouslySetInnerHTML={msclaritConfig} />
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-C0J4J56QW5" />
            <Script id="google-analytics">
              {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
          
                  gtag('config', 'G-C0J4J56QW5');
              `}
            </Script>
            <SidebarProvider>
              <ToastContainer style={{ width: "500px" }} />
              <Component {...pageProps} />
            </SidebarProvider>
            <CookieConsent />
          </>
        </Provider>
      </TourProvider>
    </AuthProvider>
  );
}

const steps = [
  {
    selector: ".first-step",
    content: "Enter your address and outlined your property",
  },
  {
    selector: ".second-step",
    content:
      "click  on claim property CTA, to opens modal select your preference",
  },
  {
    selector: ".third-step",
    content:
      "fill in the details and select your preference (rent/sell details section or both)",
  },
  {
    selector: ".fourth-step",
    content:
      "Click the ‘Claim Airspace’ button to confirm your airspace address.",
  },
];
