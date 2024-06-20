"use client";

import { useAppSelector } from "@/redux/store";
import { AuctionPropertyI } from "@/types";
import { IoClose } from "react-icons/io5";
import AuctionItem from "./AuctionItem";
import Button from "../Shared/Button";

interface CreateAuctionModalProps {
  onClose: any;
  data: AuctionPropertyI[];
  mobile?: boolean;
}

const CreateAuctionModal: React.FC<CreateAuctionModalProps> = ({
  onClose,
  data,
  mobile,
}) => {
  const {} = useAppSelector((state: any) => {
    const {} = state.userReducer;
    return {};
  });

  if (mobile) {
    return (
      <div className="fixed bottom-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-end">
        <div className="relative w-full md:w-[689px] h-[685px] bg-white rounded-t-[30px] p-8">
          <div
            onClick={onClose}
            className="absolute right-[1rem] top-[1rem] cursor-pointer"
          >
            <IoClose className="w-4 h-4" />
          </div>

          <div className="text-center">Create Auction</div>
          <div>Select the properties you want to auction</div>

          <div className="flex flex-col gap-3 overflow-y-auto h-[450px] thin-scrollbar">
            {data &&
              data.map((item, index) => (
                <AuctionItem data={item} key={index} />
              ))}
          </div>

          <div className="flex justify-between gap-4">
            <Button secondary label="Cancel" onClick={onClose} />
            <Button label="Add Properties to Auction" onClick={() => {}} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative flex flex-col gap-8 dark:text-darkText w-full md:w-[689px] h-[685px] bg-white rounded-[30px] p-8">
        <div
          onClick={onClose}
          className="absolute right-[1rem] top-[1rem] cursor-pointer"
        >
          <IoClose className="w-4 h-4" />
        </div>

        <div className="text-center">Create Auction</div>
        <div>Select the properties you want to auction</div>

        <div className="flex flex-col gap-3 overflow-y-auto h-[450px] thin-scrollbar">
          {data &&
            data.map((item, index) => <AuctionItem data={item} key={index} />)}
        </div>

        <div className="flex justify-between gap-4">
          <Button secondary label="Cancel" onClick={onClose} />
          <Button label="Add Properties to Auction" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CreateAuctionModal;
