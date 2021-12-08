// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const IBCId = await hre.ethers.getContractFactory("IBCIdentifier");
  const ibcid = await IBCId.deploy()

  const IBCclient = await hre.ethers.getContractFactory("IBCClient");
  const IBCclientContract = await IBCclient.deploy()

  const IBCConnection = await hre.ethers.getContractFactory("IBCConnection", {
    libraries: {
      IBCClient : IBCclientContract.address
    }
  });
  const IBCconnectionContract = await IBCConnection.deploy()

  const IBCchannel = await hre.ethers.getContractFactory("IBCChannel", {
    libraries: {
      IBCClient : IBCclientContract.address,
      IBCConnection: IBCconnectionContract.address
    }
  });
  const IBCChannelContract = await IBCchannel.deploy();


  const IBCHost = await hre.ethers.getContractFactory("IBCHost", {
    libraries : {
      IBCIdentifier : ibcid.address
    }
  });
  const IBCHandler = await hre.ethers.getContractFactory("IBCHandler", {
    libraries: {
      IBCChannel : IBCChannelContract.address,
      IBCClient : IBCclientContract.address,
      IBCConnection: IBCconnectionContract.address,
      IBCIdentifier: ibcid.address
    }
  });
  
  const hostContract = await IBCHost.deploy()
  const handler = await IBCHandler.deploy(hostContract.address)

  console.log("Handler deployed to:", handler.address);
  console.log("Host deployed to:", hostContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
