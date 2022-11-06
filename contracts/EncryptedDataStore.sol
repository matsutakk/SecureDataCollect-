// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BigNumbers.sol";

/// @title ZkML
/// @author Team ZkML
/// @notice contract to manage user history by privacy-preserving way

contract EncryptedDataStore is Ownable, IBigNumbers{
    using BigNumbers for *;

    // address to uint256(video genre) to how many times user clicked this genre
    mapping(address => bytes[]) public userHistoryData;
    mapping(address => bool) public isUserRegistered;

    constructor () Ownable(){}

    modifier onlyRegisterUser(address user){
        require(isUserRegistered[user], "Please register user");
        _; 
    }

    /**
    * @dev triggered by user click. User encrypt array data of genre before send transaction
    */
    function appendData(bytes[] memory encryptedData, bytes memory mod, uint256 counter, address user) external onlyRegisterUser(user){ 
        bytes[] storage mp = userHistoryData[user];
        for(uint256 i = 0; i<counter; i++){
            mp[i] = _homomorphicAddition(mp[i], encryptedData[i], mod).val;
        }
    }

    /**
    * @dev homomorphic addition by Solidity-BigNumbers since cipher text cannot be represented by uint256
    */
    function _homomorphicAddition(bytes memory a, bytes memory b, bytes memory mod) internal view returns(IBigNumbers.BigNumber memory res){
        BigNumber memory bn_cur;
        bn_cur = BigNumbers.init(a, false);
        BigNumber memory bn_add;
        bn_add = BigNumbers.init(b, false);
        BigNumber memory modulus;
        modulus = BigNumbers.init(mod, false);
        res = BigNumbers.modmul(bn_cur, bn_add, modulus);
        return res;
    }

    /**
    * @dev this function called by the bussiness company, e.g. our team
    */
    function initializeData(bytes memory encryptedData, uint256 counter, address user) external onlyOwner() {
        bytes[] memory mp = userHistoryData[msg.sender];
        mp = new bytes[](counter);
        for(uint256 i = 0; i < counter; i++){
            mp[i] = encryptedData;
        }
        isUserRegistered[user] = true;
        userHistoryData[user] = mp;
    }
}