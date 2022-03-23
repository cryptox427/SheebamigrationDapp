/* eslint-disable no-unused-vars */
import Web3 from "web3";
import MCFabi from "../ABI/mcfabi.json";
import gameABI from "../ABI/gameAbi.json";
import migrationABI from "../ABI/migrationABI.json";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import { useCallback, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { providers } from "ethers";
const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0xa83055eaa689E477e7b2173eD7E3b55654b3A1f0";
const gameAddress = "0xf1B6448aA3c904b50b27b4283587Cf5E8209524C";
const migrationContractAddress = "0x713Cf7b5bCc50aB9260e3aDaabD13201579C3117";
let approvedTokens = web3.utils.toBN("50000000000000000000000");

//const mcfHandler = new web3.eth.Contract(MCFabi, contractAddress);
const supportedChains = [
  {
    name: "Ethereum Mainnet",
    short_name: "eth",
    chain: "ETH",
    network: "mainnet",
    chain_id: 1,
    network_id: 1,
    rpc_url: "https://mainnet.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Ropsten",
    short_name: "rop",
    chain: "ETH",
    network: "ropsten",
    chain_id: 3,
    network_id: 3,
    rpc_url: "https://ropsten.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Rinkeby",
    short_name: "rin",
    chain: "ETH",
    network: "rinkeby",
    chain_id: 4,
    network_id: 4,
    rpc_url: "https://rinkeby.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Görli",
    short_name: "gor",
    chain: "ETH",
    network: "goerli",
    chain_id: 5,
    network_id: 5,
    rpc_url: "https://goerli.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "RSK Mainnet",
    short_name: "rsk",
    chain: "RSK",
    network: "mainnet",
    chain_id: 30,
    network_id: 30,
    rpc_url: "https://public-node.rsk.co",
    native_currency: {
      symbol: "RSK",
      name: "RSK",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Kovan",
    short_name: "kov",
    chain: "ETH",
    network: "kovan",
    chain_id: 42,
    network_id: 42,
    rpc_url: "https://kovan.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Classic Mainnet",
    short_name: "etc",
    chain: "ETC",
    network: "mainnet",
    chain_id: 61,
    network_id: 1,
    rpc_url: "https://ethereumclassic.network",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "POA Network Sokol",
    short_name: "poa",
    chain: "POA",
    network: "sokol",
    chain_id: 77,
    network_id: 77,
    rpc_url: "https://sokol.poa.network",
    native_currency: {
      symbol: "POA",
      name: "POA",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "POA Network Core",
    short_name: "skl",
    chain: "POA",
    network: "core",
    chain_id: 99,
    network_id: 99,
    rpc_url: "https://core.poa.network",
    native_currency: {
      symbol: "POA",
      name: "POA",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "xDAI Chain",
    short_name: "xdai",
    chain: "POA",
    network: "dai",
    chain_id: 100,
    network_id: 100,
    rpc_url: "https://dai.poa.network",
    native_currency: {
      symbol: "xDAI",
      name: "xDAI",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Callisto Mainnet",
    short_name: "clo",
    chain: "callisto",
    network: "mainnet",
    chain_id: 820,
    network_id: 1,
    rpc_url: "https://clo-geth.0xinfra.com/",
    native_currency: {
      symbol: "CLO",
      name: "CLO",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Binance Smart Chain",
    short_name: "bsc",
    chain: "smartchain",
    network: "mainnet",
    chain_id: 56,
    network_id: 56,
    rpc_url: "https://bsc-dataseed1.defibit.io/",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "BSC TestNet",
    short_name: "bsc",
    chain: "smartchain",
    network: "mainnet",
    chain_id: 97,
    network_id: 97,
    rpc_url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    native_currency: {
      symbol: "BNB",
      name: "BNB",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
];

function getChainData(chainId) {
  if (!chainId) {
    return null;
  }
  const chainData = supportedChains.filter(
    (chain) => chain.chain_id === chainId
  )[0];

  console.log("chainId = ", chainId);
  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  const API_KEY = "460f40a260564ac4a4f4b3fffb032dad";

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}
function ellipseAddress(address = "", width = 10) {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}
const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";
const providerOptions = {
  /*
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },*/

  "custom-WalletConnectProvider": {
    display: {
      name: "WalletConnect",
      description: "Scan with WalletConnect to connect",
      logo: "https://repository-images.githubusercontent.com/204001588/a5169900-c66c-11e9-8592-33c7334dfd6d",
    },
    package: WalletConnectProvider, // required
    options: {},

    connector: async (_, options) => {
      const provider = new _({
        rpc: {
          1: "https://mainnet.infura.io/v3/b888190dbba14ddbb66162628cf0e555",
        },
        chainId: 1,
        infuraId: undefined,
      });
      await provider.enable();
      return provider;
    },
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};
let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    //network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
    theme: "dark",
  });
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
}
export const Web3Modals = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;

  const dispatcher = useDispatch();

  const connect = useCallback(
    async function () {
      // This is the initial `provider` that is returned when
      // using web3Modal to connect. Can be MetaMask or WalletConnect.
      const provider = await web3Modal.connect();

      // We plug the initial `provider` into ethers.js and get back
      // a Web3Provider. This will add on methods from ethers.js and
      // event listeners such as `.on()` will be different.
      const web3Provider = new providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      const network = await web3Provider.getNetwork();

      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      });

      dispatcher({
        type: "SET_WALLET",
        payload: provider,
      });

      dispatcher({
        type: "SET_ADDRESS",
        payload: address,
      });
    },
    [dispatcher]
  );

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );

  // Auto connect to the cached provider
  /*
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);
  */

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  const chainData = getChainData(chainId);

  return (
    <div className="flex flex-col">
      <div className="w-full">
        {web3Provider ? (
          <button
            className="bg-red-600 h-35 rounded-xl text-white text-18 px-5"
            type="button"
            onClick={disconnect}
          >
            DISCONNECT
          </button>
        ) : (
          <button
            className="bg-black h-35 border-2 rounded-xl border-green2 text-white text-18 px-5"
            type="button"
            onClick={connect}
          >
            CONNECT WALLET
          </button>
        )}
      </div>
      <div className="w-full">
        {address && (
          <div className="grid">
            <div>
              <p className="mb-1 text-white">Network:</p>
              <p className="text-white">{chainData?.name}</p>
            </div>
            <div>
              <p className="mb-1 text-white">Address:</p>
              <p className="text-white">{ellipseAddress(address)}</p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full"></div>
    </div>
  );
};

export default Web3Modals;

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
        };
      } else {
        return {
          address: "",
        };
      }
    } catch (err) {
      return {
        address: "",
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const claimDividends = async () => {
  console.log(window.ethereum.selectedAddress);
  var myContract = new web3.eth.Contract(MCFabi, contractAddress);
  await myContract.methods
    .claim()
    .send({ from: window.ethereum.selectedAddress });
  console.log("dividends succesfully claimed");
};

export const approveTokens = async () => {
  var myContract = new web3.eth.Contract(MCFabi, contractAddress);
  await myContract.methods
    .approve(gameAddress, approvedTokens)
    .send({ from: window.ethereum.selectedAddress });
  console.log("tokens approved for spending in game");
};

export const buyticket = async () => {
  var myContract = new web3.eth.Contract(gameABI, gameAddress);
  await myContract.methods
    .BuyTicket()
    .send({ from: window.ethereum.selectedAddress });
  console.log("ticket successufully bought");
};

export const claim = async () => {
  var myContract = new web3.eth.Contract(gameABI, gameAddress);
  await myContract.methods
    .claimPrize()
    .send({ from: window.ethereum.selectedAddress });
  console.log("price successfully claimed");
};

export const pullTier = async (userWallet) => {
  var myContract = new web3.eth.Contract(gameABI, gameAddress);
  let hello = await myContract.methods.returnLastWinTier(userWallet).call();

  console.log(hello);

  return hello;
};

export const pullAllowance = async (permissionWallet, scratchAddress) => {
  var myContract = new web3.eth.Contract(MCFabi, contractAddress);
  let allowance = await myContract.methods
    .allowance(permissionWallet, scratchAddress)
    .call();
  return allowance;
};

export const pullIsPlaying = async (playingAddress) => {
  var myContract = new web3.eth.Contract(gameABI, gameAddress);
  let status = await myContract.methods.isActive(playingAddress).call();
  return status;
};
export const migrateTokens = async (tokenAmount) => {
  console.log("Its reaching here");
  var myContract = new web3.eth.Contract(
    migrationABI,
    migrationContractAddress
  );
  await myContract.methods
    .migrateTokens(tokenAmount)
    .send({ from: window.ethereum.selectedAddress });
  console.log("Tokens migrated");
};

export const approveCustomTokenAmount = async (tokenAmount) => {
  var myContract = new web3.eth.Contract(MCFabi, contractAddress);
  await myContract.methods
    .approve(migrationContractAddress, web3.utils.toBN(tokenAmount))
    .send({ from: window.ethereum.selectedAddress });
};
