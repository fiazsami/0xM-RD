import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";

const greeterAddress = "0xf7A734DCEc989Cb08F71CAAf6B8C30aB8cf83F90";
// const tokenAddress = "0xc55b64dcDf08A1d031d883e0c163905c244111C2";
const tokenAddress = "0xfb1975d423D33dFd8F3243CddF76D5Ef7b274C7D";

function App() {
    const [greeting, setGreetingValue] = useState();
    const [userAccount, setUserAccount] = useState();
    const [amount, setAmount] = useState();

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    async function fetchGreeting() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider });
            const contract = new ethers.Contract(
                greeterAddress,
                Greeter.abi,
                provider,
            );
            try {
                const data = await contract.greet();
                console.log("data: ", data);
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    async function getBalance() {
        if (typeof window.ethereum !== "undefined") {
            const [account] = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
                tokenAddress,
                Token.abi,
                provider,
            );
            const balance = await contract.balanceOf(account);
            console.log("Balance: ", balance.toString());
        }
    }

    async function setGreeting() {
        if (!greeting) return;
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider });
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                greeterAddress,
                Greeter.abi,
                signer,
            );
            const transaction = await contract.setGreeting(greeting);
            await transaction.wait();
            fetchGreeting();
        }
    }

    async function sendCoins() {
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                tokenAddress,
                Token.abi,
                signer,
            );
            const transation = await contract.transfer(userAccount, amount);
            await transation.wait();
            console.log(`${amount} Coins successfully sent to ${userAccount}`);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={fetchGreeting}>Fetch Greeting</button>
                <button onClick={setGreeting}>Set Greeting</button>
                <input
                    onChange={(e) => setGreetingValue(e.target.value)}
                    placeholder="Set greeting"
                />

                <br />
                <button onClick={getBalance}>Get Balance</button>
                <button onClick={sendCoins}>Send Coins</button>
                <input
                    onChange={(e) => setUserAccount(e.target.value)}
                    placeholder="Account ID"
                />
                <input
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />
            </header>
        </div>
    );
}

export default App;
