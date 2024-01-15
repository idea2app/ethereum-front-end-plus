import { chainList, defaultChainID } from './ChainInfo';

class MetaMask {
  constructor() {
    globalThis.window?.ethereum?.on('accountsChanged', this.switchDefaultChainAndReload);

    globalThis.window?.ethereum?.on('chainChanged', this.switchDefaultChainAndReload);
  }

  async connectWallet() {
    if (!window?.ethereum) throw new Error('MetaMask is not installed!');

    const [account] = (await window.ethereum.request({
      method: 'eth_requestAccounts',
    })) as string[];
    return account;
  }

  async switchChain(chainId: string) {
    try {
      await window?.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window?.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: chainList,
        });
      }
    }
  }

  switchDefaultChain = () => this.switchChain(defaultChainID);

  switchDefaultChainAndReload = async() => {
    await this.switchDefaultChain();
    location.reload();
  }
}

export default new MetaMask();
