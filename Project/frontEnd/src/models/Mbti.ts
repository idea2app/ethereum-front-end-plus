import { EventLog, parseEther } from 'ethers';

import { abiAndAddress } from './AbiAndAddress';
import metaMaskStore from './MetaMask';

class Mbti {
  async claimMBTI(value: number) {
    const mbtiContract = await metaMaskStore.getDaiContractWithSigner(abiAndAddress.mbti);

    return mbtiContract.claimMBTI(value);
  }

  async getMyMBTI() {
    const mbtiContract = await metaMaskStore.getDaiContractWithSigner(abiAndAddress.mbti);

    return mbtiContract.getMyMBTI();
  }

  async updateMBTI(mbti: number) {
    const mbtiContract = await metaMaskStore.getDaiContractWithSigner(abiAndAddress.mbti);

    return mbtiContract.updateMBTI(mbti, { value: parseEther("0.001") });
  }

  async destroyMBTI() {
    const mbtiContract = await metaMaskStore.getDaiContractWithSigner(abiAndAddress.mbti);

    return mbtiContract.destroyMBTI({ value: parseEther("0.001") });
  }

  async getRecord(address: string) {
    const contract = await metaMaskStore.getDaiContract(abiAndAddress.mbti);

    const filter = await contract.filters.MBTIUpdated(address);
    const eventLogs = await contract.queryFilter(filter) as EventLog[];

    return eventLogs.map(({ args }) => Number((args[1] as BigInt).toString()))
      .filter(item => item >= 0)
  }
}

export default new Mbti();