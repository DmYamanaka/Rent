const Migrations = artifacts.require("Migrations");
const FreeRealEstate = artifacts.require("Arenda");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(FreeRealEstate);
};
