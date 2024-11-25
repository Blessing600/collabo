import React from "react";
import SearchInput from "./SearchInput";
import RentableAirspaceLists from "./RentableAirspaceLists/RentableAirspaceLists";
import { PropertyData } from "@/types";
interface ExplorerProps {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  addresses: { id: string; place_name: string }[];
  showOptions: boolean;
  setFlyToAddress: React.Dispatch<React.SetStateAction<string>>;
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
  loadingReg: boolean;
  loading: boolean;
  regAdressShow: boolean;
  registeredAddress: PropertyData[];
  setShowRentDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setRentData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const Explorer: React.FC<ExplorerProps> = ({
  loadingReg,
  loading,
  address,
  setAddress,
  addresses,
  showOptions,
  regAdressShow,
  registeredAddress,
  setShowRentDetail,
  setRentData,
  setFlyToAddress,
  setShowOptions,
}) => {
  return (
    <div className="z-20 m-8 hidden h-[688px] w-[518px] overflow-hidden rounded-[30px] bg-white p-6 shadow-md md:block">
      <div>
        <div className="py-4 text-center text-[18px] font-semibold">SkyMarket Hub</div>
        <p className="mb-2 text-[14px]">Explore and Own Low-Altitude Air Rights, Your Gateway to Aerial Freedom.</p>
      </div>
      <SearchInput
        address={address}
        addresses={addresses}
        loading={loading}
        setAddress={setAddress}
        setFlyToAddress={setFlyToAddress}
        setShowOptions={setShowOptions}
        showOptions={showOptions}
      />
      <RentableAirspaceLists
        loadingReg={loadingReg}
        regAdressShow={regAdressShow}
        registeredAddress={registeredAddress}
        setRentData={setRentData}
        setShowRentDetail={setShowRentDetail}
      />
    </div>
  );
};
export default Explorer;
