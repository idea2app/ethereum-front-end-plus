// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MBTIStorage {
    address private _owner;
    mapping(address => string) private _mbtiData;

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the owner can call this function");
        _;
    }

    event MBTIUpdated(address indexed user, string mbtiType);

    constructor() {
        _owner = msg.sender;
    }

    function isValidMBTI(string memory mbtiType) internal pure returns (bool) {
        bytes memory mbtiBytes = bytes(mbtiType);
        if (mbtiBytes.length != 4) {
            return false; // MBTI type should be 4 characters long
        }

        return true;
    }

    function updateMBTI(string memory mbtiType) public {
        require(isValidMBTI(mbtiType), "Invalid MBTI type");
        _mbtiData[msg.sender] = mbtiType;
        emit MBTIUpdated(msg.sender, mbtiType);
    }

    function getMBTI(address user) public view returns (string memory) {
        return _mbtiData[user];
    }
}
