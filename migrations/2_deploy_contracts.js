var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var fit = artifacts.require("./FitCrypt.sol");
module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(fit);

};
