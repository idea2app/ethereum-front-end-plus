import { abiAndAddress } from './AbiAndAddress';
import metaMaskStore from './MetaMask';

class Mbti {
  async claimMBTI(value: number){
    const mbtiContract = await metaMaskStore.getDaiContractWithSigner(abiAndAddress.mbti);

    return mbtiContract.claimMBTI(value);
  }
}

export default new Mbti();