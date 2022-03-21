import { useState, useEffect } from "react";
import Web3modal from "../../Utils/walletInteract";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "../../Utils/walletInteract";

export const Header = () => {
  const [walletAddress, setWallet] = useState("");
  const [, /*status*/ setStatus] = useState("");

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://metamask.io/download.html`}
          >
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  useEffect(() => {
    async function myFunction() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
      addWalletListener();
    }
    myFunction();
  }, []);
  return (
    <div className="mainHeaderContainer">
      <div className="flex flex-col gap-10 p-5 inContain sm:flex-row sm:gap-0 sm:py-0">
        <div className="leftContainer">
          <a href="https://sheebainu.io/" className="connectWalletButton">
            <button className="connectWalletButton">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">Go to homepage</span>
            </button>
          </a>
        </div>
        <div className="middleContainer"></div>
        <div className="rightContainer">
          <Web3modal />
        </div>
      </div>
    </div>
  );
};
