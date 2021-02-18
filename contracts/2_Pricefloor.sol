/*
    SPDX-License-Identifier: MIT
*/

pragma solidity 0.6.12;

contract Hourglass {
    function reinvest() public {}
    function myTokens() public view returns(uint256) {}
    function myDividends(bool) public view returns(uint256) {}
}

contract Pricefloor {
    Hourglass hourglassInterface;
    address public hourglassAddress;
    
    constructor(address _hourglass) public {hourglassInterface = Hourglass(_hourglass);}
    function raiseTheFloor() public {hourglassInterface.reinvest();}
    function pricefloorBalance() public view returns(uint256) {return hourglassInterface.myTokens();}
    function pricefloorDividends() public view returns(uint256) {return hourglassInterface.myDividends(true);}
}