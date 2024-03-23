# 以太坊前端进阶课程

专为前端开发者设计的课程，无需区块链经验，快速掌握构建去中心化应用（DApps）的前端技术。

## 项目简介

### 项目目标

本课程专为希望涉足区块链技术领域的前端开发者设计，旨在为您提供一条从传统前端开发到区块链前端开发的平滑过渡路径。无需任何区块链开发经验，您将通过系统的学习和实践，掌握构建去中心化应用程序（DApps）所需的前端技能。

### 适用人群

本课程专为具备一定前端开发基础的学习者设计，适合那些熟悉或了解以下技术的人员：

- HTML5、CSS3：掌握基础的网页构建和样式设计能力；
- ECMAScript 6 (ES6)：了解现代 JavaScript 的常用语法和特性；
- React：具备使用 React 框架进行组件化开发的经验；
- npm：熟悉 npm 的基本使用，能够通过 npm 管理项目依赖；
- TypeScript：了解 TypeScript 的基本概念和使用方法，能够使用 TypeScript 进行开发。

如果对上述内容不了解，可以查看下面的资料，快速入门：

- [MDN Web Docs](https://developer.mozilla.org/)：提供 HTML、CSS、JavaScript 的详细介绍；
- [React官方文档](https://react.dev/)：学习React的基础知识，包括组件、状态管理等；
- [ES6 入门书籍](https://es6.ruanyifeng.com/)：适合初学者学习ES6；
- [npm 官方文档](https://docs.npmjs.com/)：学习如何使用 npm 来管理项目依赖；
- [Node.js 官方文档](https://nodejs.org/docs/latest-v18.x/api/index.html)：了解 Node.js 的基础;
- [为 JavaScript 程序员准备的 TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)：适合初学者学习TypeScript，介绍基础知识。

## 目录结构

```txt
ethereum-front-end-plus/
├── Lecture/  ## 课程文件夹
│   ├── Lecture01/ ## 第一讲文件夹
│   │   ├── image/ ## 第一讲图片文件夹
│   │   └── README.txt  ## 第一讲文案
│   └── ...（其他课程文件）
├── Project/ ## 项目文件夹
│   ├── contract/  ## 合约项目文件夹 
│   └── frontEnd/  ## 前端项目文件夹
├── README.md
└── Slides/
    ├── Lecture01.pdf  ## 第一讲 PPT
    └── ...（其他PPT文件）
```

## 课程内容

|  讲次  | 课程名 | 课程文件目录 | PPT文件目录 |
|:------:|:------|:------|:------|
|  1    | 进入区块链世界 | [查看课程文件](/Lecture01/README.md) | [查看PPT](/Slides/Lecture01.pdf) |
|  2    | 一种广泛使用的以太坊区块链钱包——MetaMask | [查看课程文件](/Lecture02/README.md) | [查看PPT](/Slides/Lecture02.pdf) |
|  3    | 使用 JavaScript 访问 MetaMask | [查看课程文件](/Lecture03/README.md) | [查看PPT](/Slides/Lecture03.pdf) |
|  4    | 使用 ethers.js 和区块链交互（上） | [查看课程文件](/Lecture04/README.md) | [查看PPT](/Slides/Lecture04.pdf) |
|  5    | 使用 ethers.js 和区块链交互（下） | [查看课程文件](/Lecture05/README.md) | [查看PPT](/Slides/Lecture05.pdf) |
|  6    | 相关工具/应用简介 | [查看课程文件](/Lecture06/README.md) | [查看PPT](/Slides/Lecture06.pdf) |
|  7    | 需求分析和数据模型分析 | [查看课程文件](/Lecture07/README.md) | [查看PPT](/Slides/Lecture07.pdf) |
|  8    | 初始化项目及框架搭建 | [查看课程文件](/Lecture08/README.md) | [查看PPT](/Slides/Lecture08.pdf) |
|  9    | MetaMask 登录及事件监听 | [查看课程文件](/Lecture09/README.md) | [查看PPT](/Slides/Lecture09.pdf) |
|  10   | MetaMask 网络验证 | [查看课程文件](/Lecture10/README.md) | [查看PPT](/Slides/Lecture10.pdf) |
|  11   | 区块链应用前端退出 | [查看课程文件](/Lecture11/README.md) | [查看PPT](/Slides/Lecture11.pdf) |
|  12   | 创建 MBTI 记录 | [查看课程文件](/Lecture12/README.md) | [查看PPT](/Slides/Lecture12.pdf) |
|  13   | 查看、更新、销毁 MBTI 卡片 | [查看课程文件](/Lecture13/README.md) | [查看PPT](/Slides/Lecture13.pdf) |
|  14   | MBTI 历史显示 | [查看课程文件](/Lecture14/README.md) | [查看PPT](/Slides/Lecture14.pdf) |
|  15   | 查询其他用户的 MBTI | [查看课程文件](/Lecture15/README.md) | [查看PPT](/Slides/Lecture15.pdf) |
|  16   | 将项目部署到 Vercel | [查看课程文件](/Lecture16/README.md) | [查看PPT](/Slides/Lecture16.pdf) |
|  17   | 课程总结 | [查看课程文件](/Lecture17/README.md) | [查看PPT](/Slides/Lecture17.pdf) |

## 运行前端项目

### 运行环境

- [Node.js v18+](https://nodejs.org/docs/latest-v18.x/api/index.html)
- [pnpm](https://pnpm.io/)
- 代码编辑器（推荐 vscode）

### 启动命令

```bash
cd /Project/frontEnd

pnpm i

pnpm dev
```

## 许可证

本项目及其相关文件按照以下许可证发布：
- `Project/` 目录下的项目文件遵循 [MIT License](https://opensource.org/licenses/MIT)。
- `Lecture/` 目录下的课程文件以及 `Slides/` 目录下的PPT文件均遵循 [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/) 许可。

## 技术支持团队

本课程由 [idea2app](https://idea2.app) 出品。
