## 🌦️ Delete git branches in batches 🤡

![logo.png](./docs/logo.png)

### 🌦️ GBkill

| Argument          | Description                                                                         | Cache |
| ----------------- | ----------------------------------------------------------------------------------- | ----- |
| --force           | 强制删除分支, 等价于`git branch -D <name>` (**慎重: 会将本地`commit`的改动删除掉**) | 否    |
| --merged [branch] | 指定用于判断`某个分支是否已经被合并的`分支 (**git branch --merged <branch>**)       | 是    |
| --sync            | 是否同步删除远程分支                                                                | 否    |
| --submodule       | 是否展示 git 子模块的分支列表                                                       | 否    |
| --lock [branch]   | `锁定`某个分支为不可删除 （**防止误删，保护某些分支**）                             | 是    |
| --unlock [branch] | `解锁`被锁定的分支                                                                  | 是    |
| --language [name] | 指定 GBkill 语言 `ZH\|EN`                                                           | 是    |
|                   | **Operate**                                                                         |       |
| Space             | 按`空格键`执行删除`已合并`分支 (**推荐: 防止误删除**)                               | 无    |
| Tab               | 按`Tab键`执行删除`已合并 \| 未合并`分支 (**权限比`Space高`**)                       | 无    |
| rightArrow        | 按`->键`执行`打开 \| 关闭`批量选择分支                                              | 无    |

### 🌦️ Branch Status

| Status    | Description                                       | Color |
| --------- | ------------------------------------------------- | ----- |
| NONE      | 分支处于正常状态                                  |       |
| DELETING  | 分支正在删除                                      | 🌍    |
| DELETED   | 分支已删除                                        | 🟢    |
| FAILED    | 分支删除失败                                      | 🔴    |
| NO_MERGED | 该分支未合并到`name分支`(`--merged <name>`)       | 🟣    |
| NO_FORCE  | 该分支需要强制删除`git branch -D name`(`--force`) | 🟡    |
| NO_SYNC   | 同步删除远程分支失败                              | 🟤    |

[EMO 图形地址](https://emojipedia.org/zh)
