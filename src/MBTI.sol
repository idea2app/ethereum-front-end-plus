// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MBTIStorage {
    uint256 constant SERVICE_CHARGE = 1000000000000000;

    address private _owner;
    mapping(address => int8) private _mbtiData;
    uint256 private _balance;

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the owner can call this function");
        _;
    }

    event MBTIUpdated(address indexed user, int mbtiType);

    constructor() {
        _owner = msg.sender;
    }

    function setMBTI(int8 mbtiType) private  {
        require(mbtiType >= 0 && mbtiType <= 8, "Invalid MBTI type.");
        _mbtiData[tx.origin] = mbtiType + 1;
        emit MBTIUpdated(tx.origin, mbtiType);
    }

    function claimMBTI(int8 mbtiType) public {
        require(_mbtiData[tx.origin] == 0, "MBTI has been initialized.");
        setMBTI(mbtiType);
    }

    function updateMBTI(int8 mbtiType) public payable  {
        require(_mbtiData[tx.origin] > 0, "MBTI is not initialized.");
        require(msg.value >= SERVICE_CHARGE, "Service charge must be greater than 0.001ETH.");
        setMBTI(mbtiType);
        _balance += msg.value;
    }

    function getMBTI(address user) public view returns (int) {
        require(_mbtiData[user] > 0, "MBTI is not initialized.");
        return _mbtiData[user] - 1;
    }

    function getMyMBTI() public view returns (int) {
        return getMBTI(msg.sender);
    }

    function sendContractBalance(address payable user, uint256 value) public onlyOwner {
        require(value <= _balance, "There is not enough balance in the contract account.");
        user.transfer(value);
        _balance -= value;
    }
}
