# 第十七讲 课程总结

这个系列课程已经接近尾声了，这节课我们有的放矢，对这一系列课程进行总结，从厚到薄。

## 知识点回顾

### 区块链基础概念

这里我们对完成一个区块链应用的核心概念进行梳理：

- **去中心化应用（DApp）**：去中心化应用是在区块链上运行的应用程序，它们不受单一实体控制，而是通过智能合约和区块链网络来执行和存储代码。

- **哈希（Hash）**：哈希函数将输入数据转换为固定长度的字符串，这个过程在区块链中用于确保数据的完整性，并创建区块之间的链接。

- **帐户**：一个以太坊帐户是一个具有代币余额的实体，可以在以太坊上发送交易。帐户可以由用户控制（“外部拥有账户”，EOA，externally owned account，也被称为“原始账户”），也可以作为智能合约部署。

- **交易**：交易是由帐户发出，带密码学签名的指令。 帐户将发起交易以更新以太坊网络的状态。 最简单的交易是将代币从一个帐户转到另一个帐户。

- **区块**：区块是指一批交易的组合，并且包含上一个区块的哈希。 这将区块连接在一起（成为一个链），因为哈希是从区块数据中加密得出的。这可以防止欺诈，因为以前的任何区块中的任何改变都会使后续所有区块无效，而且所有哈希都会改变，所有运行区块链的人都会注意到。

- **节点**：任何以太坊客户端软件的实例，它连接到其他也运行以太坊软件的计算机，形成一个网络。

- **以太坊网络**：一组使用以太坊协议进行通信的互联计算机。 

- **主网**：主要的以太坊生态区块链，所有具有实际价值的交易都发生在该链的分散账本中。

- **测试网**：一个独立的区块链网络，用于开发和测试新的区块链功能、协议、智能合约、去中心化应用（DApps）以及加密货币。测试网允许开发者在主网（Mainnet）上线之前，对其进行彻底的测试，以确保系统的稳定性和安全性。

- **燃料（Gas）**： 是指在以太坊网络上执行特定操作所需的计算工作量。

- **代币（Token）**：是一种数字资产，它可以代表持有者对某些权益、服务或资产的所有权或使用权。它们可以在用户之间转移并在某些情况下用于支付或投资。以太坊的代币是以太币。

- **燃料费**：由于每笔以太坊交易都需要使用计算资源来执行，因此必须为这些资源付费，以确保以太坊不容易受到垃圾信息的攻击，并且不会陷入无限的计算循环。计算费用以燃料费的形式支付。

- **钱包（Wallet）**：一个用于存储和管理数字资产的软件应用程序。钱包通常与用户的私钥关联，私钥是用于验证和签名交易的唯一密钥，因此对资产的安全性至关重要。

### 以太币面额

|  单位  | 1 ether              |
| :----: | :------------------- |
|  wei   | 1<sup>18</sup> wei   |
|  kwei  | 1<sup>15</sup> kwei  |
|  mwei  | 1<sup>12</sup> mwei  |
|  gwei  | 1<sup>9</sup> gwei   |
| szabo  | 1<sup>6</sup> szabo  |
| finney | 1<sup>3</sup> finney |
| ether  | 1 ether              |

在以太坊系统中，以太通常以 wei 表示，这是以太的最小单位，不可再分。

Gwei（giga-wei 的缩写），常用于描述以太坊上的燃料费用。

### 和 MetaMask 钱包交互

MetaMask 浏览器拓展插件在页面的 `window` 对象上注入 `ethereum`。

`ethereum.request` 是一个通过 MetaMask 来进行 JSON-RPC API 请求提交的方法。`ethereum.request` 有一个参数，必须传递一个带有 `method` 属性的对象，根据 `method` 的不同，该对象需要有不同的 `params` 数组，其返回值也会根据 `method` 而不同。

```javascript
await window.ethereum.request({
  "method": "eth_requestAccounts",
  "params": []
});
```

| `method` | 功能 | `params` 参数 |
| :-- | :-- | :-- |
| `wallet_addEthereumChain` | 向 MataMask 添加网络 | 一个对象，对象有如下几个属性是必选： 表示链 ID 的 `chainId`；表示链名称的 `chainName`；表示代币信息的 `nativeCurrency` 对象，它由三个必选属性构成，`decimals`、`name` 和 `symbol`；与链通信的 rpc 节点数组 `rpcUrls`，至少需要一个元素。另外，表示链的 logo 的图标地址数组 `iconUrls` 和区块链浏览器地址数组 `blockExplorerUrls` 是可选的。|
| `wallet_switchEthereumChain` | 用于切换链 | 传入一个含有 `chainId` 的对象可以切换到指定链 |
| `wallet_requestPermissions` | 用于于授权 | 可不传参数 |
| `eth_accounts` | 获取当前 MetaMask 登录的账号地址 | 空数组 |
| `eth_requestAccounts` | 登录 | 空数组 |

MetaMask 还提供了事件监听，我们常监听的事件有 `accountsChanged`、`chainChanged` 和 `connect` 等。以 `accountsChanged` 为例，可以以下方式调用和移除：

```javaScript
function handleAccountsChanged(accounts) {
  // 事件触发后执行的代码
}

// 监听
window.ethereum.on('accountsChanged', handleAccountsChanged);


// 移除监听
window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
```

常见监听事件：

| 事件名 | 触发条件 | 回调函数参数 |
| :-- | :-- | :-- |
| `accountsChanged` | 账号登录状态改变后触发 | 一个数组，该数组内是目前登录的账号地址 | 
| `chainChanged` | 当前链改变后触发 | 当前链的 ID 的八进制字符串 |
| `connect` | 账号在当前网站链接网络后触发 | 一个含有网络 Id `chainId` 的对象 |

### 使用 ethers.js 和区块链交互

Provider 是一个提供了对区块链及其状态的只读访问的抽象类。

```javascript
const provider1 = new ethers.BrowserProvider(window.ethereum);
const provider2 = ethers.getDefaultProvider();
const provider3 = new ethers.JsonRpcProvider(url)
```

上面在三种 `provider`，分别来自 [`new BrowserProvider()`](https://docs.ethers.org/v6/api/providers/#BrowserProvider_new)、[getDefaultProvider()](https://docs.ethers.org/v6/api/providers/#getDefaultProvider) 和 [`new JsonRpcProvider()`](https://docs.ethers.org/v6/api/providers/jsonrpc/#JsonRpcProvider_new)，它们有较大差异，但都能对区块链的基本信息进行查询。例如：

```typescript
// 获取当前区块区块高度
const currentBlockNumber = provider.getBlockNumber();

// 获取当前连接网络
const network = provider.getNetwork();

// 获取指定账户上的余额
const balance = await provider.getBalance("ethers.eth");

// 获取指定账户交易数量
const transactionCount = await provider.getTransactionCount("ethers.eth");
```

如果需要查询其他内容，请参考其官方文档。

Signer 是一个可以使用私钥对消息和交易进行签名，授权网络向您的账户收取以太币以执行操作的抽象类，如果需要对区块链执行写操作必须使用 Signer，一般使用如下方法获得其实例：

```javascript
const signer = await provider.getSigner();
```

```javascript
// 获取当前账号的地址
const address = signer.getAddress()

const tx = await signer.sendTransaction({
  to: "ethers.eth",
  value: parseEther("0.1")
});

const receipt = await tx.wait();
```

`tx` 是一个 Transaction 实例，`receipt` 是一个 Receipt 实例。Transaction 是一个提供区块链交易信息查询的抽象类；交易在区块链上记录将产生收据，Receipt 是一个访问收据对象的抽象类。交易对象的 `wait` 方法执行完毕，交易执行完毕。

Contract 是一个与以太坊网络上特定合约连接的抽象类。

```javascript
const abi = [
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "function decimals() view returns (uint8)",
  "function transfer(address recipient, uint256 amount) returns (bool success)"
]

// 构建 Contract 实例
// 注意此处传入的是 Provider 实例，可以执行写操作；
//     反之如果传入 Signer 实例，则不能执行写操作；
const contract = new Contract(CONTRACT_ADDRESS, abi, provider);

// 执行只读函数，直接返回结果
const decimals = await contract.decimals();

// 换算获取 amount
const amount = parseUnits("1.0", 18);
// 执行写操作，返回交易对象
const tx = await contract.transfer(RECIPIENT_ADDRESS, amount);
// 等待交易执行完成
await tx.wait();
```

下面举一个监听区块链的例子：

```javascript
const abi = [
  "event Transfer(address indexed from, address indexed to, uint amount)"
]

contract = new Contract(CONTRACT_ADDRESS, abi, provider)

contract.on("Transfer", (from, to, _amount, event) => {
  console.log(`${ from } => ${ to }: ${ formatEther(_amount, 18) }`);

  console.log("event:", event)
});
```

## 项目回顾

我们从零到一完成了一个 MBTI 相关的区块链应用，并将其部署上线。很多代码上的实践未必是“最佳实践”，但希望这个应用能向大家说明如何和合约交互并通过目前主流的 SaaS 方案部署项目。视频中的代码和代码仓库的代码略有不同，考虑到视频难免疏漏，且无法实时更新，所以请以代码仓库中的为准。

## 资料推荐

这一系列课程，只能是一个开始，还有诸多内容尚未涉及或者尚不深入，这里罗列了一些资料可供大家继续学习相关内容：

- [以太坊官网](https://ethereum.org/zh)
- [MetaMask 开发者文档](https://docs.metamask.io/)
- [ethers v6 文档](https://docs.ethers.org/v6/)
- [《精通以太坊》](https://github.com/ethereumbook/ethereumbook)

我们从前端视角揭开了区块链神秘的面纱，了解了如何使用智能合约和去中心化应用（DApp）改变传统的前端交互方式。这不是终点而是起点，希望大家能利用区块链技术开发出自己心仪的产品。
