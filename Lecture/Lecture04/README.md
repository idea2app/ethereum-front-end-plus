# 第四讲 使用 ethers.js 和区块链交互（上）

前面我们了解了通过代码操作 MetaMask，虽然能和区块链进行交互，但是受限于 MetaMask 的设计，我们需要更强大和方便的方式（库）。目前常用于此工作的工具有 [Web3.js](https://web3js.org/)、[ethers.js](https://docs.ethers.org/v6/)、[Web3-wrapper](https://github.com/0xProject/tools/tree/main/web3-wrapper)、[Alchemyweb3](https://www.npmjs.com/package/@alch/alchemy-web3) 和 [viem](https://viem.sh/) 等……

综合各种因素，目前计划采用 ethers.js 来进行相关开发，不同库之间有较大差异，请在具体编码过程中注意。ethers.js v6 和 v5 存在较大差异，如无特殊说明后续皆采用 v6 版本。

我们先了解一下 ethers.js 中提供的 Provider、Signer、Transaction、Contract 和 Receipt 等几个类。Provider 是一个提供了对区块链及其状态的只读访问的抽象类；Signer 是一个可以使用私钥对消息和交易进行签名，授权网络向您的账户收取以太币以执行操作的抽象类；Contract 是一个与以太坊网络上特定合约连接的抽象类；Transaction 是一个提供区块链交易信息查询的抽象类；交易在区块链上记录将产生收据，Receipt 是一个访问收据对象的抽象类。

这里介绍几种 ethers.js 的安装和引入方法。

浏览器直接引入 ESM：

```html
<script type="module">
  import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
  // Your code here...
</script>
```

如果采用包管理器安装，需要先在项目根目录执行 `npm install ethers`（如果需要采用其他包管理器安装请自行选择合适的命令），再在需要的地方引入：

```javaScript
// 完整引入
import { ethers } from "ethers";

// 部分引入
import { BrowserProvider, parseUnits } from "ethers";

// 按需引入
import { HDNodeWallet } from "ethers/wallet";
```

如果需要使用 ethers.js 和区块链进行交互，必须要构建一个 Provider 的实例，接下来介绍两种方案：

最简单的方案是使用 MetaMask 等浏览器插件挂载到 windows 对象上的 Eip1193Provider 实例：

```javaScript
import { ethers } from "ethers";

const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : ethers.getDefaultProvider();
```

如果需要在非浏览器环境下运行等情况，常常使用第三方服务（如 INFURA）申请的 `url` 来生成：

```javaScript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(url);
```

注意这上面两种方法中存在三种 `provider`，分别来自 [`new BrowserProvider()`](https://docs.ethers.org/v6/api/providers/#BrowserProvider_new)、[getDefaultProvider()](https://docs.ethers.org/v6/api/providers/#getDefaultProvider) 和 [`new JsonRpcProvider()`](https://docs.ethers.org/v6/api/providers/jsonrpc/#JsonRpcProvider_new)，它们有较大差异，但都能对区块链的基本信息进行查询。

https://docs.ethers.org/v6/api/providers/#Provider 提供了相关文档，详情请参考文档，这里试举几例：

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

注意：上面的 `ethers.eth` 是由 [ENS](https://ens.domains/) 提供的去中心化的域名，在这里该域名和特定的以太坊账号地址绑定，另外此服务还提供网站和其他内容的去中心化域名服务。

前面我们介绍过，Signer 是一个可以使用私钥对消息和交易进行签名，授权网络向您的账户收取以太币以执行操作的抽象类，如果需要对区块链执行**写**操作必须使用 **Signer**，一般使用如下方法获得其实例：

```javaScript
const signer = await provider.getSigner();
```

在上面介绍的获取 Provider 实例的方法中，由 `getDefaultProvider()` 生成的 `provider` 只能执行**只读**处理，所以无法执行 `getSigner()` 方法。Signer 实例可以直接查询当前账号的相关信息，试举一例：

```javaScript
// 获取当前账号的地址
const address = signer.getAddress()
```

Signer 实例也可以直接向指定地址转账，这里试向 `ethers.eth` 转 0.1 eth：

```javaScript
const tx = await signer.sendTransaction({
  to: "ethers.eth",
  value: parseEther("0.1")
});

const receipt = await tx.wait();
```

除了转账外，在区块链上的另一大**写**操作是**约合调用**。在分享**合约调用**之前，我们先分享一个与合约相关的内容——**ABI**。

应用程序二进制接口（Application Binary Interface，ABI）是两个程序模块之间的接口，通常这两个模块一个在机器代码（二进制）级别，另一个在程序级别。通过此接口，可以更方便地调用底层函数。下面有两个 ABI 是同一接口（该接口截取自 [ERC-20 标准](https://eips.ethereum.org/EIPS/eip-20)）的两种形式：

JSON 解析（Parsed JSON）形式：

```json
[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "recipient", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

人可读（Human-Readable）形式：

```json
[
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "function decimals() view returns (uint8)",
  "function transfer(address recipient, uint256 amount) returns (bool success)"
]
```

上面的 ABI 描述了三个接口，1 个事件（`event`）和 2 个函数（`function`）。事件名为 `Approval`，事件发生时会依次传递三个参数：`address` 类型的 `owner`，`address` 类型的 `spender`，`uint256` 类型的 `value`。2 个函数分别为 `decimals` 和 `transfer`，调用 `decimals` 函数时无需传入参数，返回一个 `uint8` l 类型的数据，因为其带有 `view` 的标记，所以该函数是只读函数，调用时无需签名或登录。`transfer` 函数需传入 `address` 类型的 `recipient` 和 `uint256` 类型的 `amount`，返回 `bool` 类型的 `success`，因为其在 JSON 解析形 00000 式中标注 `nonpayable` 或在人可读形式中参数和 `returns` 之间没有特殊标记。

ABI 详细内容可参考 https://docs.soliditylang.org/zh/latest/abi-spec.html ，这里只对部分内容进行说明。ABI 一般由数组组成，每一个元素代表一个函数、事件或错误，我们常见的是函数和事件。人可读形式元素一般形如 `类型 名称(参数类型1 参数名1, ...) 标记 returns (返回值类型1 返回值名1, ...)`，类型一般是 `event`（事件）和 `function`（函数），名称即为函数名或事件名，常见标记 `view`。在 JSON 解析形式中，`type` 表示类型，`name` 表示名称，`stateMutability` 表示标记，`inputs` 和 `outputs` 分别表示参数和返回值。标记表示函数的类型，标记了 `view` 的函数只执行读操作，标记了 `nonpayable` 的函数执行时不能附带向合约账户转账操作，标记了 `payable` 的函数执行可以向合约账户转账。

ABI 常用来描述部署在区块链系统中的合约的接口，以方便上层应用调用。一个合约一般对外暴露若干事件和函数，而一个区块链应用可以有一个或多个合约。合约中的函数主要用于触发区块链上读或者写的操作，以完成自身业务；而合约中的事件会在执行合约中某些函数时触发，以对外广播信息，也可以用作信息记录。

如果需要执行合约，需要先构造合约实例：

```javaScript
const contract = new Contract(CONTRACT_ADDRESS, ABI, provider);
```

要得到 `Contract` 实例，需要在构造函数依次传入部署合约的地址（合约账户地址）、ABI 和 Provider 实例，因为这里传入的是 Provider 实例，不能执行写相关的操作，如果有相关需求需要传入 Signer 实例。

```javaScript
const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);
```

得到 Contract 实例后即可执行相关合约方法，这里举一个相对完整的例子：

```javaScript
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

至此我们介绍完了 ethers.js 调用合约函数的基本操作，在下一节将更深入上面的代码。
