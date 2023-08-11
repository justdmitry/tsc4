import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Task5 } from '../wrappers/Task5';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

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

    it('for 50', async () => {
         var found = await task5.getFibonacciSequence(48n, 3n);
         console.log(48, found.readBigNumber());
         console.log(49, found.readBigNumber());
         console.log(50, found.readBigNumber());
    });

    it('for 100', async () => {
         var found = await task5.getFibonacciSequence(98n, 3n);
         console.log(98, found.readBigNumber());
         console.log(99, found.readBigNumber());
         console.log(100, found.readBigNumber());
    });

    it('for 150', async () => {
         var found = await task5.getFibonacciSequence(148n, 3n);
         console.log(148, found.readBigNumber());
         console.log(149, found.readBigNumber());
         console.log(150, found.readBigNumber());
    });

    it('for 200', async () => {
         var found = await task5.getFibonacciSequence(198n, 3n);
         console.log(198, found.readBigNumber());
         console.log(199, found.readBigNumber());
         console.log(200, found.readBigNumber());
    });

    it('for 250', async () => {
         var found = await task5.getFibonacciSequence(248n, 3n);
         console.log(248, found.readBigNumber());
         console.log(249, found.readBigNumber());
         console.log(250, found.readBigNumber());
    });

    it('for 300', async () => {
         var found = await task5.getFibonacciSequence(298n, 3n);
         console.log(298, found.readBigNumber());
         console.log(299, found.readBigNumber());
         console.log(300, found.readBigNumber());
    });

    it('for 350', async () => {
         var found = await task5.getFibonacciSequence(348n, 3n);
         console.log(348, found.readBigNumber());
         console.log(349, found.readBigNumber());
         console.log(350, found.readBigNumber());
    });

    it('check 201', async () => {
         var found = await task5.getFibonacciSequence(201n, 2n);
         console.log(201, found.readBigNumber());
    });
});
