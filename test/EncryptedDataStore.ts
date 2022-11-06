import { expect } from "chai";
import { ethers } from "hardhat";
import * as paillierBigint from 'paillier-bigint'

describe("EncryptedDataStore contract", function () {
    before(async () => {
        //
    })
    it("paillier-js test",async () => {
//         const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(3072)
//         const m1 = 12345678901234567890n
//         const m2 = 5n
        
//         // encryption/decryption
//         const c1 = publicKey.encrypt(m1)
//         console.log(c1);
//         console.log(privateKey.decrypt(c1)) // 12345678901234567890n
    })

    it("paillier-js to bytes test",async () => {
        const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(2048)
        const n2 = publicKey._n2.toString(16);
        const maxlen = 5;
        console.log(publicKey, privateKey);
        console.log(n2);
        let data = [0n,0n,0n,0n,1n];
        let cipher = []
        for(let i of data){
            let tmp = publicKey.encrypt(i).toString(16);
            if(tmp.length % 2 == 1){
                tmp = "0x0" + tmp;
            }else{tmp = "0x" + tmp}
            cipher.push(tmp)
        }
        console.log(cipher)

        const [owner, otherAccount] = await ethers.getSigners();
        const contract = await ethers.getContractFactory("EncryptedDataStore");
        const DataStore = await contract.deploy();

        let enc_zero = publicKey.encrypt(0n).toString(16);
        if(enc_zero.length % 2 == 1){
            enc_zero = "0x0" + enc_zero;
        }else{enc_zero = "0x" + enc_zero}
        await DataStore.connect(owner).initializeData(enc_zero, maxlen, otherAccount.getAddress());
        for(let i = 0; i<maxlen; i++){
            expect(await DataStore.userHistoryData(otherAccount.getAddress(), i)).to.equal(enc_zero);   
        }

        // await DataStore.appendData(cipher, "0x"+n2, maxlen, otherAccount.getAddress(), {gasLimit: 30000000})
        await DataStore.appendData(cipher, "0x"+n2, maxlen, otherAccount.getAddress());

        let tmp = await DataStore.userHistoryData(otherAccount.getAddress(), 0);
        expect(privateKey.decrypt(BigInt(tmp))).to.equal(0);
        tmp = await DataStore.userHistoryData(otherAccount.getAddress(), 4);
        expect(privateKey.decrypt(BigInt(tmp))).to.equal(1);
    })
});