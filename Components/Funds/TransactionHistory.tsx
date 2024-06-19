import React, { useState, useEffect } from 'react';

import { MagnifyingGlassIcon,RefreshIcon } from '../../Components/Icons';
import { useMobile } from '@/hooks/useMobile';
import {TransactionHistoryProps } from '../../types';
import { SolanaWallet } from '@web3auth/solana-provider';
import { Connection, PublicKey, SignaturesForAddressOptions, TransactionSignature } from '@solana/web3.js';
import moment from 'moment';
import axios, { Axios } from 'axios';

const TransactionHistory = ({  user,provider,setIsLoading }:TransactionHistoryProps) => {
  enum PAGE {
    reset,
    before,
    after,
    one,
    two,
    three,
    four,
    five
  }
  const limit=4
  const pageLimit=8
    const { isMobile } = useMobile();
    const [transactionHistory, setTransactionHistory] = useState<Array<any>>([]);
    let _signatureList:string[];
    const [signatureList, setSignatureList] = useState<Array<any>>([]);
    let firstTransactionHistorySignature:string|null=null
    let lastTransactionHistorySignature:string|null=null
    const [_lastTransactionHistorySignature,setLastTransactionHistorySignature]=useState<string>()
    const [_firstTransactionHistorySignature,setfirstTransactionHistorySignature]=useState<string>()
    



      useEffect(() => {
        console.log('here effect only',transactionHistory?.length)
        console.log(user,provider)
        if (user && provider && transactionHistory?.length<=0) {
          console.log(user,provider)
          //console.log('here effect condition')
          getTransactions(PAGE.reset)
        }
      },[user,provider]);

      console.log(signatureList,firstTransactionHistorySignature,lastTransactionHistorySignature)

      

      const getPrevTransactions=async(page:PAGE)=>{
        try {
          setIsLoading(true)
          let TxOptions:SignaturesForAddressOptions;
          console.log(signatureList)
          if(transactionHistory?.length>0){
            console.log(transactionHistory.length,transactionHistory)
            firstTransactionHistorySignature=signatureList[0]
           lastTransactionHistorySignature=signatureList[signatureList.length-1]      
          }else{
            console.log('here',lastTransactionHistorySignature)
          }
          
          console.log(firstTransactionHistorySignature,lastTransactionHistorySignature)
          
          if(page==PAGE.reset){
              TxOptions={limit}
            
          }else if(page==PAGE.before){            
            TxOptions={
              limit,
              before:lastTransactionHistorySignature as string
            }
            console.log(lastTransactionHistorySignature,TxOptions)
          }else if(page==PAGE.after){
            if(firstTransactionHistorySignature && transactionHistory.length>0){
              console.log(firstTransactionHistorySignature)
              TxOptions={
                before:firstTransactionHistorySignature,
                until:lastTransactionHistorySignature as string
              }  
            }else{
              console.log(lastTransactionHistorySignature)
              TxOptions={limit,
                until:lastTransactionHistorySignature as string

              }
              
            }
            console.log(firstTransactionHistorySignature,lastTransactionHistorySignature,_lastTransactionHistorySignature,TxOptions)
            
          }else{
            TxOptions={limit,
             

            }
            console.log(firstTransactionHistorySignature,lastTransactionHistorySignature,TxOptions)
            
          }


  
        const solanaWallet = new SolanaWallet(provider);
        const accounts = await solanaWallet.requestAccounts();        
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        let transactionList = await connection.getSignaturesForAddress(new PublicKey(`${accounts[0]}`),TxOptions)
          console.log(transactionList) 

       /* if(page==PAGE.after){
        transactionList=transactionList.slice(-limit)
       }  */ 
       console.log(transactionList)      
       _signatureList = transactionList.map(transaction=>transaction.signature);
        console.log(_signatureList)        
        let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[]);
        console.log(transactionDetails)
         setTransactionHistory(transactionDetails )
         setSignatureList(_signatureList)
          
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
        finally{
          setIsLoading(false)
        }
      
      } 

      const getNextTransactions=async(page:PAGE)=>{
        try {
          setIsLoading(true)
          let TxOptions:SignaturesForAddressOptions;
          console.log(signatureList)
          if(transactionHistory?.length>0){
            console.log(transactionHistory.length,transactionHistory)
            firstTransactionHistorySignature=signatureList[0]
           lastTransactionHistorySignature=signatureList[signatureList.length-1]      
          }else{
            console.log('here',lastTransactionHistorySignature)
          }
          
          console.log(firstTransactionHistorySignature,lastTransactionHistorySignature)
          
          if(page==PAGE.reset){
              TxOptions={limit}
            
          }else if(page==PAGE.before){            
            TxOptions={
              limit,
              before:lastTransactionHistorySignature as string
            }
            console.log(lastTransactionHistorySignature,TxOptions)
          }else if(page==PAGE.after){
            if(firstTransactionHistorySignature && transactionHistory.length>0){
              console.log(firstTransactionHistorySignature)
              TxOptions={
                before:firstTransactionHistorySignature,
                until:lastTransactionHistorySignature as string
              }  
            }else{
              console.log(lastTransactionHistorySignature)
              TxOptions={limit,
                until:lastTransactionHistorySignature as string

              }
              
            }
            console.log(firstTransactionHistorySignature,lastTransactionHistorySignature,_lastTransactionHistorySignature,TxOptions)
            
          }else{
            TxOptions={limit,
             

            }
            console.log(firstTransactionHistorySignature,lastTransactionHistorySignature,TxOptions)
            
          }


  
        const solanaWallet = new SolanaWallet(provider);
        const accounts = await solanaWallet.requestAccounts();        
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        let transactionList = await connection.getSignaturesForAddress(new PublicKey(`${accounts[0]}`),TxOptions)
          console.log(transactionList) 

       /* if(page==PAGE.after){
        transactionList=transactionList.slice(-limit)
       }  */ 
       console.log(transactionList)      
       _signatureList = transactionList.map(transaction=>transaction.signature);
        console.log(_signatureList)        
        let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[]);
        console.log(transactionDetails)
         setTransactionHistory(transactionDetails )
         setSignatureList(_signatureList)
          
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
        finally{
          setIsLoading(false)
        }
      
      } 
      
      




       const getTransactions=async(page:PAGE)=>{
        try {
          setIsLoading(true)
          let TxOptions:SignaturesForAddressOptions;
          console.log(signatureList)
          if(transactionHistory?.length>0){
            console.log(transactionHistory.length,transactionHistory)
            firstTransactionHistorySignature=signatureList[0]
           lastTransactionHistorySignature=signatureList[signatureList.length-1]      
          }else{
            console.log('here',lastTransactionHistorySignature)
          }
          
          console.log(firstTransactionHistorySignature,lastTransactionHistorySignature)
          
          if(page==PAGE.reset){
              TxOptions={limit}
            
          }else if(page==PAGE.before){            
            TxOptions={
              limit,
              before:lastTransactionHistorySignature as string
            }
            console.log(lastTransactionHistorySignature,TxOptions)
          }else if(page==PAGE.after){
            if(firstTransactionHistorySignature && transactionHistory.length>0){
              console.log(firstTransactionHistorySignature)
              TxOptions={
                
                until:firstTransactionHistorySignature as string
              }  
            }else{
              console.log(lastTransactionHistorySignature)
              TxOptions={limit,
                until:lastTransactionHistorySignature as string

              }
              
            }
            console.log(firstTransactionHistorySignature,lastTransactionHistorySignature,_lastTransactionHistorySignature,TxOptions)
            
          }else{
            TxOptions={limit,
             

            }
            console.log(firstTransactionHistorySignature,lastTransactionHistorySignature,TxOptions)
            
          }


  
        const solanaWallet = new SolanaWallet(provider);
        const accounts = await solanaWallet.requestAccounts();        
        const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
        let transactionList = await connection.getSignaturesForAddress(new PublicKey(`${accounts[0]}`),TxOptions)
          console.log(transactionList) 

       /* if(page==PAGE.after){
        transactionList=transactionList.slice(-limit)
       }  */ 
       console.log(transactionList)      
       _signatureList = transactionList.map(transaction=>transaction.signature);
        console.log(_signatureList)        
        let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[]);
        console.log(transactionDetails)
         setTransactionHistory(transactionDetails )
         setSignatureList(_signatureList)
          
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
        finally{
          setIsLoading(false)
        }
      
      } 

       /*  const getTransactions=async(page:PAGE)=>{
          try {
            setIsLoading(true)
            let TxOptions:SignaturesForAddressOptions;
            console.log(signatureList)
      
            
            console.log(firstTransactionHistorySignature,lastTransactionHistorySignature)
            
            if(page==PAGE.reset){
                TxOptions={limit}
              
            }else if(page==PAGE.before){            
              TxOptions={
                limit,
                before:_lastTransactionHistorySignature as string
              }
              console.log(lastTransactionHistorySignature,TxOptions)
            }else if(page==PAGE.after){
              TxOptions={
                limit,
                before:_firstTransactionHistorySignature,
                until:_lastTransactionHistorySignature
              }
              
              console.log(firstTransactionHistorySignature,lastTransactionHistorySignature,_lastTransactionHistorySignature,TxOptions)
              
            }else{
              TxOptions={limit
              }
              console.log(firstTransactionHistorySignature,lastTransactionHistorySignature,TxOptions)
              
            }
  
  
    
          const solanaWallet = new SolanaWallet(provider);
          const accounts = await solanaWallet.requestAccounts();        
          const connection=new Connection(process.env.NEXT_PUBLIC_RPC_TARGET as string) 
          let transactionList = await connection.getSignaturesForAddress(new PublicKey(`${accounts[0]}`),TxOptions)
            console.log(transactionList) 
  
         if(page==PAGE.after){
          transactionList=transactionList.slice(-limit)
         }  
         console.log(transactionList)      
         _signatureList = transactionList.map(transaction=>transaction.signature);
          console.log(_signatureList)        
          let transactionDetails = await connection.getParsedTransactions(_signatureList as TransactionSignature[]);
          console.log(transactionDetails)
           setTransactionHistory(transactionDetails )
           setSignatureList(_signatureList)
           console.log(_signatureList.at(-pageLimit))
            setfirstTransactionHistorySignature(_signatureList.at(-pageLimit))
            setLastTransactionHistorySignature(_signatureList.at(-1))
            
        
           
            
          } catch (error) {
            console.log(error)
            setIsLoading(false)
          }
          finally{
            setIsLoading(false)
          }
        
        } */
      const handleNextTxPage=async()=>{
        if(transactionHistory.length==0){
          return
        }
        await getTransactions(PAGE.before)
        
      }

      const handlePrevTxPage=async()=>{
       
        await getTransactions(PAGE.after)
        
      }
  
      return (
        <div className="flex flex-col  gap-5 flex-1 min-w-[89%] sm:min-w-[600px]">
          <div className="flex sm:flex-col md:flex-row  justify-start sm:justify-between items-center">
            <p className="flex font-medium text-xl pt-[14px] pb-[14px] sm:p-0 text-[#222222] w-[89%] ">
              Transaction History
            </p>
            <div
              className="relative px-[22px] py-[16px] bg-white w-[89%] sm:w-[272px] rounded-lg"
              style={{ border: "1px solid #87878D" }}
            >
              <input
                type="text"
                name="searchTransactions"
                id="searchTransactions"
                placeholder="Search Transactions"
                className="outline-none w-full pr-[20px]"
              />
              <div className="w-[17px] cursor-pointer h-[17px] absolute top-1/2 -translate-y-1/2 right-[22px]" 
              
              >
                <MagnifyingGlassIcon />
              </div>
              
            </div>
            <div className='sm:w-[1px] md:w-[5%] cursor-pointer  bg-[#0653EA] text-center font-medium ml-5 p-1 rounded-md'
            onClick={()=>{getTransactions(PAGE.reset)}}
            >
            <RefreshIcon />
            </div>
          </div>
          <div
          className={`flex justify-center overflow-y-auto fund-table-scrollbar h-auto 
          sm:h-[80%] fund-table-scrollbar`}
          style={{ direction: `${isMobile ? "rtl" : "ltr"}` }}
          >
            <div style={{direction: "ltr"}} className="w-[89%] sm:w-[100%] " >
              <div className="overflow-x-auto fund-table-scrollbar">
    
              <table className="w-[100%]" >
                <thead className="sticky top-0 bg-white sm:bg-[#F6FAFF] opacity-100 text-[#7D90B8] uppercase text-sm font-bold tracking-[0.5px]">
                  <tr className="w-full">
                  <th className="text-start py-5 px-5">Date</th>
                  <th className="text-start py-5 px-5">Transaction Id</th>
                  <th className="text-start py-5 px-5">type</th>
                  <th className="text-start py-5 px-5">amount</th>
                  <th className="py-5 px-5 text-start">status</th>
                  </tr>
                </thead>
                {transactionHistory?.map((item,idx)=>{
                  let difference=item?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount - item?.meta?.preTokenBalances[0]?.uiTokenAmount?.uiAmount
                  console.log(difference)
                  let type=difference>0?'Deposit':'Withdraw';
                  if(difference.toString()=='NaN'){
                    return null;
                  }
                  return(<tr>
                    <td className='py-6 text-[#222222] px-5 w-2/12'>{moment.unix(item?.blockTime).format("YYYY-MM-DD HH:mm:ss")}</td>
                    <td className='py- text-[#222222] text-clip px-5 w-2/12'>{signatureList[idx].substring(0,25)}</td>
                    <td className='py-6 text-[#222222] px-5 w-2/12'>{type}</td>
                    <td className='py-6 text-[#222222] px-5 w-2/12'> {difference}</td>
                    <td className='py-6 text-[#222222]  px-5 w-2/12'>Finalized</td>
                  </tr>)
                })}
              <tbody> 
            </tbody>
          </table>
          </div>
    
          <div className="flex items-center justify-end">
          {transactionHistory.length==0 && <div className="mx-auto flex gap-[11.71px]">
          <div
                  className={` text-[#87878D] text-base font-normal`}
                  
                >
                  NO transactions found.
                </div>
            
            </div>  }
            <div
              className={` text-[#0653EA] text-base font-normal mx-5`}
             onClick={handlePrevTxPage}
            >
              prev
            </div>
           
            
            {(
            <div
              className={`text-[#0653EA] cursor-pointer text-base font-normal mx-1`}
              onClick={handleNextTxPage}
            >
              Next
            </div>
          )}
          </div>
          </div>
          </div>
    
        </div>
      );
    };
    export default TransactionHistory;

              /* let data = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getSignaturesForAddress",
            "params": [
              `${accounts[0]}`,
              TxOptions
            ]
          });
          console.log(data)
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://solana-devnet.rpc.extrnode.com/dffab5d1-c8df-49af-9f79-20e35ed3504c',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          let _transactionList = await axios.request(config) */
              //console.log(_transactionList?.data?.result)
             /*  if(!_transactionList.data.result){
                throw Error("try again") 
              } */
              //let transactionList=_transactionList?.data?.result
      /*  if(transactionList.length==0 && currentPage>1){
        transactionList =await connection.getSignaturesForAddress(new PublicKey(`${accounts[0]}`),{limit})
        setCurrentPage(0)
       }  */