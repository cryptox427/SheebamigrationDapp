import { useState, useEffect } from "react";
import Web3 from "web3";
import {
  claimDividends,
  getCurrentWalletConnected,
} from "../Utils/walletInteract";
import MCFabi from "../ABI/mcfabi.json";
const web3 = new Web3("https://bsc-dataseed1.binance.org");
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
  const [price, setPrice] = useState("");
  const [wallet, setWallet] = useState("");
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  }
  useEffect(() => {
    async function magic() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      addWalletListener();
    }
    magic();
  }, []);

  async function pullDividends() {
    let dividends = await mcfHandler.methods
      .getTotalDividendsDistributed()
      .call();
    setDividends(dividends);
  }

  useEffect(() => {
    pullDividends();
  }, []);

  return (
    <main>
      <div className="BoxContainers">
        <div className="totalDivs">
          <h1>Total BUSD reflected to holders :heart:</h1>
          <span className="NumberColor">
            {dividend / 10 ** 18} <span>BUSD so far!</span>
          </span>
        </div>
        <div className="currentPrice">Here goes price</div>

        <div className="multiBoxContainer">
          <button
            className="claimDividends"
            onClick={() => {
              claimDividends();
            }}
          >
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text">Claim</span>
          </button>
        </div>
      </div>
      ;
    </main>
  );
};
