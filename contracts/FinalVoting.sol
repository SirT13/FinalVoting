//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;



error VotingSystem__NotRegistered();
error VotingSystem__AlreadyVoted();
error VotingSystem__VotingPeriodNotFinished(uint256 timeRemaining);


/** @title This contract does the basic proccess of the voting System
*   @author Thanasis
*   @notice This contract is to demo a sample of voting system
*   @dev This implements....
*/

contract VotingSystem {
    
    //State Variables!
    
    address public systemOwner;

    uint8 public candiId = 0;
    uint public votingDuration;

    struct Voter {
        uint authedicationId;
        uint votedCandidate;
        address voterAd;
        string name;
        bool registeredVoter;
        bool eligibleToVote;
        bool voted;
    }

    struct Candidate {
        uint id;
        uint voteCount;
        address candidateAd;
        string name;
        string party;
        string ideas;
        bool registeredCandidate;
    }

    mapping(address => Voter) public Voters;
    mapping(uint => Candidate) public Candidates;

    event CandidateRegistered(string indexed candidatesName);
    event VoterRegistered(address indexed voter);
    event VoteCasted(address indexed votersAddress, string);
    event VotingEnded();


    modifier onlyOwner() {
        require(systemOwner == msg.sender, "Caller is not the owner.");
        _;
    }

    modifier isVotingOpen() {
        require(block.timestamp < votingDuration, "Voting has ended.");
        _;
    }
   
   
   
    constructor( ) {
        systemOwner = msg.sender;
    }

    function startVoting(uint256 _votingDuration) public onlyOwner {
        require(votingDuration == 0, "Voting has already started.");
        votingDuration = block.timestamp + _votingDuration;
    }

    /** @notice This function registers the Voter to the system.
      * @dev .....
      * @param _name of the voter & the _authedicationId from the SSO solutions.
      * @return true if the voters is eligible to vote and his/her name.
     */

    function registerVoter(
        string memory _name,
        uint _authedicationId
    ) public returns (bool, string memory) {
        // require for a check of authentication of the id

        require(!Voters[msg.sender].registeredVoter);
        // require(Voters[msg.sender].authedicationId = 0 , "Voter already registered");
        Voters[msg.sender] = Voter(
            _authedicationId,
            0,
            msg.sender,
            _name,
            true,
            true,
            false
        );
        emit VoterRegistered(msg.sender);

        return (
            Voters[msg.sender].registeredVoter,
            "You sucessfully registered"
        );
    }


    /** @notice This function registers the Candidate to the system.
      * @dev .....
      * @param _name of the candidate, the _party that he takes part in @ _ideas that he/she believes.
      * @return true if the candidate registered succesfully.
     */



    function registerCandidate(
        string memory _name,
        string memory _party,
        string memory _ideas
    ) public onlyOwner returns (bool, string memory) {
        candiId++;
        require(Candidates[candiId].id == 0);
        Candidates[candiId] = Candidate(
            candiId,
            0,
            msg.sender,
            _name,
            _party,
            _ideas,
            true
        );
        emit CandidateRegistered(_name);
        return (
            Candidates[candiId].registeredCandidate,
            "You sucessfully registered"
        );
    }

    function getVoter() public view returns (Voter memory) {
        return (Voters[msg.sender]);
    }

    function getCandidate() public view returns (Candidate memory) {
        return (Candidates[candiId]);
    }



    /** @notice This function does the process of the voting from the voter.
      * @dev .....
      * @param  _id the id of the candidate that the voter wants to vote.
     */

    function vote(uint _id) public isVotingOpen {
       require(Voters[msg.sender].registeredVoter); // gas limitation
        
       require(!Voters[msg.sender].voted, "You already voted");
        

        require(_id > 0 && _id <= candiId);
        Voters[msg.sender].votedCandidate = _id;
        Candidates[_id].voteCount++;
        Voters[msg.sender].voted = true;
        emit VoteCasted(msg.sender, "You succesfully Voted");
    }

    /** @notice This function ending the voting process after the time passes.
      * @dev .....
     */


    function endVoting() public onlyOwner {
       // require(block.timestamp >= votingDuration, "Voting has not ended yet.");
        if(block.timestamp < votingDuration){
            uint timeRemaining = votingDuration - block.timestamp;
            revert VotingSystem__VotingPeriodNotFinished( timeRemaining);
        }

        votingDuration = 0;
        emit VotingEnded();
    }

    /** @notice This function gives the result of the voting .
      * @dev .....
      * @return  names voteCounts of the winner of the elections.
     */

    function getResults()
        public
        view
        returns (string[] memory names, uint[] memory voteCounts)
    {
        require(block.timestamp > votingDuration);
        names = new string[](candiId);
        voteCounts = new uint[](candiId);
        for (uint i = 1; i <= candiId; i++) {
            names[i - 1] = Candidates[i].name;
            voteCounts[i - 1] = Candidates[i].voteCount;
        }

        return (names, voteCounts);
    }

    
}