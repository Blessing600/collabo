import React, { useContext, useEffect, useState } from "react";
import { HistoryArrowIcon } from "../../Icons";
import { Web3authContext } from "@/providers/web3authProvider";
import ReferralCodeService from "@/services/ReferralCodeService";
import { useMobile } from "@/hooks/useMobile";
import { Pagination, Table } from "antd";
interface ReferralListI {
  description: string;
  date: string;
  amount: string;
  balance: number;
}

const ReferralHistoryTable: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [referralList, setReferralList] = useState<ReferralListI[]>([]);

  const { web3auth } = useContext(Web3authContext);
  const { getReferralHistory } = ReferralCodeService();

  const rowsPerPage = 10;
  const totalPages = Math.ceil(Number(referralCount) / rowsPerPage);

  useEffect(() => {
    (async () => {
      try {
        if (web3auth && web3auth?.status !== "connected") return;
        setLoading(true);

        const respData = await getReferralHistory(rowsPerPage, pageNumber);

        setReferralList(respData.histories);
        setReferralCount(respData.stats._count.point);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [web3auth?.status, pageNumber]);

  const handleNextPage = () => {
    if (referralList?.length < 9) return;
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePrevPage = (page: number) => {
    setPageNumber(page);
  };
  const { isMobile } = useMobile();
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: <p className="text-right">Amount</p>,
      dataIndex: "amount",
      key: "amount",
      render: (amount: string) => (
        <p
          className={`text-right ${amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}
        >
          {amount}
        </p>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: <p className="text-right">Balance</p>,
      dataIndex: "balance",
      key: "balance",
      render: (balance: string) => <p className="text-right">{balance}</p>,
    },
  ];
  const customItemRender = (current, type, originalElement) => {
    if (type === "next") {
      return (
        <button className="flex items-center gap-4 text-gray-700  ">
          next
          <HistoryArrowIcon />
        </button>
      );
    }
    if (type === "page") {
      return (
        <button
          className={`${
            current === originalElement.props.children
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-full px-4 py-1`}
        >
          {originalElement.props.children}
        </button>
      );
    }
    return originalElement;
  };
  return (
    <div
      className={`${isMobile ? "history-table-scrollbar" : ""}  w-[100%] h-full bg-white `}
    >
      <Table
        columns={columns}
        dataSource={referralList}
        pagination={{
          position: ["bottomCenter"],
          itemRender: customItemRender,
        }}
      />
    </div>
  );
};

export default ReferralHistoryTable;
