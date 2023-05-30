const { verify } = require("../utils/verify.js")
const { ethers } = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigners()

    console.log("Deploying contracts with the account:", deployer.address)

    const Votingsystem = await ethers.getContractFactory("VotingSystem")

    const votingsystem = await Votingsystem.deploy()

    console.log("Contract deployed to:", votingsystem.address)
    console.log("Waiting for transactions to be mined...")
    await new Promise((resolve) => setTimeout(resolve, 50000)) // wait for 50 seconds
    // await votingsystem.deployTransaction.wait()

    await verify(votingsystem.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
