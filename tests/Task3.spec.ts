import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano, beginCell } from 'ton-core';
import { Task3 } from '../wrappers/Task3';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task3', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task3');
    });

    let blockchain: Blockchain;
    let task3: SandboxContract<Task3>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task3 = blockchain.openContract(Task3.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task3.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task3.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to use
    });

    it('should run 1', async () => {
         var cells = beginCell().storeInt(8, 64).storeInt(2184, 128).endCell();
         var found = await task3.getFindAndReplace(8n, 9n, cells);
    });

    it('should run 2', async () => {
         var cells = beginCell().storeInt(8, 64).storeInt(2184, 128).storeInt(2, 4).storeRef(beginCell().storeInt(0, 100).endCell()).endCell();
         var found = await task3.getFindAndReplace(8n, 31n, cells);
    });

    it('should run 3', async () => {
         var cells = beginCell()
                       .storeInt(-1, 256).storeInt(-1, 256).storeInt(-1, 256).storeInt(-1, 255)
                       .storeRef(beginCell()
                                   .storeInt(-1, 256).storeInt(-1, 256).storeInt(-1, 256).storeInt(-1, 255)
                                   .storeRef(beginCell().storeInt(-1, 256).storeInt(-1, 256).storeInt(-1, 256).storeInt(-1, 255).endCell())
                                   .endCell())
                       .endCell();
         var found = await task3.getFindAndReplace(1n, 4n, cells);
    });

    it('should run 4', async () => {
         var cells = beginCell()
                       .storeInt(-1, 256).storeInt(0, 256).storeInt(-1, 256).storeInt(0, 244).storeUint(1291, 11)
                       .storeRef(beginCell()
                                   .storeUint(10815, 14).storeInt(0, 256).storeInt(-1, 256).storeInt(0, 255)
                                   //.storeRef(beginCell().storeInt(-1, 256).storeInt(-1, 256).storeInt(-1, 256).storeInt(-1, 255).endCell())
                                   .endCell())
                       .endCell();
         console.log(cells.toString());
         var found = await task3.getFindAndReplace(373n, 511n, cells);
         console.log(found.toString());
    });
});
