const hre = require("hardhat");

async function main() {
  const LandRegistry = await hre.ethers.getContractFactory("LandRegistry");
  const landRegistry = await LandRegistry.deploy();

  await landRegistry.deployed();

  console.log("LandRegistry deployed to:", landRegistry.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  //deploy