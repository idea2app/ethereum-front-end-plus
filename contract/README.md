# MBTI 合约说明

## ABI
```json
[
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "mbtiType",
        type: "int256",
      },
    ],
    name: "MBTIUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "int8",
        name: "mbtiType",
        type: "int8",
      },
    ],
    name: "claimMBTI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getMBTI",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyMBTI",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "sendContractBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int8",
        name: "mbtiType",
        type: "int8",
      },
    ],
    name: "updateMBTI",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
]
```

## 使用

**涉及 hardhat，推荐使用 bash**

### 环境初始化
最好使用 `yarn` 或 `npm`，目前 hardhat 对 `pnpm` 支持有限

```bash
cd contract
yarn
```

### 使用 remix 进行本地测试
```bash
cd contract
yarn
npx hardhat node
```

另起一个命令行窗口，下面命令在执行时将 `<absolute-path-to-the-shared-folder>` 替换为 `contract` 目录的绝对路径。

```bash
npm install -g @remix-project/remixd
remixd -s <absolute-path-to-the-shared-folder> --remix-ide https://remix.ethereum.org
```

在 [Remix](https://remix.ethereum.org/) 的 `文件浏览器` 插件，`工作空间` 选择 `连接到 localhost`；`部署 & 发交易` 插件，环境选择 `Dev - HardHat Provider`。

## 其他 hardhat 命令

```bash
cd contract

# 编译
npx harrdhat compile

# 清除缓存
npx harrdhat clean

# 启用本地模拟链
npx harrdhat node
```
