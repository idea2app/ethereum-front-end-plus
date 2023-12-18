# 第五讲 使用 ethers.js 和区块链交互（下）

前面介绍了使用 ethers.js 调用合约的基本方法。我们先回顾一下相对完整的流程：

```javaScript
const abi = [
  "function decimals() view returns (uint8)",
  "function transfer(address recipient, uint256 amount) returns (bool success)"
]

const contract = new Contract(CONTRACT_ADDRESS, abi, provider);

const decimals = await contract.decimals();

const amount = parseUnits("1.0", 18);
const tx = await contract.transfer(RECIPIENT_ADDRESS, amount);
await tx.wait();
```

我们会发现，`view` 标识的函数可以直接调用获得结果，而需要在区块链上写数据的函数如 `contract.transfer()` 执行后会返回一个 [`ContractTransactionResponse` 类](https://docs.ethers.org/v6/api/contract/#ContractTransactionResponse) 的实例，需要调用该实例上的 `wait` 方法，该方法会返回 [`ContractTransactionReceipt` 类](https://docs.ethers.org/v6/api/contract/#ContractTransactionReceipt) 实例（即前面介绍的 Receipt 类的实例），等到上面 2 个函数（方法）执行完即该合约函数执行完，需要注意在此情况下很难直接获取该函数的返回值，可以通过事件或者其他 `view` 函数来查询相关数据。

那么，如何订阅事件？请看下面的示例：

```javaScript
const abi = [
  "event Transfer(address indexed from, address indexed to, uint amount)"
]

contract = new Contract(CONTRACT_ADDRESS, abi, provider)

contract.on("Transfer", (from, to, _amount, event) => {
  console.log(`${ from } => ${ to }: ${ formatEther(_amount, 18) }`);

  console.log("event:", event)
});
```

我们可以看到，可以通过 Contract 实例上的 [`on()`](https://docs.ethers.org/v6/api/contract/#BaseContract-on) 方法来监听，该方法可以传入两个参数，第一个参数是 ContractEventName 类实例，指定要监听的事件，既可以指定一个事件，也可以指定所有事件；第二个参数是一个回调函数，当事件发生后该回调函数被执行，该回调函数的参数由 `on()` 方法的第一个参数决定，当其指定一个事件时，回调函数参数是订阅事件所有的参数和事件对象，当其指定所有事件时，回调函数参数是发生事件的事件对象。`on()` 方法指定一个监听事件常用的有如下几种方法（沿用上面的例子）：直接传入事件名（如： `"Transfer"`），传入事件对象（该对象从合约对象的 `filters` 属性中取得，如 `contract.filters.Transfer`），传入事件函数的结果（事件函数从合约对象的 `filters` 属性取得，如果事件参数含有 `indexed`，则该参数可以传入事件函数作为参数以筛选特定的事件，如 `contract.filters.Transfer(ADDRESS)`）。监听事件所有的事件只要在 `on()` 方法的第一个参数传入 `"*"` 即可。

订阅事件仅能在事件发生时触发，往往在事件发生后我们也需要查询，可以通过以下例子了解具体方法：

```javaScript
const abi = [
  "event Transfer(address indexed from, address indexed to, uint amount)"
]

const contract = new Contract(CONTRACT_ADDRESS, abi, provider)

const filter = contract.filters.Transfer
const events = await contract.queryFilter(filter)
```

上面的例子可以看出，可以通过 `Contract` 实例上的 [`queryFilter()`](https://docs.ethers.org/v6/api/contract/#BaseContract-queryFilter) 方法可以查询该合约上的事件，可以传入参数进行过滤，其第一个参数可以传入和上面 `on()` 方法第一个参数相同的参数；第二和第三个参数可以指定需要查询的起始和终止区块，限定查询的区块范围。

我们在执行写操作时往往需要使用钱包进行签名，这种签名需要通过调用合约来执行，ethers.js 为我们提供了直接调用签名的接口：

```javaScript
const sig = await signer.signMessage(message);
```

上面例子中 `message` 是需要签名的内容，`sig` 是签名的结果，这种签名可以用于不执行合约但需要进行身份验证的场景。要完成整个验证，需要执行验证操作：

```javaScript
const address = verifyMessage(message, sig);
```

`address` 是签名函数计算的签名账号的地址，`message` 是需要签名的内容，`sig` 是签名结果，一般将 `address` 和预期地址进行对比，以进行验证。

我们在支付场景下，往往涉及以太币（以太坊的原生币），这里我们了解一下以太币的单位。以太坊的最小单位是 wei，1 个币即 1 ether，1 ether = 10<sup>18</sup> wei，他们中间还有若干单位可以见下表：

|  单位  | 1 ether              |
| :----: | :------------------- |
|  wei   | 1<sup>18</sup> wei   |
|  kwei  | 1<sup>15</sup> kwei  |
|  mwei  | 1<sup>12</sup> mwei  |
|  gwei  | 1<sup>9</sup> gwei   |
| szabo  | 1<sup>6</sup> szabo  |
| finney | 1<sup>3</sup> finney |
| ether  | 1 ether              |

在以太坊系统中，以太通常以 _wei_ 表示，这是以太的最小单位，不可再分。

在 JavaScript 中，当一个 [Number 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 的数字超过 _2<sup>53</sup>-1_（约 9.007E15） 后会带来诸多安全性问题，另一方面一个以太等于 1E18 wei，我们所以需要一种能处理“大数”的方案，在 [ethers.js v5.x 版本](https://docs.ethers.org/v5/) 中，引入了 [BigNumber 类](https://docs.ethers.org/v5/api/utils/bignumber/) 进行相关处理，而在 [ethers.js v6.x 版本](https://docs.ethers.org/v6/) 中，使用 [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 进行处理。

BigInt 的运算请参考相关文档，这里对 ethers.js 提供的 [以太单位换算的工具函数](https://docs.ethers.org/v6/api/utils/#about-units) 进行简要说明：

```JavaScript
formatEther(1000000000000000000n);  // "1.0"
formatEther(2000000000000000n);  // "0.002"
formatEther(1234000000000000000n);  // "1.234"

formatUnits(1234000000000000000n);  // "1.234"
formatUnits(1234000000000000000n, 'ether');  // "1.234"
formatUnits(1234000000000000000n, 'finney');  // "1234.0"
formatUnits(1234000000000000000n, 'gwei');  // "1234000000.0"

parseEther("1.234");  // 1234000000000000000n
parseEther("0.002")；  // 2000000000000000n

parseUnits("1.234");  // 1234000000000000000n
parseUnits("1.234", 'ether');  // 1234000000000000000n
parseUnits("1.234", 'finney');  // 1234000000000000n
parseUnits("1.234", 'gwei');  // 1234000000n
```

我们可以看到，`formatEther` 可以传入一个表示 *wei* 的数字，返回以 *ether* 为单位的数字字符串（整数将保留一位小数）；`formatUnits` 允许传入一个数字，可以在第二个参数指定返回值的单位，如果不指定则默认 *ether*，该函数将其第一个参数转为以第二个参数为单位的数字字符串（整数将保留一位小数）；`parseEther` 可以传入一个以 *ether* 为单位的数字字符串，将返回以 *wei* 为单位的 bigInt 类型的数字；`parseUnits` 可以传入一个数字字符串，可以在第二个参数指定第一个参数的单位，如不指定默认为 *ether*，该函数将以其第二个参数为单位的其第一个参数转为 *wei* 为单位的 bigInt 类型的数字。

以上为本节的全部内容，主要介绍了事件、签名和单位（转换）等内容。
