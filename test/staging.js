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

const { expect } = require("chai")

describe("VotingSystem", function () {
    let VotingSystem
    let votingSystem
    let owner
    let addr1
    let addr2
    let addrs

    beforeEach(async function () {
        VotingSystem = await ethers.getContractFactory("VotingSystem")
        ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
        votingSystem = await VotingSystem.deploy()
    })

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await votingSystem.systemOwner()).to.equal(owner.address)
        })
    })

    describe("Transactions", function () {
        it("Should register a voter", async function () {
            await votingSystem.connect(addr1).registerVoter("Alice", 123)
            const voter = await votingSystem.Voters(addr1.address)
            expect(voter.registeredVoter).to.equal(true)
            expect(voter.name).to.equal("Alice")
            expect(voter.authedicationId).to.equal(123)
        })

        // Add similar tests for other functions in the contract.
    })

    describe("Voting process", function () {
        it("Should allow for a full voting process", async function () {
            // owner starts the voting
            await votingSystem.startVoting(7) // 24 hours

            // Register a candidate
            await votingSystem.registerCandidate("Candidate1", "Party1", "Ideas1")

            // Register voters
            await votingSystem.connect(addr1).registerVoter("Alice", 123)
            await votingSystem.connect(addr2).registerVoter("Bob", 456)

            // Voters cast their votes
            await votingSystem.connect(addr1).vote(0)
            await votingSystem.connect(addr2).vote(0)

            // Simulate the end of the voting period by using ethers.provider.send(...)
            // Due to the current limitation of Hardhat, this needs to be simulated manually

            // Check the result
            const [names, voteCounts] = await votingSystem.getResults()
            expect(names[0]).to.equal("Candidate1")
            expect(voteCounts[0]).to.equal(2)
        })
    })
})
