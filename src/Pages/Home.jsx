import { useState, useEffect } from "react";
import Web3 from "web3";
import {
  claimDividends,
  getCurrentWalletConnected,
} from "../Utils/walletInteract";
import MCFabi from "../ABI/mcfabi.json";
const web3 = new Web3("https://bsc-dataseed1.ninicoin.io/");
const contractAddress = "0x6E1f76017024BaF9dc52a796dC4e5Ae3110005c2";
const mcfHandler = new web3.eth.Contract(MCFabi, contractAddress);

const ethereum = window.ethereum;
if (ethereum) {
  ethereum.on("accountsChanged", function (accounts) {
    console.log(accounts[0]);
  });
}

export const Home = () => {
  const [dividend, setDividends] = useState("");
  const [userDividends, setClaimable] = useState("");
  const [wallet, setWallet] = useState("");
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          getUserDividends(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  }
  async function pullDividends() {
    let dividends = await mcfHandler.methods
      .getTotalDividendsDistributed()
      .call();
    setDividends(dividends);
  }
  async function getUserDividends(userAddress) {
    let userDividends = await mcfHandler.methods
      .withdrawableDividendOf(userAddress)
      .call();
    setClaimable(userDividends / 10 ** 18);
  }
  useEffect(() => {
    async function magic() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      addWalletListener();
      pullDividends();
      if (wallet.length > 0) {
        getUserDividends(wallet);
        console.log(claimDividends);
      }
    }
    magic();
  }, []);

  console.log(wallet);
  return (
    <div className="BoxContainers">
      <div className="totalDivs">
        <h1>Total BUSD reflected to holders #128151</h1>
        <span className="NumberColor">{dividend / 10 ** 18} BUSD</span>
      </div>
      <div className="divsBoxContainer">
        <span className="textAboveDivs"> Your BUSD rewards</span>
        <div className="claimableDividends">
          {wallet.length > 0 ? (
            <span className="NumberColor">$ {userDividends}</span>
          ) : (
            <span class="">Connect your wallet</span>
          )}
        </div>
      </div>

      <div className="multiBoxContainer">
        <button
          className="claimDividends"
          onClick={() => {
            wallet.length <= 0 ? console.log("no") : claimDividends();
          }}
        >
          <span class="shadow"></span>
          <span class="edge"></span>
          {wallet.length > 0 ? (
            <span className="front text">claim</span>
          ) : (
            <span class="front text">Connect your wallet to claim</span>
          )}
        </button>
      </div>
    </div>
  );
};
