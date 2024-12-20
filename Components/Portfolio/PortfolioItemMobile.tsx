import React, { useState } from "react";
import {
  ChevronRightIcon,
  DocumentApprovedIcon,
  DocumentRejectedIcon,
  LocationPointIcon,
  ReviewVerificationIcon,
} from "../Icons";
import AdditionalDocuments from "./AdditionalDocuments";
import VerificationSuccessPopup from "./VerificationSuccessPopup";
import UploadedDocuments from "./UploadedDocuments";
import { PropertyData, RequestDocument } from "@/types";
import { checkDocumentStatus } from "@/utils/propertyUtils/fileUpload";
import { PortfolioTabEnum } from "@/hooks/usePortfolioList";
import Modal from "./Modal";
import CancelClaimModal from "./CancelClaimModal";
import LoadingButton from "../LoadingButton/LoadingButton";
import { calculateTimeLeft, shortenAddress } from "@/utils";
import { useRouter } from "next/navigation";

interface PropsI {
  activeTab: PortfolioTabEnum;
  tags: Boolean[];
  type: string | undefined;
  selectAirspace: () => void;
  setUploadedDoc: any;
  refetchAirspaceRef: React.MutableRefObject<boolean>;
  modalRef: React.MutableRefObject<boolean>;
  onCloseModal: () => void;
  setAirspaceList: React.Dispatch<React.SetStateAction<PropertyData[]>>;
  selectedAirspace: any;
  setSelectedAirspace: any;
  createdAt: Date;
  airspace?: any;
}
function formatDate(isoDateStr) {
  const date = new Date(isoDateStr);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

const PortfolioItemMobile = ({
  refetchAirspaceRef,
  tags,
  type,
  selectAirspace,
  setUploadedDoc,
  activeTab,
  modalRef,
  onCloseModal,
  setAirspaceList,
  selectedAirspace,
  setSelectedAirspace,
  createdAt,
  airspace,
}: PropsI) => {
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [underReview, setUnderReview] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const documentStatus = checkDocumentStatus(airspace?.requestDocument);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleCancelClaim = () => {
    selectAirspace();
    setShowCancelModal(true);
    refetchAirspaceRef.current = false;
  };
  const handleOnClaim = () => {
    selectAirspace();
    modalRef.current = false;
    setShowModal(true);
  };

  const getHighestBid = () => {
    const highestBid = airspace?.auction?.currentPrice;

    return `$${highestBid}`;
  };

  const handleOutBidCheck = () => {
    return airspace.placedBid.price < airspace.auction.currentPrice;
  };

  return (
    <div>
      {showModal && (
        <Modal
          airspace={selectedAirspace}
          onCloseModal={() => {
            onCloseModal();
            setShowModal(false);
          }}
        />
      )}
      {showCancelModal && (
        <CancelClaimModal
          airspace={selectedAirspace}
          setShowCancelModal={setShowCancelModal}
          setSelectedAirspace={setSelectedAirspace}
          setAirspaceList={setAirspaceList}
        />
      )}

      {airspace.type === "receivedBid" || airspace.type === "placedBid" ?
        <div
          onClick={handleOnClaim}
          className="flex cursor-pointer items-center justify-between gap-[10px] rounded-lg bg-white p-[11px]"
          style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
        >
          <div className="flex flex-1 items-center gap-[10px]">
            <div className="h-6 w-6">
              <LocationPointIcon />
            </div>
            <p className="flex-1 text-[14px] font-normal text-[#222222]">
              {type === "receivedBid" && "My Airspace -"}{" "}
              {shortenAddress(airspace?.auction?.layer?.property?.address, 35)}
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            {type === "placedBid" && airspace?.auction?.hasEnded && handleOutBidCheck() ?
              <button
                className="rounded bg-blue-500 p-1 px-2 text-white"
                onClick={(event) => {
                  event.stopPropagation();
                  router.push(`/buy?auctionId=${airspace?.auction?.id}&bid=true`);
                }}
              >
                Place Higher Bid
              </button>
            : <button className="rounded bg-blue-500 p-1 px-2 text-white">Auction History</button>}

            <div className="h-[14px] w-[7px]">
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      : <div>
          <div className="w-screen cursor-pointer items-center justify-between gap-[10px] rounded-lg bg-white px-4 py-6 shadow-md">
            <div className="items-center justify-between gap-[10px] rounded-lg">
              <div className="flex flex-1 items-center gap-[10px]">
                <div className="h-6 w-6">
                  <LocationPointIcon />
                </div>
                <p className="flex-1 text-[14px] font-normal text-[#222222]">
                  {airspace.address.length > 15 ? airspace.address.slice(0, 25) + " ..." : airspace.address}
                </p>
              </div>
              <div className="">
                <div className="mt-2 flex w-full items-center justify-between gap-[10px]">
                  {!!tags[0] && (
                    <LoadingButton
                      onClick={handleOnClaim}
                      isLoading={false}
                      color={""}
                      className="p-2 cursor-pointer rounded-[3px] bg-[#DBDBDB] text-[11.89px] font-normal text-[#222222]"
                      disable={false}
                    >
                      {type === "land" ? `Claim Date: ${formatDate(createdAt)}` : "On Rent"}
                    </LoadingButton>
                  )}
                  {!!tags[1] && (
                    <div className="cursor-pointer rounded-[3px] bg-[#E7E6E6] px-[7px] text-sm font-normal text-[#222222]">
                      On Sale
                    </div>
                  )}
                  {!!tags[2] && (
                    <div className="cursor-pointer rounded-[3px] bg-[#222222] px-[7px] text-sm font-normal text-white">
                      No Fly Zone
                    </div>
                  )}
                  {!!tags[3] && (
                    <div className="cursor-pointer rounded-[3px] bg-[#E04F64] px-[7px] text-sm font-normal text-white">
                      Review Offer
                    </div>
                  )}
                  

                  {(documentStatus === "SUBMITTED" || underReview) && (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-6 w-6">
                        <ReviewVerificationIcon />
                      </div>
                      <p className="text-sm font-normal text-orange-500">Documents under review</p>
                    </div>
                  )}
                  {documentStatus === "APPROVED" && !underReview && (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-6 w-6">
                        <DocumentApprovedIcon />
                      </div>
                      <p className="text-sm font-normal text-[#1FD387]">Documents approved</p>
                    </div>
                  )}
                  {(documentStatus === "REJECTED" || documentStatus === "RE_UPLOAD") && !underReview && (
                    <div className="">
                      <div className="flex items-center justify-end">
                        <div className="mr-[10px] h-4 w-4">
                          <DocumentRejectedIcon />
                        </div>
                        <p className="text-sm font-normal text-[#E04F64]">Documents rejected</p>
                      </div>
                      <div className="h-[14px] w-[7px]">
                        <ChevronRightIcon />
                      </div>
                    </div>
                  )}
                </div>
                {
                  <div>
                    {documentStatus === "RE_UPLOAD" && !underReview && (
                      <button
                        onClick={handleButtonClick}
                        className="font mt-4 flex items-center rounded-[3px] border-[1px] border-[#F79663] px-[7px] text-[12px] leading-[26px] text-[#F79663]"
                      >
                        <pre>Re-updload</pre>
                      </button>
                    )}
                  </div>
                }
                <div className="mt-4 flex w-full items-center justify-between gap-12 ">
                
                {documentStatus === "NOT_SUBMITTED" && !underReview && airspace?.requestDocument && (
                  <div>
                    <div onClick={handleButtonClick} className="rounded-md border border-orange-500 p-2">
                      <p className="text-sm font-normal text-orange-500">Additional documents requested</p>
                    </div>
                  </div>
                )}
                {activeTab === PortfolioTabEnum.UNVERIFIED && (
                  <LoadingButton
                    onClick={handleCancelClaim}
                    isLoading={false}
                    color={""}
                    disable={false}
                    className="p-2 cursor-pointer rounded-[3px] bg-[#4285F4] text-[11.89px] font-normal text-white"
                  >
                    Cancel Claim
                  </LoadingButton>
                )}
                </div>



                {(documentStatus === "SUBMITTED" || underReview) && airspace?.requestDocument && (
                  <UploadedDocuments requestDocument={airspace?.requestDocument} />
                )}
                {showPopup && !underReview && airspace?.requestDocument && (
                  <AdditionalDocuments
                    setUnderReview={setUnderReview}
                    showPopup={showPopup}
                    setUploadedDoc={setUploadedDoc}
                    setShowSuccessToast={setShowSuccessToast}
                    closePopup={closePopup}
                    requestDocument={airspace?.requestDocument[airspace?.requestDocument?.length - 1]}
                  />
                )}

                {showSuccessToast && <VerificationSuccessPopup />}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default PortfolioItemMobile;
