import { useEffect, useRef } from "react";
import { CloseIconWhite, SuccessIconwhite } from "../Icons";
import { getTokenLink } from "@/hooks/utils";
import Link from "next/link";

import { PropertyData } from "@/types";

interface SuccessModalProps {
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  finalAns:
    | { status: string; message?: string | undefined; tokenId?: string }
    | null
    | undefined;
  rentData: PropertyData | undefined | null;
  setShowClaimModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  setShowSuccess,
  finalAns,
  rentData,
  setShowClaimModal,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSuccess(false);
        setShowClaimModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSuccess, setShowClaimModal]);

  return (
    <div
      ref={modalRef}
      className={`md:max-w-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white md:rounded-[30px] w-full  z-50`}
    >
      <div
        className={`w-[100%] md:h-[100%] h-screen py-10 z-40 flex flex-col gap-[15px] items-center  md:rounded-3xl ${finalAns?.status === "Rent Successful" ? "bg-[#34A853]" : "bg-[#F5AA5E]"}`}
      >
        <div
          onClick={() => {
            setShowSuccess(false);
            setShowClaimModal(false);
          }}
          className="w-[26px] h-[26px] absolute top-[10px] right-[10px] "
        >
          <div className="hidden sm:block absolute top-[10px] right-[10px] cursor-pointer">
            <CloseIconWhite />
          </div>
        </div>

        <div className="w-16 h-16 md:mt-6 mt-24 ">
          {finalAns?.status === "Rent Successful" ? (
            <SuccessIconwhite />
          ) : (
            <CloseIconWhite />
          )}
        </div>
        {finalAns?.status === "Rent Successful" ? (
          <>
            <div className="w-full mt-6">
              <h1 className=" font-medium text-xl text-center text-[#FFFFFF] font-poppins">
                Your rental order is complete
              </h1>
            </div>
          </>
        ) : (
          <>
            <div className="w-full  mt-6">
              <h1 className=" font-medium text-xl text-center text-[#FFFFFF] font-poppins">
                Rent failed
              </h1>
            </div>
          </>
        )}

        <div className=" px-6 w-full  mt-4  md:mt-[2rem] ">
          <div className="font-normal text-lg leading-7 text-center text-[#FFFFFF] font-poppins">
            {finalAns?.status === "Rent Successful" && (
              <div>
                'You rented'{" "}
                {rentData && (
                  <>
                    <span className=" text-lg font-bold">{`${rentData.address}`}</span>{" "}
                  </>
                )}
                {` for `}{" "}
                {rentData && (
                  <span className=" text-lg font-bold">
                    ${rentData.price}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="font-normal  text-lg leading-7 text-center text-[#FFFFFF] font-poppins">
            {finalAns?.status !== "Rent Successful" && (
              <div>{`${finalAns?.message}`}</div>
            )}
          </div>
        </div>

        {finalAns?.status === "Rent Successful" && (
          <div className=" w-[75%] ">
            <p className="font-normal text-[10px] text-center text-[#FFFFFF]">
              A copy of your transaction is availble inside your Portfolio{" "}
            </p>
          </div>
        )}

        {finalAns?.status === "Rent Successful" && (
          <>
            <Link
              target="_blank"
              href={getTokenLink(finalAns.tokenId)}
              className="py-2 font-bold text-center text-[#FFFFFF] text-[14px] underline"
            >
              Transaction Link
            </Link>
          </>
        )}

        {finalAns?.status === "Rent Successful" ? (
          <>
            <button
              onClick={()=> ( setShowClaimModal(false))}
              className=" py-2 w-[50%] h-[41px]  border rounded-md gap-10 bg-[#34A853] text-center text-[#FFFFFF] text-lg"
              
            >
              Portfolio
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setShowSuccess(false);
                setShowClaimModal(false);
              }}
              className=" mt-[2.5rem] py-2 w-[50%] h-[41px]  border rounded-md gap-10 text-center text-[#FFFFFF] text-lg"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default SuccessModal;