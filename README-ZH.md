## 🤡 批量删除git分支

<p align="center">
<img alt="npm" src="https://img.shields.io/npm/dy/gbkill.svg">
<img alt="npm version" src="https://img.shields.io/npm/v/gbkill.svg">
<img alt="NPM" src="https://img.shields.io/npm/l/gbkill.svg">
</p>

在日常开发中我们每做一个需求就会创建一个git功能分支，时间久了本地和线上的分支就会被累计很多。那么此时有一个批量删除git分支的工具就显得尤为重要。**`GBKILL`正是为了解决这一需求也生的工具,让你更加高效的删除git分支**

> ![gbkill](./docs/gbkill.gif)

> 该工具将列出项目中的`git分支`列表，然后您可以`批量选择`需要删除的`git分支`

> ![logo.png](./docs/logo.png)

## Table of Contents

- [安装](#Install)
- [用法](#Usage)
- [参数](#Parameter)
- [Git分支状态](#State-of-Git-branch)
- [已知问题](#Known-issues)
- [其它](#Other)

<a name="Install"></a>

## 🤡 安装

您实际上不需要安装它即可使用它！只需使用以下命令:

```ts
$ npx gbkill
```

或者你可以安装它:

```ts
$ npm i -g gbkill
```

<a name="Usage"></a>

## 🏕️ 用法

> 在你的`terminal`下输入`gbkill`**(目前不兼容Windows终端的Git)**。`gbkill`会执行`git命令`扫描你当前项目下的`git分支`并且在列表中展示出来

| Key        | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| Space      | 按`空格键`执行`已合并`分支删除 (**`推荐: 防止误删除`**)         |
| Tab        | 按`Tab键`执行`已合并 \| 未合并`分支删除 (**`权限比Space键高`**) |
| RightArrow | 按`->键`执行`打开 \| 关闭`批量选择分支功能                      |
| ↓          | 按`↓` 移动选择分支                                              |
| ↑          | 按`↑` 移动选择分支                                              |

**提示**

> 1. gbkill界面上的`merge`列表显示`yes`或`No`是通过`git branch --merged <name>`判断的。你可以通过执行`gbkill --merged <name>`指定`合入的分支名称`

> 2. 当`gbkill`中`merge`状态为`yes`时，但你执行该分支删除时出现`NO_FORCE...fully merged`。原因：`该分支代码`没有合并到`当前聚焦分支`。需要`强制删除`

> 3. 当执行`gbkill --sync`时，会先删除目标分支的`远程分支`再删除`本地分支`

> 4. 如果你确定你所执行的操作，请使用`gbkill --sync --force`以及`Tab`减少限制

<a name="Parameter"></a>

## 🏖️ 参数

> `gbkill`的可配置参数，部分配置参数会被缓存到`/用户主目录/.gbkill`文件中全局共享

| Argument             | Description                                                                           | Cache |
| -------------------- | ------------------------------------------------------------------------------------- | ----- |
| --force              | 强制删除分支, 等价于`git branch -D \<name\>` (**慎重: 会将本地`commit`的改动删除掉**) | 否    |
| --sync               | 是否同步删除远程分支                                                                  | 否    |
| --merged \<name\>    | 指定用于判断`某个分支是否已经被合并的`分支名称 (**git branch --merged \<name\>**)     | 是    |
| --lock \<names..\>   | `锁定`某些分支将会在`列表隐藏`,数据会被累加而不是替换（**防止误删，保护某些分支**）   | 是    |
| --unlock \<names..\> | `解锁`被`--lock`锁定的分支                                                            | 是    |

<!-- | --submodule          | 是否展示 git 子模块的分支列表                                                         | 否    | -->
<!-- | --language \<name\>  | 指定 GBkill 语言 `ZH\|EN`                                                             | 是    | -->

<a name="State of Git branch"></a>

## 🏝️ Git分支状态

> 分支状态对应的描述

| Status    | Description                                       | Color |
| --------- | ------------------------------------------------- | ----- |
| NONE      | 分支处于正常状态                                  |       |
| DELETING  | 分支正在删除                                      | 🌍    |
| DELETED   | 分支已删除                                        | 🟢    |
| FAILED    | 分支删除失败                                      | 🔴    |
| NO_MERGED | 该分支未合并到`name分支`(`--merged <name>`)       | 🟣    |
| NO_FORCE  | 该分支需要强制删除`git branch -D name`(`--force`) | 🟡    |
| NO_SYNC   | 同步删除远程分支失败                              | 🟠    |

<a name="Known issues"></a>

## 🏞️ 已知问题

> ⚠️ 目前不支持`Windows终端的Git`，工具受限于[ink](https://github.com/vadimdemedes/ink/issues/378)，后续查找替代方案。请使用`CMD`、`Vscode 终端的 Git...`终端

<a name="Other"></a>

## ⛺ 其它

1. 该工具会`持续优化`, 如果你有更好的`交互行为`或者`功能请求`都可以给我提`pr`或者`issue`
2. 感谢您使用该工具，也期待你的`issue`或者`pr`

<!-- 请勿删除: [EMO 图形地址](https://emojipedia.org/zh) -->
