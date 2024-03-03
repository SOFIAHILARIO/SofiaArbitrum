"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setWalletKey] = useState("");
  const [currentData, setCurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setWalletKey(accounts[0]);
    } catch (error: any) {
      console.error("Error connecting wallet:", error.message);
    }
  };

  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };

  const [stakingAmount, setStakingAmount] = useState<number>();

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Staking failed: ${decodedError?.args}`);
    }
  };

  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };

  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Withdrawal failed: ${decodedError?.args}`);
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url('https://wallpapers.com/images/featured/sakura-pc-xpjoihhwfmmleuiu.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style jsx>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 10px 5px #45f3ff;
          }
          50% {
            box-shadow: 0 0 10px 5px #ff6347;
          }
          100% {
            box-shadow: 0 0 10px 5px #45f3ff;
          }
        }

        .glowing-box {
          position: relative;
          border: 2px solid rgba(255, 255, 255, 0.2);
          padding: 80px 70px;
          margin: 20px;
          text-align: center;
          background: linear-gradient(90deg, #FFB3C6, #FFFFFF);
          border-radius: 10px;
          animation: glow 2s infinite alternate;
          opacity: 0.9;
          color: #ff69b4;
        }
      `}</style>

      <div className="glowing-box">
        <button
          onClick={() => {
            connectWallet();
          }}
          style={{
            padding: "0.75rem",
            backgroundImage:
              "url('https://i.pinimg.com/564x/69/a9/cb/69a9cbce372d6d83dffcff14731491a9.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            borderRadius: "0.25rem",
            fontWeight: "bold",
          }}
        >
          {walletKey !== "" ? walletKey : " Connect wallet"}
        </button>

        <div>
          <br></br>
          <form>
            <label>Mint Amount</label>
            <br></br>
          </form>
          <input
            type="text"
            value={mintingAmount}
            onChange={(e) => mintAmountChange(e)}
            style={{ color: "black", marginRight: "20px" }}
            placeholder="Mint Here "
          />
          <button
            onClick={() => {
              mintCoin();
            }}
            style={{
              padding: "0.75rem",
              backgroundImage:
                "url('https://i.pinimg.com/564x/69/a9/cb/69a9cbce372d6d83dffcff14731491a9.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
              borderRadius: "0.25rem",
              width: "140px",
              fontWeight: "bold",
            }}
          >
            {"Mint Token"}
          </button>
        </div>

        <br></br>

        <div>
          <form>
            <label> Stake Amount</label>
            <br></br>
          </form>
          <input
            type="text"
            value={stakingAmount}
            onChange={(e) => stakeAmountChange(e)}
            style={{ color: "Black", marginRight: "20px" }}
            placeholder="Stake Here"
          />

          <button
            onClick={() => {
              stakeCoin();
            }}
            style={{
              padding: "0.75rem",
              backgroundImage:
                "url('https://i.pinimg.com/564x/69/a9/cb/69a9cbce372d6d83dffcff14731491a9.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
              borderRadius: "0.25rem",
              width: "140px",
              fontWeight: "bold",
            }}
          >
            {"Stake Token"}
          </button>
        </div>

        <div>
          <br></br>
          <button
            onClick={() => {
              withdrawCoin();
            }}
            style={{
              padding: "0.75rem",
              backgroundImage:
                "url('https://i.pinimg.com/564x/69/a9/cb/69a9cbce372d6d83dffcff14731491a9.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
              borderRadius: "0.25rem",
              fontWeight: "bold",
            }}
          >
            {"Withdraw"}
          </button>
        </div>
      </div>
    </main>
  );
}
