import { ethers } from "hardhat";

async function main() {
  const mbti = await ethers.deployContract("MBTI", []);

  await mbti.waitForDeployment();

  console.log(`MBTI deployed to ${mbti.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
