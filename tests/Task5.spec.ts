import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Task5 } from '../wrappers/Task5';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';
import { fromCode } from 'tvm-disassembler';

describe('Task5', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task5');
    });

    let blockchain: Blockchain;
    let task5: SandboxContract<Task5>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task5 = blockchain.openContract(Task5.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task5.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task5.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and task5 are ready to use
    });

    it('disasm', async () => {
      let source = await fromCode(code);    
      console.log(source);
    });
    
    it('for 0/1...', async () => {
         var found = await task5.getFibonacciSequence(0n, 1n);
         expect(found.readBigNumber()).toBe(0n);
    });
    
    it('for 0/4...', async () => {
         var found = await task5.getFibonacciSequence(0n, 4n);
         expect(found.readBigNumber()).toBe(0n);
         expect(found.readBigNumber()).toBe(1n);
         expect(found.readBigNumber()).toBe(1n);
         expect(found.readBigNumber()).toBe(2n);
    });
    
    it('for 1/4...', async () => {
         var found = await task5.getFibonacciSequence(1n, 4n);
         expect(found.readBigNumber()).toBe(1n);
         expect(found.readBigNumber()).toBe(1n);
         expect(found.readBigNumber()).toBe(2n);
         expect(found.readBigNumber()).toBe(3n);
    });
    
    it('for 1/1...', async () => {
         var found = await task5.getFibonacciSequence(1n, 1n);
         expect(found.readBigNumber()).toBe(1n);
    });
    
    it('for 2/1...', async () => {
         var found = await task5.getFibonacciSequence(2n, 1n);
         expect(found.readBigNumber()).toBe(1n);
    });
    
    it('for 201/4...', async () => {
         var found = await task5.getFibonacciSequence(201n, 4n);
         expect(found.readBigNumber()).toBe(453973694165307953197296969697410619233826n);
         expect(found.readBigNumber()).toBe(734544867157818093234908902110449296423351n);
         expect(found.readBigNumber()).toBe(1188518561323126046432205871807859915657177n);
         expect(found.readBigNumber()).toBe(1923063428480944139667114773918309212080528n);
    });
    
    it('for 184/4...', async () => {
         var found = await task5.getFibonacciSequence(184n, 4n);
         expect(found.readBigNumber()).toBe(127127879743834334146972278486287885163n);
         expect(found.readBigNumber()).toBe(205697230343233228174223751303346572685n);
         expect(found.readBigNumber()).toBe(332825110087067562321196029789634457848n);
         expect(found.readBigNumber()).toBe(538522340430300790495419781092981030533n);
    });

});
