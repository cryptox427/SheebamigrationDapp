/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Web3 from "web3";
import {
  claimDividends,
  getCurrentWalletConnected,
  pullAllowance,
  approveCustomTokenAmount,
  migrateTokens,
} from "../Utils/walletInteract";
import MCFabi from "../ABI/mcfabi.json";
import upperCables from "../Images/top cable double.png";
import midCable from "../Images/mid cable double.png";
import lowCable from "../Images/mid cable smol.png";
import { Spinner } from "../components/Spinner/Spinner";
const web3 = new Web3("https://bsc-dataseed1.ninicoin.io/");
const contractAddress = "0x6E1f76017024BaF9dc52a796dC4e5Ae3110005c2";
const migrationContractAddress = "0x74A6b8D20c55aC1564D42C596041Fb90c5f780ee";

const ethereum = window.ethereum;
if (ethereum) {
  ethereum.on("accountsChanged", function (accounts) {
    console.log(accounts[0]);
  });
}

export const Stats = () => {
  const [allowance, setAllowance] = useState("");
  const [isMounted, setIsMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const mcfHandler = new web3.eth.Contract(MCFabi, contractAddress);
  const [approveToken, setApproveToken] = useState({
    isApproved: false,
    buttonText: "Approve FACTORY",
  });
  const [claimableBalance, setClaimable] = useState("");
  const [wallet, setWallet] = useState("");
  const { isApproved, buttonText } = approveToken;
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setApproveToken({
            isApproved: false,
            buttonText: "Approve FACTORY",
          });
          setWallet(accounts[0]);
          pullBalance(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  }
  const handleMigrateButtonClick = async () => {
    //setIsLoading(true);
    try {
      await migrateTokens(claimableBalance);
      setIsMounted(false);
    } catch (error) {
      console.log(error);
      setIsMounted(true);
    }

    setIsLoading(false);
  };
  const handleApproveTokenClick = async () => {
    setIsLoading(true);
    if (isApproved) {
      try {
        await migrateTokens(claimableBalance);
        setIsMounted(false);
        pullBalance(wallet);
      } catch (error) {
        console.log(error); // User denied ticket
      }
    } else {
      try {
        //console.log(wallet);
        const value = await pullAllowance(wallet, migrationContractAddress);
        if (claimableBalance > 0) {
          if (value < 1) {
            approveCustomTokenAmount(claimableBalance);
          } else {
            setApproveToken({
              isApproved: true,
              buttonText: "MIGRATE",
            });
          }
        } else {
          console.log("no tokens");
        }
      } catch (error) {
        console.log(error); // User denied transaction signature
      }
    }
    setIsLoading(false);
  };
  async function pullBalance(userAddress) {
    let userBalance = await mcfHandler.methods.balanceOf(userAddress).call();
    console.log(`Hello ${userBalance}`);
    setClaimable(userBalance);
  }

  useEffect(() => {
    async function magic() {
      const { address } = await getCurrentWalletConnected();

      setWallet(address);
      addWalletListener();
      try {
        pullBalance(address);
      } catch {}

      if (wallet.length > 0) {
        pullBalance(address);
        await pullAllowance(wallet, migrationContractAddress);
        console.log(claimDividends);
      }
      setIsLoading(false);
    }
    magic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(wallet);
  return (
    <div className="flex flex-col items-center mb-10 mx-auto w-11/12">
      <img src={upperCables} alt="" />
      <div className="totalDivs w-full md:w-10/12 lg:w-1/2">
        <span className="NumberColor">IGNITE MIGRATION TOOL</span>
      </div>
      <img src={midCable} alt="" />
      <div className="divsBoxContainer rounded w-3/4 md:w-1/2 lg:w-1/4">
        <span className="textAboveDivs"> Your balance to be migrated:</span>
        <div className="claimableDividends">
          {wallet.length > 0 ? (
            <span className="NumberColor">
              $ {Math.round(claimableBalance / 10 ** 18)}
            </span>
          ) : (
            <span className="">Connect your wallet</span>
          )}
        </div>
      </div>
      <img src={lowCable} alt="" />

      <div className="multiBoxContainer flex flex-col">
        {isLoading && <Spinner />}

        {allowance < 1 && (
          <button
            className={`${
              isLoading
                ? "bg-gray-700 cursor-default"
                : "bg-orange cursor-pointer"
            } transition-all	py-2 px-3 rounded-xl font-bold text-yellow mb-2 z-40`}
            onClick={handleApproveTokenClick}
            disabled
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
