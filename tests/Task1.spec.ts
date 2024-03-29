import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { beginCell, Cell, toNano } from 'ton-core';
import { Task1 } from '../wrappers/Task1';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';
import { fromCode } from 'tvm-disassembler';

describe('Task1', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task1');
    });

    let blockchain: Blockchain;
    let task1: SandboxContract<Task1>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task1 = blockchain.openContract(Task1.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task1.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task1.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and task1 are ready to use
    });

    it('should work', async () => {
      var tree = beginCell().storeUint(123, 32).storeUint(456, 32).endCell();
      var found = await task1.getFindBranchByHash(123n, tree);
    });

    it('disasm', async () => {
      let source = await fromCode(code);    
      console.log(source);
    });
});
