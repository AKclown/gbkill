# gbkill

Delete git branches in batches

![logo.png](./docs/logo.png)

### Branch Status

| Status    | Description                                       | Color |
| --------- | ------------------------------------------------- | ----- |
| NONE      | 分支处于正常状态                                    |       |
| DELETING  | 分支正在删除                                       | 🌍    |
| DELETED   | 分支已删除                                         | 🟢    |
| FAILED    | 分支删除失败                                       | 🔴    |
| NO_MERGED | 该分支未合并到`name分支`(`--merged [name]`)         | 🟣    |
| NO_FORCE  | 该分支需要强制删除`git branch -D name`(`--force`)   | 🟡    |

[EMO图形地址](https://emojipedia.org/zh)

https://github.com/TypeStrong/ts-node/issues/1997

https://github.com/vadimdemedes/create-ink-app/blob/main/templates/ts/source/cli.tsx
