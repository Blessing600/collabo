import { useTour } from "@reactour/tour";
import React, { useState } from "react";
import { BuildingsIcon, CircleDollarIcon, InfoIcon, LocationPointIcon, MagnifyingGlassIcon } from "../../Icons";
import AirRightEstimateMetadata from "./AirRightEstimateMetadata";
import Button from "@/Components/Shared/Button";

interface PropsI {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  addresses: { id: string; place_name: string }[];
  showOptions: boolean;
  onClaimAirspace: () => void;
  handleSelectAddress: (value: string, fetchEstimates: boolean) => void;
  flyToAddress: string;
  airRightEstimates: any;
  isLoadingEstimates: boolean;
}

const Explorer = ({
  address,
  setAddress,
  addresses,
  showOptions,
  handleSelectAddress,
  onClaimAirspace,
  flyToAddress,
  airRightEstimates,
  isLoadingEstimates,
}: PropsI) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const { isOpen } = useTour();

  const mainEstimate = airRightEstimates ? airRightEstimates.main.estimate : undefined;

  return (
    <div
      className="z-20 m-[39px] hidden max-h-full max-w-[370px] flex-col items-center gap-[15px] rounded-[30px] bg-[#FFFFFFCC] px-[29px] py-[43px] md:flex"
      style={{ boxShadow: "0px 12px 34px -10px #3A4DE926" }}
    >
      <div className="flex items-center gap-[5px]">
        <p className="text-xl font-medium text-[#222222]">Claim Air Rights</p>
        <div
          onClick={() => setIsInfoVisible((prev) => !prev)}
          className="relative flex h-[20px] w-[20px] items-center justify-center"
        >
          <InfoIcon />
          {isInfoVisible && (
            <div className="absolute -top-4 left-6 w-[189px] rounded-[4px] bg-[#CCE3FC] p-[12px] text-[10px] font-normal italic">
              Note that we store your data securely with advanced encryption and strict authentication measures to
              ensure utmost privacy and protection.
            </div>
          )}
        </div>
      </div>
      <p className="break-words text-[15px] font-normal text-[#222222]">
        Ready to claim your air rights? No registered air rights yet, but exciting times ahead!
      </p>
      <div
        className="enter-address-step relative w-full rounded-lg bg-white px-[22px] py-[16px]"
        style={{ border: "1px solid #87878D" }}
      >
        <input
          autoComplete="off"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          name="searchAirspaces"
          id="searchAirspaces"
          placeholder="Search Air Rights"
          className="w-full pr-[20px] outline-none"
        />
        <div className="absolute right-[22px] top-1/2 h-[17px] w-[17px] -translate-y-1/2">
          <MagnifyingGlassIcon />
        </div>
        {showOptions && (
          <div className="absolute left-0 top-[55px] mt-2 h-[279px] w-full flex-col overflow-y-scroll rounded-lg rounded-t-[8px] border-t-4 border-t-[#4285F4] bg-white">
            {addresses.map((item) => {
              return (
                <div
                  key={item.id}
                  // Value={item.place_name}
                  onClick={() => handleSelectAddress(item.place_name, true)}
                  className="w-full p-4 text-left text-[#222222]"
                  style={{
                    borderBottom: "0.2px solid #DBDBDB",
                  }}
                >
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-[10%]">
                      <LocationPointIcon />
                    </div>

                    <div className="w-[90%]">{item.place_name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {((flyToAddress && address) || isOpen) && (
        <div>
          {isLoadingEstimates && (
            <p className="animate-pulse text-[15px] text-light-black">Estimating Air Right Value...</p>
          )}

          {!isLoadingEstimates && !mainEstimate && (
            <>
              <p className="my-4 text-center text-[20px] font-medium">My Air Rights</p>

              <p className="text-[15px] font-normal text-[#222222]">
                Please ensure the address entered matches the registered property address to accurately claim this area.
              </p>
            </>
          )}

          <div className="mt-4 w-[304px] rounded-2xl bg-white p-4">
            <div className="mb-3 flex items-center">
              <div className="mr-2 h-6 w-[10%]">
                <LocationPointIcon />
              </div>
              <div className="w-[90%]">{address}</div>
            </div>

            {!isLoadingEstimates && mainEstimate && (
              <>
                <AirRightEstimateMetadata
                  title="Est. Price Per Square Foot*"
                  value={mainEstimate.value}
                  icon={<BuildingsIcon />}
                />

                <div className="my-3">
                  <AirRightEstimateMetadata
                    title="Est. Annual Passive Income*"
                    value={mainEstimate.annualProjection}
                    icon={<CircleDollarIcon />}
                  />
                </div>
              </>
            )}

            <Button onClick={onClaimAirspace} label="Claim Air Rights" className="Claim-airspacebtn-step" />
            {!isLoadingEstimates && mainEstimate && (
              <div className="mt-2">
                <span className="text-sm italic text-[#93B1ED]">*Estimated Property Value (USA Beta version)</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explorer;
