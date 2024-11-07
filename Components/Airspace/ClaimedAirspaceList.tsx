import React from "react";
import { ArrowLeftIcon } from "../Icons";
import AirspacesList from "./AirSpaceList";
import AirSpaceEmptyList from "./AirSpaceEmptyList";
import { PropertyData } from "@/types";
import Button from "../Shared/Button";
interface Props {
  setShowAirspacePage: React.Dispatch<React.SetStateAction<boolean>>;
  airspaces: PropertyData[];
  setSelectedAirsspace: React.Dispatch<React.SetStateAction<PropertyData>>;
}
const MyMobileAirspacesPage = ({
  setShowAirspacePage,
  airspaces = [],
  setSelectedAirsspace,
}: Props) => {
  return (
    <div
      className=" w-full bg-white flex flex-col fixed top-0 left-0 z-40"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="">
        <div className="w-full p-4 shadow-md flex items-center">
          <div className="w-6 h-6" onClick={() => setShowAirspacePage(false)}>
            <ArrowLeftIcon />
          </div>
          <h1 className="text-2xl font-bold text-center flex-grow">
            My Air Rights
          </h1>
        </div>

        <div className="px-4 flex flex-col justify-center items-center w-full  mt-[1rem] bg-white">
          {}
          {airspaces.length === 0 ? (
            <AirSpaceEmptyList />
          ) : (
            <AirspacesList
              airspaces={airspaces}
              handleSelectedAirspace={(space) => setSelectedAirsspace(space)}
            />
          )}
          <Button
            onClick={() => setShowAirspacePage(false)}
            label="Claim Air Rights"
          />
        </div>
      </div>
    </div>
  );
};

export default MyMobileAirspacesPage;
