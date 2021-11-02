import { useState, useEffect } from "react";
import Web3 from "web3";
import { claimDividends } from "../Utils/walletInteract";
import MCFabi from "../ABI/mcfabi.json";
const web3 = new Web3("https://bsc-dataseed1.binance.org");
const contractAddress = "0x6E1f76017024BaF9dc52a796dC4e5Ae3110005c2";
const mcfHandler = new web3.eth.Contract(MCFabi, contractAddress);
export const Home = () => {
  const [dividend, setDividends] = useState("");
  const [price, setPrice] = useState("");

  async function pullDividends() {
    let dividends = await mcfHandler.methods
      .getTotalDividendsDistributed()
      .call();
    setDividends(dividends);
  }

  const claimDividends = async () => {
    mcfHandler.methods.claim().call();
  };

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
            <span class="front text">Claim dividends</span>
          </button>
        </div>
      </div>
      ;
    </main>
  );
};
