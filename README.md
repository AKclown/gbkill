## 🤡 Delete git branches in batches

在什么场景下，你需要使用到 GBKILL。 在日常开发中我们每做一个需求就会创建一个功能分支，时间久了本地和线上的分支就会被累计很多。那么此时有一个批量删除分支的工具显得尤为重要。GBKILL 就是为这个需求而生的一款工具   

![logo.png](./docs/logo.png)

> 该工具将列出项目中的`git分支`列表，然后您可以`批量选择`需要删除的`git分支`。目的是为更加高效的`批量删除git分支`

### 🤡 Installation

您实际上不需要安装它即可使用它！只需使用以下命令:

```ts
$ npx gbkill
```

或者你可以安装它:

```ts
$ npm i -g gbkill
# Unix users may need to run the command with sudo. Go carefully
```

### 🏕️ Usage

> 在`terminal`下执行`gbkill`。默认情况下，gbkill 将从执行 gbkill 命令的路径开始扫描`git分支`。

| Key        | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| Space      | 按`空格键`执行删除`已合并`分支 (**`推荐: 防止误删除`**)       |
| Tab        | 按`Tab键`执行删除`已合并 \| 未合并`分支 (**`权限比Space高`**) |
| RightArrow | 按`->键`执行`打开 \| 关闭`批量选择分支                        |
| ↓          | 按`↓` 移动选择分支                                            |
| ↑          | 按`↑` 移动选择分支                                            |

> ⚠️ 在 gbkill 界面上`操作分支`merge 数据显示为**yes**(指的是`操作分支`合并到了`--merged 设置的分支`)。  
> ⚠️ 当你在`该操作分支`执行删除时出现`NO_FORCE...The branch '...' is not fully merged...`。原因是`操作分支`没有合并到你`当前项目聚焦的分支`上。需要`强制删除`

### 🏖️ Options

> `gbkill`的可配置参数，部分配置参数会被缓存到`/用户主目录/.gbkill`

| Argument             | Description                                                                           | Cache |
| -------------------- | ------------------------------------------------------------------------------------- | ----- |
| --force              | 强制删除分支, 等价于`git branch -D \<name\>` (**慎重: 会将本地`commit`的改动删除掉**) | 否    |
| --sync               | 是否同步删除远程分支                                                                  | 否    |
| --merged \<name\>    | 指定用于判断`某个分支是否已经被合并的`分支 (**git branch --merged \<name\>**)         | 是    |
| --lock \<names..\>   | `锁定`某些分支，将会在`列表隐藏`（**防止误删，保护某些分支**）                        | 是    |
| --unlock \<names..\> | `解锁`被锁定的分支                                                                    | 是    |

<!-- | --submodule          | 是否展示 git 子模块的分支列表                                                         | 否    | -->
<!-- | --language \<name\>  | 指定 GBkill 语言 `ZH\|EN`                                                             | 是    | -->

### 🏝️ Branch Status

> 分支状态

| Status    | Description                                       | Color |
| --------- | ------------------------------------------------- | ----- |
| NONE      | 分支处于正常状态                                  |       |
| DELETING  | 分支正在删除                                      | 🌍    |
| DELETED   | 分支已删除                                        | 🟢    |
| FAILED    | 分支删除失败                                      | 🔴    |
| NO_MERGED | 该分支未合并到`name分支`(`--merged <name>`)       | 🟣    |
| NO_FORCE  | 该分支需要强制删除`git branch -D name`(`--force`) | 🟡    |
| NO_SYNC   | 同步删除远程分支失败                              | 🟠    |

### 🏞️ Issue

> ⚠️ 目前不支持`Windows终端的Git`，工具受限于[ink](https://github.com/vadimdemedes/ink/issues/378)，后续查找替代方案。请使用`CMD`、`Vscode 终端的 Git...`

### ⛺ 其他

[EMO 图形地址](https://emojipedia.org/zh)
