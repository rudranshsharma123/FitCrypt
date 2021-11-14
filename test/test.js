const { assert } = require('chai');


const FitCrypt = artifacts.require('./FitCrypt.sol')
// import {"chai-as-promised"} from './chai';


require('chai')
    .use(require('chai-as-promised'))
    .should()
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
// import * as chai from 'chai'
// import chaiAsPromised from 'chai-as-promised'
// chai.use(chaiAsPromised)

contract('FitCrypt', ([deployer, author, tipper]) => {
    let fitcrypt

    before(async () => {
        fitcrypt = await FitCrypt.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await fitcrypt.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await fitcrypt.name()
            assert.equal(name, 'FitCrypt')
        })
    })




    describe('images', async () => {
        let result, imageCount;
        let hash = "lol";
        before(async () => {
            result = await fitcrypt.uploadImage(hash, "Image Desc", { from: author })
            imageCount = await fitcrypt.imageCount()
        })

        it('creates images', async () => {
            assert.equal(imageCount, 1);
            const event = result.logs[0].args;
            // console.log(result.);
            // console.log(event);
            assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct');
            assert.equal(event.hashOfImage, hash, 'hash is correct');
            assert.equal(event.description, "Image Desc", 'description is correct');
            assert.equal(event.author, author, 'author is correct');
            assert.equal(event.tipAmount, '0', 'tip amount is correct');
            // Should Fail because empty hash
            await fitcrypt.uploadImage("", "Image Desc", { from: author }).should.be.rejected;
            // // Should ?Fail because empty description
            await fitcrypt.uploadImage(hash, "", { from: author }).should.be.rejected;
            // // Should Fail because empty author
            await fitcrypt.uploadImage(hash, "Image Desc", { from: "" }).should.be.rejected;

        }
        );
        // Test to see if the Struct is correctly storing the data on the bloackchain
        it('lists images', async () => {
            const image = await fitcrypt.images(imageCount)
            assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct');
            assert.equal(image.hashOfImage, hash, 'hash is correct');
            assert.equal(image.description, "Image Desc", 'description is correct');
            assert.equal(image.author, author, 'author is correct');
            assert.equal(image.tipAmount, '0', 'tip amount is correct');
        })

        it('allows users to tip', async () => {
            let oldAuthorBalance;
            let result;
            oldAuthorBalance = await web3.eth.getBalance(author);
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);

            result = await fitcrypt.tipTheImage(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') });
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct');
            assert.equal(event.hashOfImage, hash, 'hash is correct');
            assert.equal(event.description, "Image Desc", 'description is correct');
            assert.equal(event.author, author, 'author is correct');
            assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct');

            let newAuthorBalance;
            newAuthorBalance = await web3.eth.getBalance(author);
            newAuthorBalance = new web3.utils.BN(newAuthorBalance);

            // The tip should increase the balance of the author
            assert.equal(newAuthorBalance.toString(), oldAuthorBalance.add(new web3.utils.BN(web3.utils.toWei('1', 'Ether'))).toString());


            // Should Fail because wrong imagg ID
            await fitcrypt.tipTheImage(99, { from: tipper, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;


        })
    })
});