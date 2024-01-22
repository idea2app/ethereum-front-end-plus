# 第十讲 MetaMask 网络验证

前面我们前面完成了登录功能，并且为其添加了切换账号自动刷新页面和刷新页面后自动获取当前连接账号的功能。本节内容将和大家一起开发 MetaMask 网络验证相关功能。

## 需求分析

在本项目中，合约只部署在一条链上，当我们连接钱包后，当前的网络如果不是我们部署合约的网络，与区块链交互就会发生异常。为了解决这个问题，可以在连接钱包、切换网络后进行验证，若当前网络不是部署合约的网络，则提示切换至部署合约的网络，若该网络未添加到 MetaMask 则提示确认添加并切换。

如果我们对整个流程进行梳理，不难发现，其实可以直接切换网络，不必要提前检查，无论是否连接目标网络，我们只要求切换后连接的是目标网络即可。

## 要点回顾

`wallet_addEthereumChain` 用来向 MataMask 添加网络，其 `params` 的参数为一个对象，对象有如下几个属性是必选： 表示链 ID 的 `chainId`；表示链名称的 `chainName`；表示代币信息的 `nativeCurrency` 对象，它由三个必选属性构成，`decimals`、`name` 和 `symbol`；与链通信的 rpc 节点数组 `rpcUrls`，至少需要一个元素。另外，表示链的 logo 的图标地址数组 `iconUrls` 和区块链浏览器地址数组 `blockExplorerUrls` 是可选的，例如：

```ts
window.ethereum.request({
  method: "wallet_addEthereumChain",
  params: [
    {
      chainId: "0x64",
      chainName: "Gnosis",
      rpcUrls: ["https://rpc.ankr.com/gnosis"],
      iconUrls: [
        "https://xdaichain.com/fake/example/url/xdai.svg",
        "https://xdaichain.com/fake/example/url/xdai.png",
      ],
      nativeCurrency: {
        name: "xDAI",
        symbol: "xDAI",
        decimals: 18,
      },
      blockExplorerUrls: ["https://blockscout.com/poa/xdai/"],
    },
  ],
});
```

`wallet_switchEthereumChain` 方法用于切换链，通过在 `params` 传入一个含有 `chainId` 的对象可以切换到指定链。

MetaMask 还提供了事件监听，`chainChanged` 事件在当前链改变后触发，回调函数参数是当前链的 ID 的八进制字符串；`connect` 事件在账号在当前网站链接网络后触发，回调函数是一个含有网络 Id `chainId` 的对象。

## 功能编写

因为新安装的 MetaMask 默认已经添加“Sepolia 测试网络”并且锁死，不能进行任何编辑，所以这部分先以“Binance Smart Chain Testnet”为例，进行相关功能的测试，后面再替换成“Sepolia 测试网络”。

我们先在 `/src/models` 文件夹下创建一个 `ChainInfo.ts` 的文件，在里面添加“Binance Smart Chain Testnet”相关信息：

```ts
export const defaultChainInfo = {
  chainId: "0x61",
  chainName: "Binance Smart Chain Testnet",
  nativeCurrency: {
    name: "Binance Chain Native Token",
    symbol: "tBNB",
    decimals: 18,
  },
  rpcUrls: ["https://bsc-testnet.publicnode.com"],
  blockExplorerUrls: ["https://testnet.bscscan.com"],
};
```

接下来，我们在 `/src/models/MetaMask.ts` 编写切换网络相关的功能，我们为 `MetaMask` 类添加一个 `switchChain` 方法：

```ts
class MetaMask {
  // ...

  async switchChain(chainId: string) {
    await window?.ethereum?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  }
}

export default new MetaMask();
```

为了比较好的拓展性，我们将目标网络 ID 通过函数参数传递，而不写成固定值。我们利用“退出”按钮，来测试这个方法，在 `/src/app/page.tsx` 中改写部分代码：

```tsx
// ...
      <LoginLogout address={userAddress} onLogin={onLogin} onLogout={() => metaMaskStore.switchChain('0x61')} />
// ...
```

我们在预览页面，连接钱包后，点击“退出”按钮，会发现控制台报错：`VM1133:1 MetaMask - RPC Error: Unrecognized chain ID "0x61". Try adding the chain using wallet_addEthereumChain first. `，这个错误的 `code` 是 `4902`。由此不难知道，当调用 `wallet_switchEthereumChain` 切换网络时，如果目标网络未添加到钱包，就会报 `code` 为 `4902` 的异常。如果未报异常，可能之前钱包已经添加了该网络。

为了使应用更易用，在报 `code` 为 `4902` 的异常时，程序自动提示应用添加网络，在 `/src/models/MetaMask.ts` 对 `switchChain` 方法进行改造：

```ts
// ...
  async switchChain(chainInfo: Record<string, unknown>) {
    try {
      await window?.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainInfo.chainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902)
        window?.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [chainInfo],
        });
    }
  }
// ...
```

再次登录，并点击“退出”按钮验证，发现弹出弹框，提示添加网络，点击“批准”，又提示是否切换网络，点击“切换网络”，此时钱包已经切换至目标网络。

我们希望在连接钱包和切换网络时都切换至目标链，避免连接非目标网络发生异常。在 `/src/app/MetaMask.ts` 文件中为 `MetaMask` 新增一个方法 `switchDefaultChain`：

```ts
import { chainList, defaultChainID } from './ChainInfo';

class MetaMask {
  // ...

  switchDefaultChain = () =>
    this.switchChain(defaultChainInfo);
}

export default new MetaMask();
```

在连接钱包和切换网络对应事件，调用切换网络方法，在 `/src/app/MetaMask.ts` 中修改构造函数，`accountsChanged` 和 `chainChanged` 可以进行连接钱包和切换网络事件监听，这两个事件监听的回调函数内容相同，所以这里抽离出一个新方法 `switchDefaultChainAndReload`，在回调函数处调用：

```ts
import { chainList, defaultChainID } from './ChainInfo';

class MetaMask {
  constructor() {
    globalThis.window?.ethereum?.on('accountsChanged', this.switchDefaultChainAndReload);

    globalThis.window?.ethereum?.on('chainChanged', this.switchDefaultChainAndReload);
  }

  // ...

  switchDefaultChainAndReload = async() => {
    await this.switchDefaultChain();
    location.reload();
  }
}

// ...
```

可以在预览页面进行测试，切换网络和在未连接目标网络时登录都会提示切换网络，如果钱包未添加目标网络，也会提示添加目标网络并切换至目标网络。

本节内容的基本功能就完成了，我们将 `/src/app/page.tsx` 还原：

```tsx
// ...
      <LoginLogout address={userAddress} onLogin={onLogin} />
// ...
```

将 `/src/models/ChainInfo.ts` 的内容替换成“Sepolia 测试网络”：

```ts
export const defaultChainInfo = {
  chainId: '0xaa36a7',
  chainName: 'Sepolia测试网络',
  nativeCurrency: {
    name: 'Sepolia Ether',
    symbol: 'SepoliaETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.infura.io/v3/'],
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
};
```

在预览页面进行验证，看是否目标网络指向“Sepolia测试网络”。

至此，我们完成了网络切换相关功能。
