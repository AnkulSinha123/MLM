const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('AddressStorage Contract', function () {
  let addressStorage;
  let owner;

  beforeEach(async function () {
    const AddressStorage = await ethers.getContractFactory('AddressStorage');
    addressStorage = await AddressStorage.deploy();
    await addressStorage.deployed();

    [owner] = await ethers.getSigners();
  });

  it('should add a user and emit UserAdded event', async function () {
    const userAddress = owner.address;

    const tx = await addressStorage.addUser();
    await tx.wait();

    const users = await addressStorage.getUsers();

    expect(users.length).to.equal(1);
    expect(users[0]).to.equal(userAddress);

    const events = await addressStorage.queryFilter('UserAdded');
    expect(events.length).to.equal(1);
    expect(events[0].args.user).to.equal(userAddress);
  });

  it('should not allow adding the same user twice', async function () {
    const userAddress = owner.address;

    await addressStorage.addUser();

    await expect(addressStorage.addUser()).to.be.revertedWith('User already exists');
  });

  it('should return an empty array if no users are added', async function () {
    const users = await addressStorage.getUsers();

    expect(users.length).to.equal(0);
  });
});
