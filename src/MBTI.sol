// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MBTIStorage {
    address public owner;
    mapping(address => string) public mbtiData;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    event MBTIUpdated(address indexed user, string mbtiType);

    constructor() {
        owner = msg.sender;
    }

    function isValidMBTI(string memory _mbtiType) internal pure returns (bool) {
        bytes memory mbtiBytes = bytes(_mbtiType);
        if (mbtiBytes.length != 4) {
            return false; // MBTI type should be 4 characters long
        }

        return true;
    }

    function updateMBTI(string memory _mbtiType) public {
        require(isValidMBTI(_mbtiType), "Invalid MBTI type");
        mbtiData[msg.sender] = _mbtiType;
        emit MBTIUpdated(msg.sender, _mbtiType);
    }

    function getMBTI(address _user) public view returns (string memory) {
        return mbtiData[_user];
    }
}
