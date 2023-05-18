// const { expect } = require("chai")
// const { ethers } = require("hardhat")

// describe("FinalVoting contract", function () {
//     let VotingSystem
//     let votingSystem
//     let owner, addr1, _

//     beforeEach(async function () {
//         VotingSystem = await ethers.getContractFactory("VotingSystem")
//         ;[owner, addr1, _] = await ethers.getSigners()
//         votingSystem = await VotingSystem.deploy(10000)
//     })

//     describe("Voter Registration", function () {
//         it("Should register voters correctly", async function () {
//             await votingSystem.connect(addr1).registerVoter("Alice", 1)
//             const voter = await votingSystem.connect(addr1).getVoter()
//             expect(voter.name).to.equal("Alice")
//             expect(voter.voterAd).to.equal(addr1.address)
//             expect(voter.registeredVoter).to.equal(true)
//         })
//     })

//     describe("Candidate Registration", function () {
//         it("Should register candidates correctly", async function () {
//             await votingSystem.connect(owner).registerCandidate("John Doe", "Peace Party", "Unity")
//             const candidate = await votingSystem.connect(owner).getCandidate()
//             expect(candidate.name).to.equal("John Doe")
//             expect(candidate.party).to.equal("Peace Party")
//             expect(candidate.registeredCandidate).to.equal(true)
//         })
//     })

//     describe("Voting", function () {
//         it("Should start and end voting correctly", async function () {
//             // Fast forward time
//             await ethers.provider.send("evm_increaseTime", [501010])
//             await ethers.provider.send("evm_mine") // this just triggers a block so the time change is included

//             await votingSystem.connect(owner).endVoting()
//             expect(await votingSystem.votingDuration()).to.equal(0)
//         })
//     })
// })
