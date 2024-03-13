# 第八讲 初始化项目及框架搭建

前面的内容，我们分析了项目的需求，并实现了部分业务，这里，我们将从零开始搭建一个项目。

## 技术选型及本地环境准备

现代前端项目大多数都基于 [Node.js](https://nodejs.org/en), 需要在本地安装 Node.js 18.17.0 或者更高的版本。

[pnpm](https://pnpm.io/) 相对其他 Node.js 包管理工具更节省磁盘空间，在后续的课程中将使用它来进行包管理，请全局安装（其他安装方式请参考[文档](https://pnpm.io/installation)）：

```bash
npm install -g pnpm
```

因为应用的功能相对比较简单，所以多种前端框架都可以实现该项目，当然也可以不采用框架完全使用原生语言进行实现。本项目中状态变化涉及的 UI 变化比较多，使用前端框架可以简化一部分工作，我们考虑使用前端框架。在众多的前端框架中，[React](https://zh-hans.react.dev/) 在区块链领域生态相对完善，我们使用其进行开发。目前，React 比较推荐使用上层框架进行开发，我们使用在 [React 文档推荐的几个上层框架](https://zh-hans.react.dev/learn/start-a-new-react-project#production-grade-react-frameworks)中的 [Next.js](https://nextjs.org/)。

Next.js 是一个由 [Vercel](https://vercel.com/) 维护的全栈式的 React 框架，方便部署。

UI 组件层面，为了简化 CSS，我们采用 [Bootstrap](https://getbootstrap.com/)。[React Bootstrap](https://react-bootstrap.github.io/) 使用 React 对 Bootstrap 进行了大部分的重构，使得在 React 框架下使用 Bootstrap 更方便，这里我们使用 React Bootstrap。

## 初始化 Next.js 项目

在准备创建项目的父文件夹打开命令行工具，执行：

```bash
npx create-next-app@latest
```

如果我们之前没有安装过 `create-next-app` 对应版本的包，程序会提示我们先安装包，输入 `y`，回车继续：

```bash
Need to install the following packages:
  create-next-app@14.0.4
Ok to proceed? (y)
```

接下来程序开始引导初始化项目，首先需要输入项目名字，创建引导程序运行完后，将在当前文件夹创建一个以该名字命名的项目，这里我们输入 `mbti`，并回车：

```bash
What is your project named? » mbti
```

询问我们是否使用 TypeScript，在这个示例项目中我们使用 TypeScript，即使在其他项目中使用 JavaScript，也比较容易转换，所以这里我们选择 `Yes`，并回车：

```bash
Would you like to use TypeScript? » Yes
```

询问我们是否使用 ESLint，ESLint 会为我们的代码质量提供一个最基础的保证，这里我们先择 `Yes`，并回车：

```bash
Would you like to use ESLint? » Yes
```

询问我们是否使用 Tailwind CSS，技术选型介绍过，我们选择使用 React Bootstrap，所以这里选择 `No`，并回车：

```bash
Would you like to use Tailwind CSS? » No
```

询问我们是否使用 `src/` 目录，为了目录清晰，需要使用 `src` 目录存放核心代码，这里选择 `Yes`，并回车：

```bash
Would you like to use `src/` directory? » Yes
```

询问我们是否使用 App 路由，在 Next.js 中有两种路由形式，Page 路由是之前的方案，使用起来比较简单；App 路由比较复杂，但部分新功能只能应用在使用 App 路由的场景，这里选择 `Yes`，并回车：

```bash
Would you like to use App Router? (recommended) » Yes
```

询问我们是否使用别名导入，这里选择 `No`，并回车：

```bash
Would you like to customize the default import alias (@/*)? » No
```

程序开始初始化项目，等待程序结束。当命令行提示 `Success! Created mbti at XXXXXXXXXXX` 时，程序创建成功。

## 更改各项配置

项目初始化结束后，命令行打开的目录会有一个名为 `mbti` 的新文件夹生成，该文件夹即我们初始化的 Next.js 前端项目。

命令行执行 `cd mbti`，进入项目。

默认项目是使用 npm 进行包管理的，为了替换成 pnpm，我们需要删除 `package-lock.json` 文件，并执行 `pnpm i` 命令，安装依赖包。

在 `package.json` 文件，为项目增添 `description`：

```json
  "description": "A project of a MBTI stored block chain.",
```

为了优化 TypeScript 的使用，在 `tsconfig.json` 的 `compilerOptions`项目添加如下配置：

```json
  "forceConsistentCasingInFileNames": true,
  "downlevelIteration": true,
```

为了优化 ESLint 配置，需要安装 ESLint 插件，在命令行执行：

```bash
pnpm add -D eslint-plugin-simple-import-sort eslint-config-react
```

将 `.eslintrc.json` 文件替换成下面的内容：

```json
{
  "extends": ["next/core-web-vitals"],
  "plugins": ["simple-import-sort"],
  "rules": {
    "react/jsx-no-target-blank": "warn",
    "@next/next/no-sync-scripts": "warn",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error"
  }
}
```

## 修改模板内容

执行 `pnpm dev`，可以启用一个开发服务器，当命令行提示 `- Local: http://localhost:XXXX` 时（`XXXX` 为阿拉伯数字，表示端口号），可以打开浏览器，访问 `http://localhost:XXXX`，对当前代码的效果进行预览。

在 `/src/app/layout.tsx` 文件中，删除字体类和 html 标签语言属性，修改 `metadata`，将文件修改成：

```tsx
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "MBTI",
  description: "A project of a MBTI stored block chain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

可以使用如下命令安装 React Bootstrap：

```bash
pnpm add react-bootstrap
```

此外，还需要为引入 Bootstrap 的样式文件和 Icon 添加 CDN，将 `/src/app/layout.tsx` 修改成：

```tsx
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBTI",
  description: "A project of a MBTI stored block chain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

我们可以简化 `/src/app/page.tsx`，去掉在本项目中无用的代码，引入 `react-bootstrap`，因为没有使用 `page.module.css` 文件中的类，也可以将相关代码删除。为了验证 `react-bootstrap` 是否引入成功，我们引入 `Container` 组件，并将其 `html` 标签设为 `main`；为页面添加 `h1` 标题，内容为 `MBTI`，并使其文字水平居中（`text-center`），上下留出适当的空间，代码如下：

```tsx
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container as="main">
      <h1 className="text-center mt-5 mb-3">MBTI</h1>
    </Container>
  );
}
```

在预览页面看到 `MBTI` 字样在页面上半部分，并且水平居中显示。

因为没有文件使用 `/src/app/page.module.css` 文件中的 CSS 类，可以将该文件删除，后面如有需要再进行创建。

需要删除 `/src/app/globals.css` 文件中有些未被使用的 CSS 类，将其修改为：

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}
```

使用 public 文件夹中的两个文件（`/public/next.svg` 和 `/public/vercel.svg`）的代码已被移除，可以删除这两个文件。

## 迁移之前的代码

前面我们写了 MBTI 的转换函数，这里将这些函数添加到这个项目里，方便后面使用。

在 `src` 文件夹下创建 `utils` 文件夹，并在该文件夹下创建 `mbti.ts`，添加如下内容：

```ts
export const MBTI_TYPE = [
  ["E", "I"],
  ["S", "N"],
  ["T", "F"],
  ["J", "P"],
];

export const convertMbtiToDecimalNumber = (mbtiString: string) => {
  // 将字符串转换为大写字符
  const mbtiStringUpperCase = mbtiString.toLocaleUpperCase();

  // 先验证字符串的有效性，如不符合返回 -1
  if(!/^[EI][SN][TF][JP]$/.test(mbtiStringUpperCase)) return -1;

  // 遍历并生成二进制字符串
  const mbtiBinaryString = mbtiStringUpperCase
    .split('')
    .map((element, index) => MBTI_TYPE[index].indexOf(element) )
    .join('');

  // 将二进制字符串转换为十进制数字
  return Number.parseInt(mbtiBinaryString, 2)
}

export const convertMbtiToString = (mbtiDecimalNumber: number) => {
  // 验证传入值得范围是 0-15，不符合则返回空字符串
  if(mbtiDecimalNumber < 0 || mbtiDecimalNumber > 15) return '';

  // 将十进制数字转换为二进制字符串
  const mbtiBinaryString = Number(mbtiDecimalNumber).toString(2);

  // 遍历二进制字符串生成 MBTI 字符串
  return mbtiBinaryString.padStart(4, '0')
    .split('')
    .map((element, index) => MBTI_TYPE[index][Number.parseInt(element)])
    .join('');
}
```

至此，我们已经完成了项目初始化，接下来我们将围绕项目的功能进行编码工作。
