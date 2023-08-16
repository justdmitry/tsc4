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

    it('for 32/64...', async () => {
    return;
         var found = await task5.getFibonacciSequence(30n, 3n);
         console.log(30, found.readBigNumber());
         console.log(31, found.readBigNumber());
         console.log(32, found.readBigNumber());

         found = await task5.getFibonacciSequence(62n, 3n);
         console.log(62, found.readBigNumber());
         console.log(63, found.readBigNumber());
         console.log(64, found.readBigNumber());

         found = await task5.getFibonacciSequence(94n, 3n);
         console.log(94, found.readBigNumber());
         console.log(95, found.readBigNumber());
         console.log(96, found.readBigNumber());

         found = await task5.getFibonacciSequence(126n, 3n);
         console.log(126, found.readBigNumber());
         console.log(127, found.readBigNumber());
         console.log(128, found.readBigNumber());

         found = await task5.getFibonacciSequence(158n, 3n);
         console.log(158, found.readBigNumber());
         console.log(159, found.readBigNumber());
         console.log(160, found.readBigNumber());

         found = await task5.getFibonacciSequence(190n, 3n);
         console.log(190, found.readBigNumber());
         console.log(191, found.readBigNumber());
         console.log(192, found.readBigNumber());

         found = await task5.getFibonacciSequence(222n, 3n);
         console.log(222, found.readBigNumber());
         console.log(223, found.readBigNumber());
         console.log(224, found.readBigNumber());

         found = await task5.getFibonacciSequence(254n, 3n);
         console.log(254, found.readBigNumber());
         console.log(255, found.readBigNumber());
         console.log(256, found.readBigNumber());

         found = await task5.getFibonacciSequence(286n, 3n);
         console.log(286, found.readBigNumber());
         console.log(287, found.readBigNumber());
         console.log(288, found.readBigNumber());

         found = await task5.getFibonacciSequence(318n, 3n);
         console.log(318, found.readBigNumber());
         console.log(319, found.readBigNumber());
         console.log(320, found.readBigNumber());

         found = await task5.getFibonacciSequence(350n, 3n);
         console.log(350, found.readBigNumber());
         console.log(351, found.readBigNumber());
         console.log(352, found.readBigNumber());

    });
});
