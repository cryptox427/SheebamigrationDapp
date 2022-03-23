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
import { woodBoxesInitialState } from "../components/woodBoxes";
import { WoodBoxes } from "../components/woodBoxesComponent";
import { Spinner } from "../components/Spinner/Spinner";
const web3 = new Web3(
  "https://mainnet.infura.io/v3/b888190dbba14ddbb66162628cf0e555"
);
const contractAddress = "0xa83055eaa689E477e7b2173eD7E3b55654b3A1f0";
const migrationContractAddress = "0x9322915b1790a55897b4f6Fe52Bd66382Fed027d";

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
    buttonText: "APPROVE ",
  });
  const [woodBoxes, setWoodBoxes] = useState(woodBoxesInitialState);
  const [claimableBalance, setClaimable] = useState("");
  const [wallet, setWallet] = useState("");
  const { isApproved, buttonText } = approveToken;
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setApproveToken({
            isApproved: false,
            buttonText: "MIGRATE!",
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
        //pullBalance(address);
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
    <div className="flex flex-col items-center mb-10 mx-auto w-11/12 gap-12">
      <div className="totalDivs w-full md:w-10/12 lg:w-1/2">
        <span className="NumberColor">SHEEBA INU MIGRATION</span>
        <span className="">New Contract: 0XXX</span>
      </div>

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

      <div className="multiBoxContainer flex flex-col">
        {isLoading && <Spinner />}

        {allowance < 1 && (
          <button
            className={`${
              isLoading
                ? "bg-gray-700 cursor-default"
                : "bg-gray-700 cursor-pointer"
            } transition-all	py-2 px-3 rounded-xl font-bold text-yellow mb-2 z-40`}
            onClick={handleApproveTokenClick}
            disabled={isLoading}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
