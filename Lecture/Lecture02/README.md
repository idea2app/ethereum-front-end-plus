# 一种广泛使用的区块链钱包——MetaMask

前面我们介绍了区块链的一些基础概念，接下里，我们将介绍在区块链应用中需要广泛使用的一种工具——区块链钱包，并且介绍在以太坊生态下使用最广泛的一种钱包——MeteMask。

## 区块链钱包简介

我们通常理解的钱包，需要在钱包中存放钱，但在区块链世界中钱包更多的是一个密钥管理工具和账户信息查看工具，所有的“钱”的数据都存放在区块链上。钱包中存放的密钥，有足够的权限控制区块链账户（包含验证身份和处理资产），所以，我们可以使用钱包登录应用、查看账户信息、发送交易、验证身份。

钱包大多数情况下可以生成多个公私钥对，公钥是一串可以用来与其他用户共享的字符，用于接受数字货币，就像银行账户；私钥是一串必须严格保密的字符，主要用于签名交易和身份验证，就像银行卡密码。公钥可以计算得出账户地址，一个公私钥对对应一个区块链账户，因此大多数情况钱包可以同时管理多个区块链账户。

需要特别注意的是保护私钥是区块链钱包用户的最重要任务之一，因为私钥是控制区块链上资金的关键，如果不幸私钥泄露，钱包上的资产可能被窃取、财务状况可能被未授权的第三方获取。

大多数情况下我们也可以在支持相同生态的钱包供应商之间切换。

钱包的主要类型有，桌面钱包（安装在电脑上的软件）、移动钱包（安装在手机上的应用程序）、硬件钱包（物理设备）和纸质钱包（将密钥写在纸张上）等。

以太坊提供了 [一个可供参考的支持以太坊生态的钱包列表](https://ethereum.org/zh/wallets/find-wallet/)，我们可以根据自己的实际情况筛选，寻找适合自己应用场景的钱包。MetaMask 钱包在以太坊生态下应用比较广泛，我们接下来的课程将使用它来进行学习。

## MetaMask 简介

MetaMask 是用于与以太坊区块链进行交互的软件加密货币钱包，因为它的 Logo 是一只小狐狸，所以又被称为“小狐狸”。它可以通过浏览器扩展程序或移动应用程序让用户访问其以太坊钱包，与去中心化应用进行交互。

### 安装 MetaMask

这里我们介绍如何安装 MetaMask 浏览器拓展程序，可以直接访问 MetaMask 的 [下载页面](https://metamask.io/download/) 或通过 [MetaMask 官方网站](https://metamask.io/) 的页脚的 `Download` 链接进入下载页面（如下图中的 ①）。

MetaMask 下载页会自动识别访问该页面的浏览器，可以点击 `Install MetaMask for XXXXX` 按钮（下图 ② 处），安装浏览器插件，如果识别失败或者错误，可以在 Supported Browsers 区域（下图 ③ 处）选择合适的浏览器，点击对应的图标，和上面的按钮点击效果一样进入对应浏览器的拓展程序应用市场的 MetaMask 插件详情页，可以直接安装该插件。

![MetaMask 下载页](./image/metamask_download_page.jpg)

### 创建 MetaMask 钱包

在安装 MetaMask 插件后，MetaMask 会自动弹出创建钱包的引导页面，如果将这个页面关闭，在没有创建钱包或者导入现有钱包的情况下点击浏览器插件可以再次弹出该引导页。该页面可以选择显示的语言（如下图 ①），在下图 ② 处勾选“我同意 MetaMask 的使用条款”复选框，可以选择“创建新钱包”或者“导入现有钱包”，我们这里选择点击“创建新钱包”。

![MetaMask 插件创建钱包](./image/metamask_onboarding_welcome.jpg)

请认真阅读相关说明，我们可以根据实际情况选择是否帮助改进 MetaMask，建议同意。

![MetaMask 插件创建钱包改进 MetaMask](./image/metamask_onboarding_metametrics.jpg)

需要填写新密码和确认密码，该密码用于每次登录钱包，勾选复选框“我明白 MetaMask 无法为我恢复此密码。”，需要注意该密码一旦忘记无法找回，点击“创建新钱包”。

![MetaMask 插件创建钱包创建密码](./image/metamask_onboarding_create_password.jpg)

请认真阅读页面中有关助记词的说明，并建议选择“保护我的钱包（推荐）”。

![MetaMask 插件创建钱包保护钱包](./image/metamask_onboarding_secure_your_wallet.jpg)

这一步 MetaMask 将显示钱包的私钥，点击“显示私钥助记词”，并且确保密码不被泄露，可以将这些助记词抄写在纸上，存放在保险柜中，确保助记词既不丢失也不泄露。

![MetaMask 插件创建钱包助记词提示](./image/metamask_onboarding_review_recovery_phrase.jpg)

将助记词记录后，点击“下一步”按钮。

![MetaMask 插件创建钱包记录助记词](./image/metamask_onboarding_review_recovery_phrase_remenber.jpg)

在缺失的位置填写助记词，并点击“确认”按钮。

![MetaMask 插件创建钱包确认助记词](./image/metamask_onboarding_confirm_recovery_phrase.jpg)

到这一步，钱包已经创建成功了，点击“知道了！”按钮继续。

![MetaMask 插件创建钱包完成](./image/metamask_onboarding_completion.jpg)

MetaMask 提示我们对插件进行配置，点击“下一步”按钮。

![MetaMask 插件配置 1](./image/metamask_onboarding_pin_extension_1.jpg)

点击“完成”按钮。

![MetaMask 插件配置 2](./image/metamask_onboarding_pin_extension_2.jpg)

页面跳转到插件首页，页面显示最近更新的内容，查看后关闭即可。

![MetaMask 插件首页最近更新](./image/metamask_home_recent_update.jpg)

### MetaMask 常用功能介绍

接下来介绍一些 MetaMask 的常用功能。

#### MetaMask 账户连接网站管理


#### MetaMask 账户详情
#### 在 Explorer 上查看 MetaMask 账户
#### MetaMask 账户已连接的网站管理
#### 展开视图


#### MetaMask 网络切换和添加

https://chainlist.wtf/

#### MetaMask 添加账户


#### MetaMask 主页页面介绍


#### 发送代币


