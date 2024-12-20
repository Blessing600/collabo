import { useContext, useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";
import AirspaceRentalService from "@/services/AirspaceRentalService";
import { PropertyData } from "@/types";
import { Web3authContext } from "@/providers/web3authProvider";
import { useAppDispatch } from "@/redux/store";
import { setActivePortfolioTab } from "@/redux/slices/userSlice";

export enum PortfolioTabEnum {
  VERIFIED,
  UNVERIFIED,
  REJECTED,
  RENTED,
  PENDING_RENTAL,
  BIDS,
}

const usePortfolioList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useAppDispatch();
  const [airspaceList, setAirspaceList] = useState<PropertyData[]>([]);

  const [loading, setLoading] = useState(true);
  const [totalAirspace, setTotatAirspace] = useState(0)

  const [activeTab, setActiveTab] = useState<PortfolioTabEnum>(PortfolioTabEnum.VERIFIED);
  const { user } = useAuth();
  const { web3auth } = useContext(Web3authContext);

  const {
    getPropertiesByUserAddress,
    getUnverifiedAirspaces,
    getRetrievePendingRentalAirspace,
    getRejectedAirspaces,
    getBidsAndOffers,
  } = AirspaceRentalService();

  const refetchRef = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        if ((web3auth && web3auth?.status !== "connected") || !user?.blockchainAddress) {
          return;
        }
        let airspaces = [];
        let totalAirspace = 0
        setLoading(true);
        const assetId = airspaceList.length > 0 ? airspaceList.at(-1)?.id : "";

        if (activeTab === PortfolioTabEnum.VERIFIED) {
          airspaces = await getPropertiesByUserAddress("landToken", 10, String(assetId));
        } else if (activeTab === PortfolioTabEnum.RENTED) {
          airspaces = await getPropertiesByUserAddress("rentalToken", 10, String(assetId));
        } else if (activeTab === PortfolioTabEnum.UNVERIFIED) {
          const airspaceResp = await getUnverifiedAirspaces(pageNumber, 7);
          console.log(airspaceResp, "airspaceRespairspaceResp")
          if (airspaceResp && airspaceResp.items) {
            airspaces = airspaceResp.items;
            totalAirspace = airspaceResp.total
          }
        } else if (activeTab === PortfolioTabEnum.PENDING_RENTAL) {
          const airspaceResp = await getRetrievePendingRentalAirspace(pageNumber, 10);
          if (airspaceResp && airspaceResp.items) {
            airspaces = airspaceResp.items;
          }
        } else if (activeTab === PortfolioTabEnum.BIDS) {
          const airspaceResp = await getBidsAndOffers(user?.blockchainAddress);

          if (airspaceResp) {
            airspaces = airspaceResp;
          }
        } else {
          const airspaceResp = await getRejectedAirspaces(pageNumber, 10);

          if (airspaceResp && airspaceResp.items) {
            airspaces = airspaceResp.items;
          }
        }
        setAirspaceList(airspaces);
        setTotatAirspace(totalAirspace)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [activeTab, web3auth?.status, pageNumber, refetchRef.current, user?.blockchainAddress]);

  const handleNextPage = (pageNumber: number) => {
    if ((totalAirspace / pageNumber) <= 0) return;
    setPageNumber(pageNumber);
  };

  const handlePrevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const handleTabSwitch = (tab: PortfolioTabEnum) => {
    setAirspaceList([]);
    setPageNumber(1);
    setActiveTab(tab);
    dispatch(setActivePortfolioTab(tab));
  };

  return {
    activeTab,
    loading,
    airspaceList,
    pageNumber,
    handleTabSwitch,
    handlePrevPage,
    handleNextPage,
    setAirspaceList,
    refetchAirspaceRef: refetchRef,
    totalAirspace
  };
};

export default usePortfolioList;
