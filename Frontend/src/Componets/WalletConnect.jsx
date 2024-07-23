import React from 'react'
import Web3 from "web3";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Ellipsis } from 'lucide-react';


const WalletConnect = () => {
    const [user,setUser] = useState(null);



    useEffect(() => {
      async function enableEthereum() {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            const accounts = await window.ethereum.enable();
            setUser(accounts[0]); 
            console.log(accounts[0]);
          } catch (error) {
            console.log(error);
          }
        } else {
          alert("Install Metamask");
        }
      }
    
      enableEthereum();
    }, []); 
    
    useEffect(() => {
     
      async function signInWithWalletAddress() {
        if (!user) return; 
    
        try {
          console.log(user);
          const response = await axios.post(`http://127.0.0.1:8000/signinwithwalletaddress?walletaddress=${user}`);
          console.log(response.data.message);
          if (response.data.message === "user does not exist") {
            console.log("user does not exist");
            window.location.href = `/signup/`+user;
            
          } else {
            console.log("user exist");
            window.location.href = "/home/"+user;
          }
        } catch (error) {
          console.error("Error signing in with wallet address:", error);
        }
      }
    
      signInWithWalletAddress();
    }, [user]); 




  return (

    

    <>

{user === null && (



<div className="flex items-center justify-center h-screen">
  <div className="text-4xl font-semibold text-gray-800">
    Connecting to wallet ...
  </div>
</div>
  


  

 
  

        
      )}

  



    
    
    
    
    </>
  
  )
}

export default WalletConnect