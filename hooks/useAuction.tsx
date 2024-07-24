// import { useContext, useEffect, useState } from "react";
// import useAuth from "@/hooks/useAuth";
// import AirspaceRentalService from "@/services/AirspaceRentalService";
// import { AuctionSubmitI, PropertyData } from "@/types";
// import { Web3authContext } from "@/providers/web3authProvider";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { setAirspaceList, setIsTriggerRefresh } from "@/redux/slices/userSlice";
// import { LAMPORTS_PER_SOL, VersionedTransaction } from "@solana/web3.js";
// import { executeTransaction } from "@/utils/rent/transactionExecutor";
// import MarketplaceService from "@/services/MarketplaceService";
// import { toast } from "react-toastify";

// interface SelectedPropertyI {
//   assetId: string;
//   propertyId: number;
//   name: string;
//   minSalePrice: number;
//   endDate: Date | null;
// }

// export enum TransactionStatusEnum {
//   PENDING,
//   SUCCESS,
//   FAILED,
// }

// const useAuction = () => {
//   const {
//     airspaceList,
//     isTriggerRefresh,
//     userSolBalance,
//     userUSDWalletBalance,
//   } = useAppSelector((state) => {
//     const {
//       airspaceList,
//       isTriggerRefresh,
//       userSolBalance,
//       userUSDWalletBalance,
//     } = state.userReducer;
//     return {
//       airspaceList,
//       isTriggerRefresh,
//       userSolBalance,
//       userUSDWalletBalance,
//     };
//   });

//   const dispatch = useAppDispatch();
//   const [selectedItems, setSelectedItems] = useState<SelectedPropertyI[]>([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [transactionStatus, setTransactionStatus] = useState(
//     TransactionStatusEnum.PENDING
//   );
//   const [responseStatus, setResponseStatus] = useState<"SUCCESS" | "FAIL">(
//     "FAIL"
//   );
//   const [txHash, setTxHash] = useState<string | null | undefined>(null);
//   const [selectedItemId, setSelectedItemId] = useState<number | null>(null); // Track the selected item
//   const { createAuction, submitAuction, getAuctions } = MarketplaceService();
//   const { provider } = useContext(Web3authContext);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(true);

//   const { user } = useAuth();
//   const { web3auth } = useContext(Web3authContext);

//   const { getAuctionableProperties } = AirspaceRentalService();

//   console.log({ userUSDWalletBalance });

//   useEffect(() => {
//     (async () => {
//       try {
//         if (web3auth && web3auth?.status !== "connected") return;

//         setLoading(true);
//         const assetId =
//           airspaceList.length > 0
//             ? airspaceList[airspaceList.length - 1]?.id
//             : "";

//         const airspaces = await getAuctionableProperties(
//           user?.blockchainAddress,
//           "landToken",
//           10,
//           String(assetId)
//         );

//         if (airspaces.length < 10) {
//           setHasMore(false);
//         }

//         if (pageNumber === 1) {
//           dispatch(setAirspaceList(airspaces));
//         } else {
//           let updatedAirspaces = [...airspaceList, ...airspaces];
//           dispatch(setAirspaceList(updatedAirspaces));
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [pageNumber, isTriggerRefresh]);

//   const handleNextPage = () => {
//     if (!hasMore) return;
//     setPageNumber((prevPageNumber) => prevPageNumber + 1);
//   };

//   const handlePrevPage = () => {
//     if (pageNumber === 1) return;
//     setPageNumber((prevPageNumber) => prevPageNumber - 1);
//   };

//   const handleSelectItem = (item: PropertyData) => {
//     console.log({ item });
//     setSelectedItems((prevSelectedItems) => {
//       const isItemSelected = prevSelectedItems.find(
//         (selectedItem) => selectedItem.propertyId === item.propertyId
//       );

//       let updatedItems;
//       if (isItemSelected) {
//         updatedItems = prevSelectedItems.filter(
//           (selectedItem) => selectedItem.propertyId !== item.propertyId
//         );
//         setSelectedItemId(null); // Deselect the item
//       } else {
//         updatedItems = [
//           ...prevSelectedItems,
//           {
//             assetId: item.id,
//             propertyId: item.propertyId,
//             name: item.address,
//             minSalePrice: 0,
//             endDate: null,
//           },
//         ];
//         // @ts-ignore
//         setSelectedItemId(item?.propertyId); // Select the item
//       }

//       return updatedItems;
//     });
//   };

//   const handleUpdateItem = (
//     id: number,
//     minSalePrice: number,
//     endDate: Date | null
//   ) => {
//     setSelectedItems((prevSelectedItems) => {
//       const updatedItems = prevSelectedItems.map((selectedItem) =>
//         selectedItem.propertyId === id
//           ? { ...selectedItem, minSalePrice, endDate }
//           : selectedItem
//       );
//       console.log("Updated Items:", updatedItems);
//       return updatedItems;
//     });
//   };

//   const handleAddProperties = async () => {
//     const balance = parseFloat((userSolBalance / LAMPORTS_PER_SOL).toString());
//     // const balance = 0;

//     console.log({ balance });
//     if (balance === 0) {
//       return toast.error(
//         "You don't have sufficient Sol to perform this operation"
//       );
//     }

//     if (selectedItems.length === 0) {
//       return toast.info("You must select an Airspace to continue");
//     }

//     console.log("Selected Items:", selectedItems);
//     setIsProcessing(true);
//     // return;

//     try {
//       const postData = {
//         propertyId: selectedItems[0].propertyId,
//         listingType: "Auction",
//         isActive: true,
//         listingPrice: selectedItems[0].minSalePrice,
//         endDate: selectedItems[0].endDate,
//       };
//       console.log({ postData });

//       const response = await createAuction({ postData });
//       console.log({ response });
//       if (response && response.tx) {
//         const transaction1 = VersionedTransaction.deserialize(
//           new Uint8Array(Buffer.from(response.tx[0], "base64"))
//         );

//         const transaction2 = VersionedTransaction.deserialize(
//           new Uint8Array(Buffer.from(response.tx[1], "base64"))
//         );

//         const tx1 = await executeTransaction(transaction1, provider);
//         const tx2 = await executeTransaction(transaction2, provider);

//         if (tx1 && tx2) {
//           console.log({ tx1, tx2 });
//           console.log({ selectedItems });

//           const postData: AuctionSubmitI = {
//             signatures: [tx1, tx2],
//             assetId: selectedItems[0].assetId,
//           };

//           console.log({ postData });

//           const result = await submitAuction({ postData });

//           if (result && result.txid.length > 0) {
//             console.log({ result });
//             setTxHash(result.txid[0]);
//             dispatch(setIsTriggerRefresh(true));
//             setTransactionStatus(TransactionStatusEnum.SUCCESS);
//             setResponseStatus("SUCCESS");
//             setSelectedItems([]);
//             setSelectedItemId(null);
//           } else {
//             setTransactionStatus(TransactionStatusEnum.FAILED);
//             setResponseStatus("FAIL");
//           }
//         } else {
//           setTransactionStatus(TransactionStatusEnum.FAILED);
//           setResponseStatus("FAIL");
//         }
//       } else {
//         setTransactionStatus(TransactionStatusEnum.FAILED);
//         setResponseStatus("FAIL");
//       }
//     } catch (error) {
//       console.log({ error });
//       setResponseStatus("FAIL");
//     }
//   };

//   useEffect(() => {
//     setIsProcessing(false);
//   }, []);

//   return {
//     loading,
//     airspaceList,
//     pageNumber,
//     handlePrevPage,
//     handleNextPage,
//     hasMore,
//     handleSelectItem,
//     handleAddProperties,
//     handleUpdateItem,
//     txHash,
//     isProcessing,
//     setIsProcessing,
//     transactionStatus,
//     responseStatus,
//     selectedItemId,
//     selectedItems,
//   };
// };

// export default useAuction;

import { useContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import AirspaceRentalService from "@/services/AirspaceRentalService";
import { AuctionSubmitI, PropertyData } from "@/types";
import { Web3authContext } from "@/providers/web3authProvider";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setAirspaceList, setIsTriggerRefresh } from "@/redux/slices/userSlice";
import { LAMPORTS_PER_SOL, VersionedTransaction } from "@solana/web3.js";
import { executeTransaction } from "@/utils/rent/transactionExecutor";
import MarketplaceService from "@/services/MarketplaceService";
import { toast } from "react-toastify";

interface SelectedPropertyI {
  assetId: string;
  propertyId: number;
  name: string;
  minSalePrice: number;
  endDate: Date | null;
}

export enum TransactionStatusEnum {
  PENDING,
  SUCCESS,
  FAILED,
}

const useAuction = () => {
  const {
    airspaceList,
    isTriggerRefresh,
    userSolBalance,
    userUSDWalletBalance,
  } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [selectedItems, setSelectedItems] = useState<SelectedPropertyI[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(
    TransactionStatusEnum.PENDING
  );
  const [responseStatus, setResponseStatus] = useState<"SUCCESS" | "FAIL">(
    "FAIL"
  );
  const [txHash, setTxHash] = useState<string | null | undefined>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const { createAuction, submitAuction, getAuctions } = MarketplaceService();
  const { provider } = useContext(Web3authContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();
  const { web3auth } = useContext(Web3authContext);
  const { getAuctionableProperties } = AirspaceRentalService();

  const fetchAirspaceProperties = async () => {
    // try {
    if (web3auth && web3auth?.status !== "connected") return;

    setLoading(true);
    const assetId =
      airspaceList.length > 0 ? airspaceList[airspaceList.length - 1]?.id : "";

    const airspaces = await getAuctionableProperties(
      user?.blockchainAddress,
      "landToken",
      10,
      ""
      // String(assetId)
    );

    if (airspaces.length < 10) {
      setHasMore(false);
    }

    if (pageNumber === 1) {
      dispatch(setAirspaceList(airspaces));
    } else {
      let updatedAirspaces = [...airspaceList, ...airspaces];
      dispatch(setAirspaceList(updatedAirspaces));
    }
    // } catch (error) {
    //   console.error(error);
    // } finally {
    setLoading(false);
    // }
  };

  useEffect(() => {
    fetchAirspaceProperties();
  }, [pageNumber, isTriggerRefresh]);

  const handleNextPage = () => {
    if (!hasMore) return;
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleSelectItem = (item: PropertyData) => {
    console.log({ item });
    setSelectedItems((prevSelectedItems) => {
      const isItemSelected = prevSelectedItems.find(
        (selectedItem) => selectedItem.propertyId === item.propertyId
      );

      let updatedItems;
      if (isItemSelected) {
        updatedItems = prevSelectedItems.filter(
          (selectedItem) => selectedItem.propertyId !== item.propertyId
        );
        setSelectedItemId(null); // Deselect the item
      } else {
        updatedItems = [
          ...prevSelectedItems,
          {
            assetId: item.id,
            propertyId: item.propertyId,
            name: item.address,
            minSalePrice: 0,
            endDate: null,
          },
        ];
        // @ts-ignore
        setSelectedItemId(item?.propertyId); // Select the item
      }

      return updatedItems;
    });
  };

  const handleUpdateItem = (
    id: number,
    minSalePrice: number,
    endDate: Date | null
  ) => {
    setSelectedItems((prevSelectedItems) => {
      return prevSelectedItems.map((selectedItem) =>
        selectedItem.propertyId === id
          ? { ...selectedItem, minSalePrice, endDate }
          : selectedItem
      );
    });
  };

  const handleAddProperties = async () => {
    const balance = parseFloat((userSolBalance / LAMPORTS_PER_SOL).toString());

    if (balance === 0) {
      return toast.error(
        "You don't have sufficient Sol to perform this operation"
      );
    }

    if (selectedItems.length === 0) {
      return toast.info("You must select an Airspace to continue");
    }

    setIsProcessing(true);

    try {
      const postData = {
        propertyId: selectedItems[0].propertyId,
        listingType: "Auction",
        isActive: true,
        listingPrice: selectedItems[0].minSalePrice,
        endDate: selectedItems[0].endDate,
      };

      const response = await createAuction({ postData });
      if (response && response.tx) {
        const transaction1 = VersionedTransaction.deserialize(
          new Uint8Array(Buffer.from(response.tx[0], "base64"))
        );
        const transaction2 = VersionedTransaction.deserialize(
          new Uint8Array(Buffer.from(response.tx[1], "base64"))
        );

        const tx1 = await executeTransaction(transaction1, provider);
        const tx2 = await executeTransaction(transaction2, provider);

        if (tx1 && tx2) {
          const postData: AuctionSubmitI = {
            signatures: [tx1, tx2],
            assetId: selectedItems[0].assetId,
          };
          const result = await submitAuction({ postData });

          if (result && result.txid.length > 0) {
            setTxHash(result.txid[0]);
            dispatch(setIsTriggerRefresh(true));
            setTransactionStatus(TransactionStatusEnum.SUCCESS);
            setResponseStatus("SUCCESS");
            setSelectedItems([]);
            setSelectedItemId(null);
          } else {
            setTransactionStatus(TransactionStatusEnum.FAILED);
            setResponseStatus("FAIL");
          }
        } else {
          setTransactionStatus(TransactionStatusEnum.FAILED);
          setResponseStatus("FAIL");
        }
      } else {
        setTransactionStatus(TransactionStatusEnum.FAILED);
        setResponseStatus("FAIL");
      }
    } catch (error) {
      console.log({ error });
      setResponseStatus("FAIL");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    loading,
    airspaceList,
    handleNextPage,
    hasMore,
    handleSelectItem,
    handleAddProperties,
    handleUpdateItem,
    txHash,
    isProcessing,
    setIsProcessing,
    transactionStatus,
    responseStatus,
    selectedItemId,
    selectedItems,
  };
};

export default useAuction;
