require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.9",
    paths: {
        artifacts: "./src/artifacts",
    },
    networks: {
        hardhat: {
            // chainId: 1337,
        },
        goerli: {
            url: process.env.HTTPS_PROVIDER,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
