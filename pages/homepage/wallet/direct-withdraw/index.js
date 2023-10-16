import Image from "next/image";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";

import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import mastercard from "../../../../public/images/mastercard-logo.png";
import visa from "../../../../public/images/visa-logo.png";
import Backdrop from "@/Components/Backdrop";
import { useState, useEffect } from "react";
import AddCardModal from "@/Components/Modals/AddCardModal";
import Spinner from "@/Components/Spinner";

const Wallet = (props) => {
    const { users } = props;

    const [user, setUser] = useState();
    const [token, setToken] = useState("");
    const [addCard, setAddCard] = useState(false);
    const [tokenBalance, setTokenBalance] = useState("");
    
    const router = useRouter();

    useEffect(() => {
        const fetchedEmail = localStorage.getItem("email");
        const fetchedToken = JSON.parse(localStorage.getItem("openlogin_store"));
        const singleUser = users.filter(user => user.email === fetchedEmail);

        // if(!fetchedEmail || fetchedToken.sessionId.length !== 64){
        if(singleUser.length < 1 || fetchedToken.sessionId.length !== 64){
            console.log("false")
            localStorage.removeItem("openlogin_store")
            router.push("/auth/join");
            return;
        };

        setToken(fetchedToken.sessionId);  
        setUser(singleUser[0]);
    }, []);

    useEffect(() => {
        if(user) {
            console.log("running wallet")
            const data =   {
                jsonrpc: "2.0",
                id: 1,
                method: "getTokenAccountsByOwner",
                params: [
                //   user.wallet,
                "F6nrevRwwSG8R3rfR1mi6dBTKy3YMtdUYXAnbgkx3nwR",
                // "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                  {
                    mint: "CpMah17kQEL2wqyMKt3mZBdTnZbkbfx4nqmQMFDP5vwp"
                  },
                  {
                    encoding: "jsonParsed"
                  }
                ]
              }
   
            fetch('https://api.testnet.solana.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(response => {
                if(!response.ok) {
                    return response.json()
                    .then(errorData => {
                        throw new Error(errorData.error);
                    });
                }

                return response.json()
            })
            .then(result => {
                setTokenBalance(result.result.value[0].account.data.parsed.info.tokenAmount.uiAmountString)
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [user]);
    
    const addCardHandler = () => {
        setAddCard(true);
    }

    const closeAddCardHandler = () => {
        setAddCard(false)
    }

    const returnToWallet = () => {
        router.push("/homepage/wallet")
    }

    if(!user || !token) {
        return <Spinner />
    } 

    return <div className="flex flex-row mx-auto">
            {addCard && createPortal(<Backdrop onClick={closeAddCardHandler} />, document.getElementById("backdrop-root"))}
            {addCard && createPortal(<AddCardModal onClose={closeAddCardHandler} />, document.getElementById("modal-root"))}
            <Sidebar />
            <div style={{width: "calc(100vw - 257px)", height: "100vh"}} className="overflow-y-auto">
                <Navbar name={user.name} />
                <div className="bg-bleach-green flex flex-col mt-5 mx-auto relative items-center rounded-lg p-7" style={{width: "395px", height: "169px", boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.13)"}}>
                    <div className="z-20 text-center">
                        <p className="text-light-brown">My Wallet</p>
                        {!tokenBalance && <p className="text-light-brown font-semibold mt-2">Loading...</p>}
                        {tokenBalance && <p className="text-light-brown font-semibold mt-2 text-2xl">USDC {tokenBalance}</p>}
                        {tokenBalance && <p className="text-light-brown font-semibold -mt-2 text-sml">US$ {tokenBalance}</p>}
                    </div>
                
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-4 right-6 z-10" width="146" height="121" viewBox="0 0 146 121" fill="none">
                        <path d="M95.5943 60.4999C95.5943 54.5876 100.376 49.7947 106.275 49.7947C112.174 49.7947 116.956 54.5876 116.956 60.4999C116.956 66.4122 112.174 71.2051 106.275 71.2051C100.376 71.2051 95.5943 66.4122 95.5943 60.4999Z" fill="#1A572E" fill-opacity="0.1"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M130.779 22.4894C126.096 11.4583 115.747 3.52846 103.432 2.22957L98.79 1.74002C75.3471 -0.732551 51.7018 -0.5695 28.295 2.22613L25.2194 2.59347C13.3367 4.01269 3.92162 13.3177 2.3389 25.2065C-0.779634 48.6317 -0.779634 72.3683 2.3389 95.7935C3.92162 107.682 13.3367 116.987 25.2194 118.407L28.295 118.774C51.7018 121.57 75.3471 121.733 98.79 119.26L103.432 118.77C115.747 117.472 126.096 109.542 130.779 98.5105C138.179 96.3022 143.827 89.8722 144.754 81.9273C146.415 67.691 146.415 53.309 144.754 39.0727C143.827 31.1278 138.179 24.6977 130.779 22.4894ZM97.6723 12.3864C75.0213 9.9974 52.1748 10.1549 29.5588 12.8561L26.4832 13.2235C19.4423 14.0644 13.8636 19.5779 12.9258 26.6224C9.93238 49.1078 9.93238 71.8922 12.9258 94.3776C13.8636 101.422 19.4423 106.936 26.4832 107.777L29.5588 108.144C52.1748 110.845 75.0213 111.003 97.6723 108.614L102.314 108.124C108.37 107.485 113.729 104.493 117.442 100.052C106.704 100.679 95.8219 100.399 85.2108 99.2103C76.1724 98.1978 68.8625 91.0643 67.7963 81.9273C66.1351 67.691 66.1351 53.309 67.7963 39.0727C68.8625 29.9357 76.1724 22.8022 85.2108 21.7897C95.8219 20.601 106.704 20.3205 117.442 20.9482C113.729 16.5068 108.37 13.5148 102.314 12.876L97.6723 12.3864ZM122.491 32.0577C122.495 32.0851 122.5 32.1125 122.504 32.1399L122.547 32.4174L123.961 32.1972C124.693 32.2698 125.424 32.347 126.153 32.4287C130.336 32.8972 133.666 36.2097 134.146 40.3163C135.71 53.7264 135.71 67.2736 134.146 80.6837C133.666 84.7903 130.336 88.1028 126.153 88.5713C125.424 88.653 124.693 88.7302 123.961 88.8028L122.547 88.5826L122.504 88.8601C122.5 88.8875 122.495 88.9149 122.491 88.9423C110.538 90.0261 98.2801 89.9025 86.3972 88.5713C82.2146 88.1028 78.884 84.7903 78.4048 80.6837C76.8399 67.2736 76.8399 53.7264 78.4048 40.3163C78.884 36.2097 82.2146 32.8972 86.3972 32.4287C98.2801 31.0975 110.538 30.9739 122.491 32.0577Z" fill="#1A572E" fill-opacity="0.1"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 z-10" width="137" height="103" viewBox="0 0 137 103" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M130.63 103H10C4.47717 103 0 98.5229 0 93V10.0757C13.4341 3.66759 29.0313 0 45.6673 0C96.1093 0 137.001 33.7183 137.001 75.3118C137.001 85.0882 134.742 94.4294 130.63 103Z" fill="#AECCB8"/>
                    </svg>
                </div>
                <div className="rounded mx-auto mt-8 mb-5 bg-white p-10" style={{width: "710px", height: "548px"}}>
                    <div className="flex flex-row items-center gap-1">
                        <button onClick={returnToWallet}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z" fill="#252530"/>
                            </svg>
                        </button>
                        <h3 className="font-medium text-xl">Withdraw</h3>
                    </div>
                    <div className="px-7"> 
                        <div className="relative mt-8 mx-auto">
                            <label htmlFor="amount" className="mt-12 text-dark-brown">Amount</label>
                            <p className="text-sm text-dark-brown">The platform only supports USDC at this time</p> 
                            <input className="rounded ps-4 pt-1 placeholder:font-medium focus:outline-blue-200" type="number" placeholder="0.00" id="amount"  name="amount" style={{width: "570px", height: "37px", border: "0.35px solid #0653EA"}} />
                            <p className="absolute text-light-brown top-12 right-4">Min USDC <span>20.00</span></p>
                            <p className="text-dark-brown">Transfer fees = 0.00</p>
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="total" className="text-dark-brown">Total</label>
                            <input className="rounded ps-4 pt-1 placeholder:font-medium focus:outline-blue-200" type="number" placeholder="0.00" id="total"  name="total" style={{width: "570px", height: "37px", border: "0.35px solid #0653EA"}} />
                            <p className="w-full text-center">1 USDC = 1 US$</p>
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="wallet" className="text-dark-brown">Enter your USDC wallet</label>
                            <input className="rounded ps-4 pt-1 placeholder:font-medium focus:outline-blue-200" type="text" placeholder="Add Your USDC wallet" id="wallet"  name="wallet" style={{width: "570px", height: "37px", border: "0.35px solid #0653EA"}} />
                        </div>
                        <div className="flex flex-row justify-center items-center mt-8 gap-5">
                            <button onClick={(e) => {
                            e.preventDefault();
                            router.push("/homepage/wallet/direct-withdraw/withdrawal-confirmed")
                        }} className="bg-dark-blue rounded-md text-white transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width: "210px", height: "42px"}}>Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default Wallet;


export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/proxy", {
        headers: {
            "Content-Type": "application/json",
            uri: "/users"
        }
    })

    if(!response.ok) {
        return {
            props: { 
                error: "oops! something went wrong. Kindly try again."
            }
        }
    }
    
    const data = await response.json();
   
    console.log(data)

    return {
        props: {
            users: JSON.parse(JSON.stringify(data))
        }
    }
}