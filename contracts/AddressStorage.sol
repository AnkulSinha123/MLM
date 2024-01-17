// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AddressStorage {
    address[] public users;

    event UserAdded(address indexed user);

    function addUser() external {
        require(!userExists(msg.sender), "User already exists");
        users.push(msg.sender);
        emit UserAdded(msg.sender);
    }

    function getUsers() external view returns (address[] memory) {
        return users;
    }

    function userExists(address userAddress) internal view returns (bool) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i] == userAddress) {
                return true;
            }
        }
        return false;
    }
}