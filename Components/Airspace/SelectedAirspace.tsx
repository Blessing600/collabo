import { LocationPointIcon } from "../Icons";
import LoadingButton from "../LoadingButton/LoadingButton";
import Button from "../Shared/Button";

export const SelectedAirspace = ({
  onClaim,
  placeName,
  onClick,
}: {
  onClaim: () => void;
  onClick: () => void;
  placeName: string;
}) => {
  return (
    <div className="p-4 w-[345px] flex flex-col items-center justify-center border border-blue-500 rounded-lg">
      <div className="w-[301px]">
        <div onClick={onClick} className="w-full text-left text-[#222222]">
          <div className="flex items-center">
            <div className="w-[10%] h-6 mr-3">
              <LocationPointIcon />
            </div>
            <div className="w-[90%] text-[14px]">{placeName}</div>
          </div>
        </div>
        <Button
          onClick={onClaim}
          label="Claim Air Rights"
          className="mt-2"
        />
      </div>
    </div>
  );
};
