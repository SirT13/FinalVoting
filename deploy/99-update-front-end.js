const { ethers } = require("hardhat")
const fs = require("fs")

const FRONT_END_ADDRESSES_FILE = "../voting/constants/contractAddress.json"
const FRONT_END_ABI_FILE = "../voting/constants/abi.json"
module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("updating front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const votingsystem = await ethers.getContract("FinalVoting")
    fs.writeFileSync(
        FRONT_END_ABI_FILE,
        votingsystem.interface.format(ethers.utils.FormatTypes.json)
    ) //gets the abi of the contract
}

async function updateContractAddresses() {
    const votingsystem = await ethers.getContract("FinalVoting")
    const chainId = network.config.chainId.toString()
    const currentAddress = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))
    if (chainId in contractAddress) {
        if (!currentAddress[chainId].includes(votingsystem.address)) {
            currentAddress[chainId].push(votingsystem.address)
        }
    } else {
        currentAddress[chainId] = [votingsystem.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddress))
}

module.exports.tags = ["all", "frontend"]
