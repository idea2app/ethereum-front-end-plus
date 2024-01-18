import { parseEther } from 'ethers';

import { abiAndAddress } from './AbiAndAddress';
import metaMaskStore from './MetaMask';

class Mbti {
  async claimMBTI(value: number){
    const mbtiContract = await metaMaskStore.getDaiContractWithSigner(abiAndAddress.mbti);

    return mbtiContract.claimMBTI(value);
  }

  async getMyMBTI() {
    const mbtiContract = await metaMaskStore.getDaiContractWithSigner(abiAndAddress.mbti);

    return mbtiContract.getMyMBTI();
  }

  async updateMBTI(mbti: number) {
    const mbtiContract = await metaMaskStore.getDaiContractWithSigner(abiAndAddress.mbti);

    return mbtiContract.updateMBTI(mbti, {value: parseEther("0.001")});
  }

  async destroyMBTI() {
    const mbtiContract = await metaMaskStore.getDaiContractWithSigner(abiAndAddress.mbti);

    return mbtiContract.destroyMBTI({value: parseEther("0.001")});
  }
}

export default new Mbti();