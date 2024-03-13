# 第三讲 使用 JavaScript 访问 MetaMask

前面我们了解了区块链的基础知识、区块链浏览器的使用方法及 MetaMask 的基本使用方法……接下来，我们来了解下如何通过 JavaScript 访问 MetaMask。

在进行接下来的内容的学习前需要保障证已安装并打开 MetaMask 浏览器插件。我们使用浏览器打开一个本地的 HTML 文件，并打开浏览器自带的开发工具（按下 F12）。选中“控制台” Tab 页，并输入 `ethereum`，会发现控制台工具报错 `Uncaught ReferenceError: ethereum is not defined`，这说明当打开本地 HTML 文件时， MateMask 浏览器拓展插件不会在该页注入 `ethereum`。

我们可以通过打包工具启动一个本地开发服务器来进行后续的学习。为了简便，这里我们使用 [Parcel](https://parceljs.org/) 来 [搭建一个项目](https://parceljs.org/getting-started/webapp/)。当然，也可以使用其他使用熟练的打包工具来进行后续的学习，这里就不展开了。

我们需要创建一个文件夹 `demo2`，并在文件夹内创建如下文件：

```json
// package.json
{
  "name": "demo2",
  "version": "0.0.1",
  "description": "第三讲 使用 JavaScript 访问 MetaMask - Demo2",
  "source": "src/index.html",
  "author": "idea2app",
  "license": "ISC",
  "browserslist": "> 0.5%, last 2 versions, not dead",
  "devDependencies": {
    "parcel": "latest"
  },
  "scripts": {
    "dev": "parcel",
    "build": "parcel build"
  }
}
```

```html
<!-- /src/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>第三讲 使用 JavaScript 访问 MetaMask - Demo2</title>
  </head>

  <body>
    <h1>第三讲 使用 JavaScript 访问 MetaMask - Demo2</h1>
    <script>
      // 验证 ethereum 注入:
      console.log("Demo2 - ethereum: ", ethereum);
    </script>
  </body>
</html>
```

我们的命令行进入 `demo2` 文件夹，并执行 `pnpm i` 和 `pnpm dev`（如果尚未安装 [Node.js](https://nodejs.org/en) 环境和 [pnpm](https://pnpm.io/) 请在执行命令前安装），此时命令行提醒 `Server running at http://localhost:1234`，我们在已安装 MetaMask 的浏览器打开 `http://localhost:1234`，并打开“控制台”，可以看到打印内容： `Demo2 - ethereum:  Proxy(d) {_events: {…}, _eventsCount: 0, _maxListeners: 100, _log: c, _state: {…}, …}`，这说明，MetaMask 浏览器拓展插件已在该网页注入了 `ethereum` 对象。为了验证该对象是 MetaMask 浏览器拓展插件注入的，我们关闭该插件，再刷新网页，会发现控制台的信息变成报错信息：`Uncaught ReferenceError: ethereum is not defined`，这说明 MetaMask 浏览器拓展插件确实为我们注入 `ethereum`，同时我们也可以通过 `window` 上是否挂载 `ethereum` 来判断该浏览器啊是否安装 MetaMask 插件。

现在，我们可以恢复插件，并刷新页面，可以观察打印出来的 `ethereum` 变量，不难发现它是一个 [`Proxy`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 对象。关于 `ethereum` 上挂载的方法如何使用可以参考文档 https://docs.metamask.io/wallet/reference/provider-api/ 。这里我们仅对 `request` 方法和事件监听进行简要介绍，其他内容请参考文档。

`ethereum.request` 是一个通过 MetaMask 来进行 **JSON-RPC API 请求** 提交的方法。通过查阅文档，不难知道，`ethereum.request` 有一个参数，必须传递一个带有 `method` 属性的对象，根据 `method` 的不同，该对象需要有不同的 `params` 数组，其返回值也会根据 `method` 而不同。目前，我们主要使用的方法有 `wallet_addEthereumChain`、`wallet_switchEthereumChain`、`wallet_requestPermissions`、`eth_accounts` 及 `eth_requestAccounts` 等。

`eth_requestAccounts` 主要用于登录，我们可以查阅文档，不难了解其使用方法：

```javaScript
await window.ethereum.request({
  "method": "eth_requestAccounts",
  "params": []
});
```

接下来，我们对上面的 Demo2 的代码进行改造：

```html
<!-- /src/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>第三讲 使用 JavaScript 访问 MetaMask - Demo2</title>
  </head>

  <body>
    <h1>第三讲 使用 JavaScript 访问 MetaMask - Demo2</h1>

    <button onclick="onRequestAccount()">登录</button>

    <script>
      function onRequestAccount() {
        window?.ethereum.request({
          method: "eth_requestAccounts",
          params: [],
        });
      }
    </script>
  </body>
</html>
```

当点击“登录”时 MetaMask 会弹出登录提示，按提示完成登录提示即可登录。

`eth_accounts` 方法可以用来获取当前 MetaMask 登录的账号地址，和 `eth_requestAccounts` 的使用方法一样，但会以数组形式返回账号地址。

从 `wallet_addEthereumChain` 的文档不难知道，它用来向 MetaMask 添加网络，其 `params` 的参数为一个对象，对象有如下几个属性是必选： 表示链 ID 的 `chainId`；表示链名称的 `chainName`；表示代币信息的 `nativeCurrency` 对象，它由三个必选属性构成，`decimals`、`name` 和 `symbol`；与链通信的 rpc 节点数组 `rpcUrls`，至少需要一个元素。另外，表示链的 logo 的图标地址数组 `iconUrls` 和区块链浏览器地址数组 `blockExplorerUrls` 是可选的。

在 Demo2 的 `index.html` 文件中，可以在 `登录` 按钮下添加一个新的按钮：`<button onclick="addEthereumChainHandler()">添加新网络</button>`；在 `loginHandler` 下添加 `addEthereumChainHandler` 方法：

```javaScript
function addEthereumChainHandler() {
  if (!window.ethereum) return;

  ethereum.request({
    "method": "wallet_addEthereumChain",
    "params": [
      {
        "chainId": "0x64",
        "chainName": "Gnosis",
        "rpcUrls": ["https://rpc.ankr.com/gnosis"],
        "iconUrls": [
          "https://xdaichain.com/fake/example/url/xdai.svg",
          "https://xdaichain.com/fake/example/url/xdai.png"
        ],
        "nativeCurrency": {
          "name": "xDAI",
          "symbol": "xDAI",
          "decimals": 18
        },
        "blockExplorerUrls": ["https://blockscout.com/poa/xdai/"]
      }
    ]
  });
}
```
按提示，我们就可以为 MetaMask 添加网络（链）了。

`wallet_switchEthereumChain` 方法用于切换链，通过在 `params` 传入一个含有 `chainId` 的对象可以切换到指定链；`wallet_requestPermissions` 方法用于授权，可不传参数。

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

`accountsChanged` 事件在账号登录状态改变后触发，回调函数的参数是一个数组，该数组内是目前登录的账号地址；`chainChanged` 事件在当前链改变后触发，回调函数参数是当前链的 ID 的八进制字符串；`connect` 事件在账号在当前网站链接网络后触发，回调函数是一个含有网络 Id `chainId` 的对象。

本节内容介绍了 MetaMask 的常用请求事件和事件监听，感谢大家。

