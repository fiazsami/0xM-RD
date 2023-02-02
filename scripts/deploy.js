// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const Greeter = await hre.ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello World");

    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy();

    const MToken = await hre.ethers.getContractFactory("MToken");
    const mToken = await MToken.deploy("0xMacro Token2", "0xMT2");

    await greeter.deployed();
    console.log(`Greeter deployed to ${greeter.address}`);

    await token.deployed();
    console.log(`0xMT deployed to ${token.address}`);

    await mToken.deployed();
    console.log(`0xMT2 deployed to ${mToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
