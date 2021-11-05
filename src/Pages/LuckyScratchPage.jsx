import { useState, useEffect } from "react";
import { getCurrentWalletConnected } from "../Utils/walletInteract";
import background from "../Images/background.png";
import boxes from "../Images/boxes.png";
import logo from "../Images/logo.png";
import price1 from "../Images/prize 1.png";
import price2 from "../Images/prize 2.png";
import price3 from "../Images/prize 3.png";
import price4 from "../Images/prize 4.png";
import price5 from "../Images/prize 5.png";
import price6 from "../Images/prize 6.png";
import mcfCoin from "../Images/mcf coin.png";
import match1 from "../Images/arm1.png";
import match2 from "../Images/arm2.png";
import match3 from "../Images/cardbg.png";
import match4 from "../Images/coin.png";
import match5 from "../Images/match3text.png";
import match6 from "../Images/title.png";

import MCFabi from "../ABI/mcfabi.json";
import Web3 from "web3";
const web3 = new Web3("https://bsc-dataseed1.ninicoin.io/");
const contractAddress = "0x6E1f76017024BaF9dc52a796dC4e5Ae3110005c2";
const mcfHandler = new web3.eth.Contract(MCFabi, contractAddress);
const scratchiesAddress = "";
const ethereum = window.ethereum;
if (ethereum) {
  ethereum.on("accountsChanged", function (accounts) {
    console.log(accounts[0]);
  });
}

const initialPricesState = [
  {
    logo: price1,
    price: "1,250",
  },
  {
    logo: price2,
    price: "2,500",
  },
  {
    logo: price3,
    price: "5,000",
  },
  {
    logo: price4,
    price: "125,000",
  },
  {
    logo: price5,
    price: "42,500",
  },
  {
    logo: price6,
    price: "100,000",
  },
];

const initialCirclesState = [
  {
    id: 1,
    isPressed: false,
    image: match1,
  },
  {
    id: 2,
    isPressed: false,
    image: match6,
  },
  {
    id: 3,
    isPressed: false,
    image: match6,
  },
];

export const LuckyScratchPage = () => {
  const prices = initialPricesState;
  const [totalMCFPaid, setTotalMCFPaid] = useState(0);
  const [scratchCardSold, setScratchCardSold] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [circlesState, setCirclesState] = useState(initialCirclesState);
  const [wallet, setWallet] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [factorySold, setFactorySold] = useState("");
  const [cardsSold, setCardsSold] = useState("");
  const [players, setPlayers] = useState("");
  const [allowance, setAllowance] = useState("");
  const [approveToken, setApproveToken] = useState({
    isApproved: false,
    buttonText: "approve FACTORY",
  });
  const [message, setMessage] = useState({
    showMessage: false,
    success: true,
    value: 0,
  });

  const { showMessage, success, value } = message;
  const { isApproved, buttonText } = approveToken;

  async function getUserBalance(userAddress) {
    let userTokenBalance = await mcfHandler.methods
      .balanceOf(userAddress)
      .call();
    setTokenBalance(userTokenBalance / 10 ** 18);
    console.log(tokenBalance);
  }
  async function pullGameData() {
    let getFactoryPaid = await scratchiesAddress.methods;
    let getCardsSold = await scratchiesAddress.methods;
    let players = await scratchiesAddress.methods;
    setFactorySold(getFactoryPaid);
    setCardsSold(getCardsSold);
    setPlayers(players);
  }
  async function pullAllowance(permissionAddress, contractAddress) {
    let spendingAmount = await mcfHandler.methods
      .allowance(permissionAddress, contractAddress)
      .call();
    setAllowance(spendingAmount);
    console.log(spendingAmount);
  }
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
      const { address } = await getCurrentWalletConnected();
      setWallet(address);
      addWalletListener();
      if (wallet.length > 0) {
        getUserBalance(wallet);
      }
    }
    magic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessageButtonClick = () => {};

  const handleCircleClick = (id) => {
    setCirclesState(
      circlesState.map((circle) =>
        circle.id === id ? { ...circle, isPressed: true } : circle
      )
    );
  };

  const handleApproveTokenClick = () => {};

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
      className="w-full h-auto xl:h-screen flex items-center relative overflow-hidden"
    >
      {showMessage && (
        <div className="flex flex-col items-center gap-5 absolute w-screen h-60 bg-gray-700 bottom-0 left-0 z-50 py-10 px-10 lg:px-40">
          <h1 className="text-5xl text-center font-extrabold text-yellow text-shadow">
            {success ? "Congratulations" : "Try again"}
          </h1>
          <p className="uppercase text-yellow font-bold text-2xl">
            You {success ? "won" : "lost"} {value} factory
          </p>
          <button
            className="bg-orange font-bold rounded-xl py-2 px-5 text-yellow text-3xl"
            onClick={handleMessageButtonClick}
          >
            {success ? "CLAIM" : "TRY AGAIN"}
          </button>
        </div>
      )}
      <div>
        <div className="w-screen mt-10 mb-20 xl:my-0 flex flex-col xl:flex-row items-center justify-center gap-10 text-blue-900">
          <div className="w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-2/12">
            <h1 className="font-bold text-blue-900 text-center text-xl">
              Price Chart
            </h1>
            <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl p-5 bg-yellow">
              {prices.map(({ logo, price }) => (
                <div key={logo} className="flex justify-between">
                  <div className="flex gap-2">
                    <div
                      style={{
                        backgroundImage: `url(${logo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                      className="h-5 w-5"
                    />
                    <div
                      style={{
                        backgroundImage: `url(${logo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                      className="h-5 w-5"
                    />
                    <div
                      style={{
                        backgroundImage: `url(${logo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center gap-5">
                    <label className="font-bold">{price}</label>
                    <div
                      style={{
                        backgroundImage: `url(${mcfCoin})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                      className="h-5 w-5"
                    />
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-2 self-center">
                <div className="flex gap-5 self-center items-center">
                  <h1 className="text-2xl font-bold">1,000</h1>
                  <div
                    style={{
                      backgroundImage: `url(${mcfCoin})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                    }}
                    className="h-10 w-10"
                  />
                </div>
                <p className="font-bold self-center text-xs">
                  per Scratch Card
                </p>
              </div>
            </div>
          </div>
          <div className="w-9/12 sm:w-7/12 md:w-9/12 lg:w-1/2">
            <div className="flex flex-col gap-10 justify-evenly w-full h:auto md:h-96 bg-orange border-4 border-yellow rounded-xl p-10">
              <div
                style={{
                  backgroundImage: `url(${logo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
                className="mx-auto w-60 h-24"
              />
              <div className="flex flex-col md:flex-row items-center justify-center gap-20 w-full">
                {circlesState.map(({ id, isPressed, image }) => (
                  <div
                    key={id}
                    className={`${
                      isPressed ? "bg-blue-300" : "bg-purple-300 cursor-pointer"
                    } flex justify-center items-center rounded-full border-4 border-yellow flex-shrink-0 h-24 w-24 font-bold`}
                    onClick={() => handleCircleClick(id)}
                  >
                    {isPressed && (
                      <div
                        style={{
                          backgroundImage: `url(${image})`,
                          backgroundSize: "auto 100%",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                        className="h-8 w-20"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-2/12">
            <div>
              <div className="flex items-center justify-center gap-1.5 font-bold text-blue-900 text-lg">
                <h1>TOTAL</h1>
                <div
                  style={{
                    backgroundImage: `url(${mcfCoin})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                  }}
                  className="h-5 w-5"
                />
                <h1>FACTORY paid</h1>
              </div>
              <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl text-right py-1 px-2 bg-yellow">
                <p className="font-bold text-xl">{totalMCFPaid}</p>
              </div>
              <h1 className="font-bold text-blue-900 text-lg text-center mt-5">
                Scratch Card Sold
              </h1>
              <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl text-right py-1 px-2 bg-yellow">
                <p className="font-bold text-xl">{scratchCardSold}</p>
              </div>
              <h1 className="font-bold text-blue-900 text-lg text-center mt-5">
                Total Players
              </h1>
              <div className="flex flex-col gap-5 border-4 border-yellow-700 rounded-xl text-right py-1 px-2 bg-yellow">
                <p className="font-bold text-xl">{totalPlayers}</p>
              </div>
              <div className="text-center text-sm mt-5">
                <p>
                  Do not send funds to the contract address as they will be lost
                  This is Defi, play at your own risk.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-evenly w-screen absolute -bottom-5">
          <div
            style={{
              backgroundImage: `url(${boxes})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            className="w-1/4 h-28"
          />
          <div
            style={{
              backgroundImage: `url(${boxes})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            className="w-1/4 h-28"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-10 w-full">
          <button
            className="claimDividends"
            onClick={() => {
              getUserBalance(wallet);
              wallet.length <= 0 ? console.log("no") : getUserBalance(wallet);
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
          <label className="border-b-2	border-blue-900">
            Rules & Gamble Disclaimer
          </label>
        </div>
      </div>
    </div>
  );
};
