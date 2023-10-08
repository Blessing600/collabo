import { Fragment, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { SolanaWallet } from "@web3auth/solana-provider";

import { counterActions } from "@/store/store";
import User from "@/models/User";
import Backdrop from "@/Components/Backdrop";
import Spinner from "@/Components/Spinner";
import swal from "sweetalert";
import logo from "../../../public/images/logo.png";

const Signup = (props) => {
    const { users } = props;

    const [emailValid, setEmailValid] = useState(true);
    const [categorySect, setCategorySect] = useState(false);
    const [initial, setInitial] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const emailRef = useRef();

    useEffect(() => {
        const fetchedEmail = localStorage.getItem("email");
        const fetchedToken = JSON.parse(localStorage.getItem("openlogin_store"));

        if(fetchedToken) {
            const tokenLength = Object.keys(fetchedToken).length;
            console.log(tokenLength);
            if(tokenLength.length > 0 || fetchedEmail) {
                router.push("/homepage/dashboard");
                return;
            };
        };
    }, []);
    
    
    
    const router = useRouter();
    const dispatch = useDispatch();

    // const chainConfig = {
    //     chainNamespace: "solana",
    //     chainId: "0x3", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
    //     rpcTarget: "https://api.devnet.solana.com",
    //     displayName: "Solana Devnet",
    //     blockExplorer: "https://explorer.solana.com",
    //     ticker: "SOL",
    //     tickerName: "Solana",
    //   }

    //   For Live Environment
    
    const chainConfig = {
        chainNamespace: "solana",
        chainId: "0x1", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
        rpcTarget: "https://api.testnet.solana.com",
        displayName: "Solana Mainnet",
        blockExplorer: "https://explorer.solana.com",
        ticker: "SOL",
        tickerName: "Solana",
    };

    const web3auth = new Web3AuthNoModal({
        // For Production
        // clientId: "BJzzStRTLHjLmRYkzxs2sUVlina3gkhzF4K7I0a3WScwQ7maUDSruzHYWG4nM8OB5B0Jx5mBSzqFCuMlqdQ_ZoY",
        
        // For Development
        clientId: "BNJIzlT_kyic6LCnqAsHyBoaXy0WtCs7ZR3lu6ZTTzHIJGCDtCgDCFpSVMZjxL_Zu4rRsiJjjaGokDeqlGfxoo8", // Get your Client ID from the Web3Auth Dashboard
        web3AuthNetwork: "cyan", // Web3Auth Network
        chainConfig: chainConfig,
    });

    const privateKeyProvider = new SolanaPrivateKeyProvider({ config: { chainConfig } });

    const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider,
      });
    
    web3auth.configureAdapter(openloginAdapter);

    useEffect(() => {
        const init = async() => {
              await web3auth.init();
        }
        
        init();
    }, [initial]);

    const loginHandler = async(provider, e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const regex = /^\S+@\S+\.\S+$/;
        const emailIsValid = regex.test(email);
        
        if(!provider && !emailIsValid) {
            setEmailValid(false);
            return;
        };


        setIsLoading(true);
        
        let web3authProvider;

        if(!provider) {
            try{
                web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                    loginProvider: "email_passwordless",
                    extraLoginOptions: {
                      login_hint: email,
                    },
                });
            }
            catch(err) {
                localStorage.removeItem("openlogin_store");
                swal({
                    title: "oops!",
                    text: "Something went wrong. Kindly reload the page",
                  });
                return;
            }
        } else {
            try{
                web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                    loginProvider: provider,
                  });
            } catch(err) {
                localStorage.removeItem("openlogin_store");
                swal({
                    title: "oops!",
                    text: "Something went wrong. Kindly reload the page",
                  });
                return;
            }
        }

        console.log(web3authProvider);
        console.log(web3auth.provider);

        let userInformation;
        try{
            userInformation = await web3auth.getUserInfo();
        } catch(err) {
            swal({
                title: "oops!",
                text: "Couldn't get user info Kindly reload the page",
              });
            return;
        }
        

        const solanaWallet = new SolanaWallet(web3authProvider);

        let accounts;

        try{
            accounts = await solanaWallet.requestAccounts();
        } catch(err) {
            swal({
                title: "oops!",
                text: "Solana wallet wasn't created Kindly reload the page",
              });
            return;
        }
       

        console.log(accounts);
        const filteredUser = users.filter(user => user.email === userInformation.email);

        if(filteredUser.length < 1) {
            const token = localStorage.getItem("openlogin_store");
            dispatch(counterActions.web3({
                token: JSON.parse(token)
            }));
            localStorage.removeItem("openlogin_store");
            dispatch(counterActions.category({
                email: userInformation.email,
                wallet: accounts[0]
            }));

            setIsLoading(false);
            setCategorySect(true);
            return;
        }

        localStorage.setItem("email", userInformation.email);
        router.replace("/homepage/dashboard");
    }

    const formSubmitHandler = (path, e) => {
        e.preventDefault();

        dispatch(counterActions.category({
            category: path
        }));

        router.push(`/auth/join/${path}`);
    }


    return <Fragment>
        {isLoading && createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
        {isLoading && createPortal(<Spinner />, document.getElementById("backdrop-root"))}
        {!categorySect && <div className="bg-white rounded px-12 mx-auto justify-center items-center relative" style={{width: "680px", height: "90vh", maxHeight: "593px", marginTop: "5vh"}}>
            <button onClick={() => router.push("/")} className="flex flex-row items-center gap-2 absolute top-8 left-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <path d="M0.999999 4L4.33333 7M0.999999 4L4.33333 1M0.999999 4L13 4" stroke="#252530" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Back</p>
            </button>
            <form className="flex flex-col mx-auto pt-20" style={{width: "396px"}}>
                <Image src={logo} alt="Company's logo" width={164} height={58} className="my-4" />
                <p className=" text-dark-brown text-xl font-medium mt-12">Sign in/Sign Up</p>
                <div className="mt-2 relative">
                    <label className="text-sm font-normal" style={{color: "rgba(0, 0, 0, 0.50)"}} >E-mail Address<span className="text-red-600">*</span></label> <br />
                    <input type="email" ref={emailRef} onChange={() => setEmailValid(true)} placeholder="E-mail Address" className="bg-light-grey rounded-md focus:outline-blue-200 placeholder:text-light-brown placeholder:font-medium font-sans" style={{width: "396px",  height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)", paddingLeft: "14px",}} />
                    {!emailValid && <p className="absolute top-1 right-0 text-sm text-red-600">email is invalid</p>}
                </div>
                <button onClick={loginHandler.bind(null, "")} className="bg-dark-blue text-white rounded-md mt-4 transition-all duration-500 ease-in-out hover:bg-blue-600" style={{width:"396px", height: "46px",}}>Continue with Email</button>
                <div className="relative text-center my-8"> 
                    <div style={{width:"396px", height: "0.4px", background: "#B1B1B1",}}></div>
                    <p className="absolute -top-2" style={{width:"18px", fontSize: "10px", padding: "auto", height: "15px", color: "#B1B1B1", left: "47.5%", background: "white"}}>or</p>
                </div>
                {/* <p className=" text-dark-brown text-xl font-medium">Sign up using other methods</p> */}
                <div className="flex flex-row w-full justify-center gap-5">
                    <button onClick={loginHandler.bind(null, "google")} className="flex flex-row items-center justify-center rounded-md transition-all duration-500 ease-in-out hover:bg-bleach-blue" style={{width: "188px", height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)"}}>
                        <Image src="/images/google-logo.png" alt="Google logo" width={33} height={33} />
                        <p>Google</p>
                    </button>
                    <button onClick={loginHandler.bind(null, "facebook")} className="flex flex-row items-center justify-center rounded-md transition-all duration-500 ease-in-out hover:bg-bleach-blue" style={{width: "188px", height: "43px", border: "0.5px solid rgba(0, 0, 0, 0.50)"}}>
                        <Image src="/images/Facebook-logo.png" alt="Facebook logo" width={33} height={33} />
                        <p>Facebook</p>
                    </button>
                </div>
            </form>
        </div>}

        {categorySect && <div className="bg-white rounded px-12 mx-auto flex flex-col justify-center items-center relative" style={{width: "680px", height: "475px", marginTop: "10vh"}}>
            <button onClick={() => router.push("/")} className="flex flex-row items-center gap-2 absolute top-8 left-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <path d="M0.999999 4L4.33333 7M0.999999 4L4.33333 1M0.999999 4L13 4" stroke="#252530" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Back</p>
            </button>
            <Image src="/images/logo.png" alt="Company's logo" width={164} height={58} className="mt-4 my-12" />
            <h2 className="font-bold text-2xl">Welcome to SkyTrades</h2>
            <p className="text-light-brown text-center text-sml">
                Please choose an option that best reflects the account's 
                intended purpose to enhance your personalized experience.
            </p>
            <div className="mt-11 flex flex-row gap-5">
                <button onClick={formSubmitHandler.bind(null, "individual")} className="bg-dark-blue text-white text-sml transition-all duration-500 ease-in-out hover:bg-blue-600 font-medium rounded-md" style={{width: "192px", height: "41px", border: "0.35px solid #0653EA"}}>
                    Individual
                </button>
                <button onClick={formSubmitHandler.bind(null, "corporate")} className="bg-dark-blue text-white text-sml transition-all duration-500 ease-in-out hover:bg-blue-600 font-medium rounded-md" style={{width: "192px", height: "41px", border: "0.35px solid #0653EA"}}>
                    Corporate Entity
                </button>
            </div>
            <div className="absolute bottom-2 flex flex-row justify-between w-full px-5">
                <div>
                    <p className="">&copy; Skytrades 2023</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M12.6 0H1.4C0.63 0 0 0.61875 0 1.375V9.625C0 10.3813 0.63 11 1.4 11H12.6C13.37 11 14 10.3813 14 9.625V1.375C14 0.61875 13.37 0 12.6 0ZM12.32 2.92188L7.742 5.73375C7.287 6.01562 6.713 6.01562 6.258 5.73375L1.68 2.92188C1.505 2.81188 1.4 2.62625 1.4 2.42688C1.4 1.96625 1.911 1.69125 2.31 1.93187L7 4.8125L11.69 1.93187C12.089 1.69125 12.6 1.96625 12.6 2.42688C12.6 2.62625 12.495 2.81188 12.32 2.92188Z" fill="black" fillOpacity="0.5"/>
                    </svg>
                    <p>help@skytrades.io</p>
                </div>
            </div>
        </div>}
    </Fragment>
}

export default Signup;

export async function getStaticProps () {
    const users = await User.findAll();

    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        },
        revalidate : 60 * 30
    }
}