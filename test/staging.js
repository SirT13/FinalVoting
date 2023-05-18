// const { expect } = require("chai")
// const { ethers } = require("hardhat")

// describe("FinalVoting contract", function () {
//     let VotingSystem
//     let votingSystem

//     beforeEach(async function () {
//         // Get the ContractFactory and Signers here.
//         VotingSystem = await ethers.getContractFactory("VotingSystem")
//         ;[owner, addr1, addr2, _] = await ethers.getSigners()

//         // To deploy our contract, we just have to call VotingSystem.deploy() and await
//         // it to be deployed(), which happens once its transaction has been mined.
//         votingSystem = await VotingSystem.deploy(10000)
//     })

//     describe("Deployment", function () {
//         it("Should set the right owner", async function () {
//             expect(await votingSystem.systemOwner()).to.equal(owner.address)
//         })
//     })

//     // describe("Voting", function () {
//     //     it("Should start and end voting correctly", async function () {
//     //         const initialTimestamp = await votingSystem.votingDuration()
//     //         await votingSystem.endVoting()
//     //         const finalTimestamp = await votingSystem.votingDuration()
//     //         expect(finalTimestamp).to.be.lt(initialTimestamp)
//     //     })

//     it("Should count votes correctly", async function () {
//         // Register a candidate
//         await votingSystem.connect(owner).registerCandidate("John Doe", "Peace Party", "Unity")

//         // Register voters
//         await votingSystem.connect(addr1).registerVoter("Alice", 1)
//         await votingSystem.connect(addr2).registerVoter("Bob", 2)

//         // Vote for the candidate
//         await votingSystem.connect(addr1).vote(1)
//         await votingSystem.connect(addr2).vote(1)

//         // Get the candidate details
//         const candidate = await votingSystem.getCandidate()

//         // Check the vote count
//         expect(candidate.voteCount).to.equal(2)
//     })
// })
