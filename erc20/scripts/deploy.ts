import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("FiaTok", ["0x2334439568dBAb740e460A2bb38C85d7EBe28A4F"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});