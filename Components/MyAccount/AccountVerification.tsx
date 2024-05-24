import { FC } from 'react';
import { ShieldIcon } from '../Icons';
import React from 'react';

interface AccountVerificationProps {
    KYCStatusId: number;
    isLoading: boolean;
    onVerifyMyAccount: () => void;
}

const AccountVerification = ({ KYCStatusId, isLoading, onVerifyMyAccount, }: AccountVerificationProps) => {
    return (
        <div className="flex flex-col py-[17px] px-[25px] rounded-[30px] gap-[15px] bg-white" style={{ boxShadow: '0px 12px 34px -10px #3A4DE926' }}>
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-[#222222]">Account verification</h2>
            {KYCStatusId !== 0 && <div className="flex justify-center items-center bg-[#1FD387] rounded-[50%] w-[42px] h-[42px]">
                <div className="w-[14px] h-[17.73px]"><ShieldIcon /></div>
            </div>}
        </div>
        <p className="font-normal text-base text-[#87878D] pr-[42px]">{KYCStatusId !== 0 ? 'Thank you, your account is successfully verified. We verify the identity of our customers to assess potential risks, prevent fraud, and comply with legal and regulatory requirements. Note that we store your data securely with advanced encryption and strict authentication measures to ensure utmost privacy and protection.' : 'Your account is not verified. We verify the identity of our customers to assess potential risks, prevent fraud, and comply with legal and regulatory requirements. Note that we store your data securely with advanced encryption and strict authentication measures to ensure utmost privacy and protection.'}</p>
        {!(KYCStatusId !== 0) &&!isLoading && <p className="font-medium text-base text-[#0653EA] text-right flex-1 cursor-pointer" onClick={onVerifyMyAccount}>Verify my account</p>}
    </div>
    );  
};

export default AccountVerification;
