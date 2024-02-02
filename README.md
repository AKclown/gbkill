## 🤡 Delete git branches in batches [中文版](https://github.com/AKclown/gbkill/blob/main/README-ZH.md)

In daily development, we create a git branch function every time we make a requirement. Over time, many local and online branches will be accumulated. Then it is particularly important to have a tool to delete git branches in batches at this time. **`GBKILL` is a tool created to solve this need, allowing you to delete git branches more efficiently**

![logo.png](./docs/logo.png)

> This tool will list the `git branches` in the projects, and then you can `select in batches` the `git branches` that need to be deleted.

## 🤡 Install

Actually you don't need to install it to use it! Just use the following command:

```ts
$ npx gbkill
```

Or you can install it:

```ts
$ npm i -g gbkill
```

## 🏕️ Usage

> Enter `gbkill` in your `terminal`** (currently not compatible with Git in Windows terminal)**. `gbkill` will execute the `git command` to scan the `git branches` under your current project s and display them in the lists

| Key        | Description                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| Space      | Press the `spacebar` to execute the `merged` branch deletion (**`recommendation: to prevent accidental deletion`**) |
| Tab        | Press the `Tab` to execute `merged \| unmerged` branch deletion (**`higher permissions than the Space`**)           |
| RightArrow | Press `-> ` to execute `Open \| Close`function of batch selection branch                                            |
| ↓          | Press `↓` to select branch                                                                                          |
| ↑          | Press `↑` to select branch                                                                                          |

**Hint**

> 1. The `merge` listed on the gbkill interface displays `yes` or `No` which is judged by `git branch --merged <name>`. You can specify the merged branch name by executing `gbkill --merged <name>`

> 2. When the `merge` status in `gbkill` is `yes`, but `NO_FORCE...fully merged` appears when you delete the branch. Reason: `The code of this branch` is not merged into the `currently focused branch`. Requires `forced deletion`

> 3. When executing `gbkill --sync`, the `remote branch` of the target branch will be deleted first and then the `local branch`

## 🏖️ Parameter

> Configurable parameters of `gbkill`. Some configuration parameters will be cached and shared globally in the `/user home directory/.gbkill` file.

| Argument             | Description                                                                                                                                                        | Cache |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| --force              | Forcibly delete a branch, equivalent to `git branch -D \<name\>` (**Caution: local `commit` changes will be deleted**)                                             | No    |
| --sync               | Whether to delete remote branches synchronously                                                                                                                    | No    |
| --merged \<name\>    | Specify the branch name used to determine whether a branch has been merged (**git branch --merged \<name\>**)                                                      | Yes   |
| --lock \<names..\>   | `Locked` some branches will be `hidden in the list`, and the data will be accumulated instead of replaced (**Prevent accidental deletion, protect some branches**) | Yes   |
| --unlock \<names..\> | `Unlock` a branch locked by `--lock`                                                                                                                               | Yes   |

<!-- | --submodule          | Whether to display the branch list of git submodules                                                         | No    | -->
<!-- | --language \<name\>  | Specify GBkill language `ZH\|EN`                                                           | Yes    | -->

## 🏝️ State of Git branch

> Description corresponds to branch status.

| Status    | Description                                                              | Color |
| --------- | ------------------------------------------------------------------------ | ----- |
| NONE      | The branch is in a normal state                                          |       |
| DELETING  | Branch is being deleted                                                  | 🌍    |
| DELETED   | Branch deleted                                                           | 🟢    |
| FAILED    | Fail to delete branch                                                    | 🔴    |
| NO_MERGED | The branch was not merged into `name branch` (`--merged <name>`)         | 🟣    |
| NO_FORCE  | This branch needs to be forcibly deleted `git branch -D name`(`--force`) | 🟡    |
| NO_SYNC   | Fail to delete remote branches synchronously                             | 🟠    |

## 🏞️ Known issues

> ⚠️ `Git for Windows Terminal` is currently not supported, and the tool is limited to [ink](https://github.com/vadimdemedes/ink/issues/378). We will look for alternatives later. Please use `CMD`, `Vscode terminal's Git...` terminal

## ⛺ Other

1. This tool will be continuously optimized. If you have better ‘interactive behavior’ or ‘feature requests’, you can submit a ‘pr’ or ‘issue’ to me
2. Thank you for using this tool and looking forward to your `issue` or `PR`

<!-- 请勿删除: [EMO 图形地址](https://emojipedia.org/zh) -->
