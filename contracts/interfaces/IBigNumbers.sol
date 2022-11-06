// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.11;

interface IBigNumbers {
    // TODO create storage friendly version (pack/unpack bool and bitlen into one word)
    struct BigNumber { 
        bytes val;
        bool neg;
        uint bitlen;
    }
}