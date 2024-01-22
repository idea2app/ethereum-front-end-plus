# 第十一讲 区块链应用前端退出

前面我们完成了登录相关的功能，本节课我们来实现网站前端的退出功能。

## 需求分析

MetaMask 没有为我们提供断开和某一网址连接的接口，这使得我们不能通过网站上的按钮断开和钱包的连接。在非区块链应用中，用户往往习惯点击某一按钮以退出，这种需求被带到区块链应用就产生了一种“真退出，假断开”的需求，即用户点击“退出”按钮，网站退出，但并不也无法断开与 MetaMask 连接。这对我们的应用有几点要求：

1. 当我们刷新页面时，登录状态不会失效；

2. 在登录状态下，直接关闭网页再打开（刷新），网站依然保留登录状态；在登录状态下，退出后关闭网页，再打开（刷新）网页依然保持未登录状态。

考虑到登录状态在页面重新打开（刷新）情况下依然保留，该状态不能存储到运行内存（程序变量），所以存到 `localStorage` 或许是个不错的方案。由于 `localStorage` 不能直接动态绑定到 UI 层面，我们可以在页面打开后读取 `localStorage` 并在变量存一份，修改时同步修改变量。

如果要实现退出，只要将 `localStorage` 中的登录状态清除并重新加载页面就可以了。

## 功能实现

首先，我们需要在连接账户发生改变时，将当前连接网站的钱包地址存储到 `localStorage`，在 `/src/models/MetaMask.ts` 中修改：

```ts
// ...
const { localStorage } = globalThis;

class MetaMask {
  constructor() {
    globalThis.window?.ethereum?.on('accountsChanged', accounts => {
      localStorage.account = (accounts as string[])?.[0] ?? "";
      this.switchDefaultChainAndReload();
    });

    globalThis.window?.ethereum?.on('chainChanged', this.switchDefaultChainAndReload);
  }
  // ...
}
// ...
```

每次连接账号改变，都会改变触发 `accountsChanged` 的回调函数，该回调函数的参数是当前钱包所有连接当前网站的账号组成的字符串数组，当前账号是该数组的第一个元素，我们将该账号存储到 `localStorage` 的 `account` 字段下；断开所有账户连接会返回一个空数组，我们将一个空字符串存储到 `localStorage` 的 `account` 字段下。

之前网页登录账号是通过查询连接网站的账号来决定的，目前的方案需要对该方案进行一些修改。为了避免查询已断开连接的账户，和之前一样先要查询当前连接网站的账户地址数组，如果该数组为空，当前没有账户连接该网站。然后获取当前 `localStorage` 的 `account` 字段存储的地址，如果该地址为空，则没有账户登录该网站；如果该地址不为空且已经连接钱包，如果是则认定当前是该账户登录网站；如果该地址不为空但未连接钱包，则当前应该是连接网站所有账户中的第一个账户登录该网站。在没有账户连接或者登录的情形，我们需要清除 `localStorage` 的 `account` 字段和 `userAddress`；反之我们需要更新这两个变量。在 `/src/app/page.tsx` 修改如下：

```tsx
// ...
export default function Home() {
  const { localStorage } = globalThis;
// ...
  const handleRequestAccounts = useCallback(async () => {
    const accounts = await window.ethereum?.request<string[]>({
      method: "eth_accounts",
      params: [],
    });

    const localStorageAccount = localStorage?.account;

    return setUserAddress(
      localStorage.account =
      (!accounts?.length || !localStorageAccount)
        ? ""
        : accounts.includes(localStorageAccount)
          ? localStorageAccount : accounts[0]
    );
  }, []);
// ...
}
//...
```

我们在 MetaMask 切换账号时，`localStorage` 的 `account` 字段存储的内容也更新了；当我们清空 `localStorage` 的 `account` 字段存储的内容，并刷新页面，网页显示未登录状态，点击“登录”按钮，显示登录状态，但我们刷新页面，又回到了未登录状态，此时，我们的登录状态和 `localStorage` 关联了，但在点击“登录”按钮后未设置 `localStorage` 的 `account` 字段，所以我们在 `/src/app/page.tsx` 中对 `onLOgin` 函数进行修改：

```tsx
// ...
export default function Home() {
// ...
  const onLogin = async () =>
    setUserAddress(localStorage.account = await metaMaskStore.connectWallet());
// ...
}
```

当我们再次清空 `localStorage` 的 `account`，刷新页面，点击“登录”，刷新页面，登录状态已保留。登录部分的工作已经完成，我们对需要完成“退出”功能，在 `/src/app/page.tsx` 修改如下代码：

```tsx
// ...
export default function Home() {
  // ...
  const onLogout = () => {
    localStorage.clear();
    location.reload();
  }

  return (
    <Container as="main">
      <h1 className='text-center mt-5 mb-3'>MBTI</h1>
      <LoginLogout {...{address: userAddress , onLogin, onLogout}} />
    </Container>
  )
}
```

点击“退出”按钮，账号退出，刷新页面，退出状态不变，点击“登录”按钮，重复上面的操作，未出现异常。

至此，网站前端退出功能已基本完成。
