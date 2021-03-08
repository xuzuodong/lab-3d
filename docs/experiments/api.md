# API

## script

- 类型：`object`

导入的 script 对象。

## hooks

- 类型： `object[]`

hooks 钩子数组，钩子用来指定监听哪个段落的哪个环节并编写监听到这个环节后的代码。

## hooks[].paragraph（必填）

- 类型：`string`

指定监听的段落。

## hooks[].choice

- 类型：`number|string`

指定监听用户选了哪个 choice，值值从 0 开始计，可以为 'last' 来监听最后一个选项，可以为 'any' 来监听任意选项。

**注意，一个** `hooks[]` **中，**要么使用** `choice`，要么使用** `talk`，**要么使用** `reply`，**不能一个以上同时存在，也不能没有**。

## hooks[].talk

- 类型：`number|string`

指定监听哪句 `talk`，值从 0 开始计，可以为 `'last'` 来监听最后一句 `talk`。

## hooks[].reply

- 类型：`object`

指定监听 reply，值为对象 `{ choice: Number | String, index: Number | String }`。

## hooks[].reply.choice （必填）

- 类型：`number|string`

指定要监听哪个选项的 `reply`，值可以为 `'any'`, 以指定监听目标属于任意选项；可以为 `'last'`，来指定监听目标属于最后一个选项。

## hooks[].reply.index（必填）

- 类型：`number|string`

指定监听选项的第几个 `reply`，值可以为 `'last'`, 以监听最后一个 `reply`。

## hooks[].method（必填）

- 类型：`function`

指定监听到对应事件之后要做的事，注意在完成后需要调用 `resolve` 方法来让对话继续。
