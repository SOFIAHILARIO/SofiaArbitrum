// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FiaTok is ERC20, Ownable {

    mapping(address => uint256) private customStakes;
    mapping(address => uint256) private customstakeTimestamps;
    uint256 private _rewardRate = 5;
    uint256 private lockInPeriod = 60;

    constructor(address initialOwner) 
        ERC20("FiaTok", "FIA") 
        Ownable(initialOwner)
    {}

    function minthere(address to, uint256 amount) public {
        uint256 customAmount = amount * 1e18;
        _mint(to, customAmount);
    }

    function stakehere(uint256 amount) public {
        uint256 customAmount = amount * 1e18;

        require(customAmount > 0, "Staking is not possible with zero tokens");
        require(balanceOf(msg.sender) >= customAmount, "The balance is below the required amount");

        customStakes[msg.sender] += customAmount;
        customstakeTimestamps[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), customAmount);
  }

    function getStake(address account) public view returns (uint256) {
        uint256 stakedInWei = customStakes[account];
        uint256 stakedInEth = stakedInWei / 1e18;
        return stakedInEth;
  }

    function withdrawhere() public {
        require(block.timestamp > (customstakeTimestamps[msg.sender] + lockInPeriod), "It is not allowed to access or retrieve funds while still within the stipulated lock-in period");
        require(customStakes[msg.sender] > 0, "No tokens have been placed in the staking process");

        uint256 stakedAmount = customStakes[msg.sender];
        uint256 reward = ((block.timestamp - customstakeTimestamps[msg.sender]) * _rewardRate) * 1e18;

        customStakes[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);
  }

    function getWithdrawHere(address account) public view returns (uint256) {
        uint256 stakedAmount = customStakes[msg.sender] / 1e18;
        uint256 reward = ((block.timestamp - customstakeTimestamps[account]) * _rewardRate);

        uint256 total = reward + stakedAmount; 
        return total;
  }

     function getElapsedStakeTime(address account) public view returns (uint256) {
        uint256 time = (block.timestamp - customstakeTimestamps[account]);
        return time;
  } 

    function getcustomstakeTimestamps(address account) public view returns (uint256) {
        return customstakeTimestamps[account];
  }
 
}