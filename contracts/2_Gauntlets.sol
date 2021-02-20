/**
 *Submitted for verification at BscScan.com on 2021-02-19
*/

pragma solidity ^0.4.25;

interface HourglassInterface {
    function buy(address _playerAddress) payable external returns(uint256);
    function sell(uint256 _amountOfTokens) external;
    function reinvest() external;
    function withdraw() external;
    function transfer(address _toAddress, uint256 _amountOfTokens) external returns(bool);
    function balanceOf(address _customerAddress) view external returns(uint256);
    function myDividends(bool _includeReferralBonus) external view returns(uint256);
}

contract GauntletManager {
    event CreatedGauntlet(address indexed owner, address indexed strongHand);
    
    mapping (address => address) public strongHands;
    
    function isGodlyChad() public view returns (bool) {return strongHands[msg.sender] != address(0);}
    
    function myGauntlet() external view returns (address) {  
        require(isGodlyChad(), "You are not a Godly Chad Investor!");
        return strongHands[msg.sender];
    }
    
    function create(uint256 _unlockAfterNDays) public {
        require(!isGodlyChad(), "You are already a Godly Chad Investor!");
        require(_unlockAfterNDays > 0);
        
        address owner = msg.sender;
        strongHands[owner] = new Gauntlet(owner, _unlockAfterNDays);
        emit CreatedGauntlet(owner, strongHands[owner]);
    }
}

contract Gauntlet {
    HourglassInterface constant B1VSContract = HourglassInterface(0x0c22C33eaEFC961Ed529a6Af4654B6c2f51c12D3);
    
    address public developer = 0xf2C579082fE10d57331d0Cd66843C4D6777eA48a;
    
    address public owner;
    uint256 public creationDate;
    uint256 public unlockAfterNDays;
    
    modifier timeLocked() {
        require(now >= creationDate + unlockAfterNDays * 1 days);
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor(address _owner, uint256 _unlockAfterNDays) public {
        owner = _owner;
        unlockAfterNDays =_unlockAfterNDays;
        creationDate = now;
    }
    
    function() public payable {}
    
    function isLocked() public view returns(bool) {return now < creationDate + unlockAfterNDays * 1 days;}
    function lockedUntil() external view returns(uint256) {return creationDate + unlockAfterNDays * 1 days;}
    
    function extendLock(uint256 _howManyDays) external onlyOwner {
        uint256 newLockTime = unlockAfterNDays + _howManyDays;
        require(newLockTime > unlockAfterNDays);
        unlockAfterNDays = newLockTime;
    }
    
    function withdraw() external onlyOwner {owner.transfer(address(this).balance);}
    function reinvest() external onlyOwner {B1VSContract.reinvest();}
    function transfer(address _toAddress, uint256 _amountOfTokens) external timeLocked onlyOwner returns(bool) {return B1VSContract.transfer(_toAddress, _amountOfTokens);}
    
    function buy() external payable onlyOwner {B1VSContract.buy.value(msg.value)(developer);}
    function buyWithBalance() external onlyOwner {B1VSContract.buy.value(address(this).balance)(developer);}

    function balanceOf() external view returns(uint256) {return B1VSContract.balanceOf(address(this));}
    function dividendsOf() external view returns(uint256) {return B1VSContract.myDividends(true);}
    
    function withdrawDividends() external onlyOwner {
        B1VSContract.withdraw();
        owner.transfer(address(this).balance);
    }
    
    function sell(uint256 _amount) external timeLocked onlyOwner {
        B1VSContract.sell(_amount);
        owner.transfer(address(this).balance);
    }
}