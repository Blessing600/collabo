import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { Web3authContext } from "@/providers/web3authProvider";
import useAuth from "@/hooks/useAuth";

const useAutoLogout = () => {
  const router = useRouter();
  const { web3auth } = useContext(Web3authContext);
  const { user } = useAuth();
  const publicAccessRoutes=['/homepage/rent','/homepage/airspace2']

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push("/auth/join");
  };

  useEffect(() => {
    const checkSessionStorageUser = JSON.parse(
      sessionStorage.getItem("persist:root")
    );
    if (checkSessionStorageUser) {
      logout();
    }
  }, [web3auth?.status]);

  useEffect(() => {
    console.log("user", user);
    console.log("web3auth status", web3auth?.status);
    console.log("web3auth connected", web3auth?.connected);
    console.log("router", router);

    const loadingStates = ["connecting", "not_ready"];
    const nonLoadingStates = ["disconnected", "errored"];

    if (!web3auth) return;

    // if (loadingStates.includes(web3auth.status)) return;
    // if (nonLoadingStates.includes(web3auth.status)) {
    //   logout();
    //   return;
    // }

    if (web3auth?.status === "ready") {
      const fetchedToken = JSON.parse(localStorage.getItem('openlogin_store'));
      console.log({fetchedToken})
      let userBlockchainAddress=user?.blockchainAddress
      if (!fetchedToken?.sessionId) {
        console.log(router.pathname,userBlockchainAddress)
       
        if(publicAccessRoutes.includes(router.pathname) && userBlockchainAddress==undefined){
          console.log('entered unchecked phase',user.blockchainAddress)
          return
        }else{
          console.log('entered redirection phase')
          router.push("/auth/join");
        }
        
      } 
    }

  }, [web3auth?.status, user,router.pathname]); //included router.pathname in the dependency array so that it checks for autologout on every page..  

  return null;
};

export default useAutoLogout;
