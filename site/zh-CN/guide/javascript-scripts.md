# 执行 JavaScript 脚本

使用 JavaScript 可以自定义文本转换、调用 WebView API，并模拟键盘输入。

## 功能概述

JavaScript 脚本可以：

- 处理选中文本和剪贴板内容
- 使用 WebView 辅助 API 或配置的 Node.js/Deno 运行时
- 模拟按键和跨平台键盘快捷键

## 运行环境

TextGO 默认在应用的 WebView 中运行 JavaScript。若配置了自定义 Node.js 或 Deno 可执行文件，TextGO 会改用对应运行时。两者均已配置时，优先使用 Node.js。若未配置自定义运行时，仅在 WebView 执行失败后依次尝试系统中的 Node.js 和 Deno。

引用 `_keyboard` 的脚本始终在 WebView 中运行，因为按键模拟 API 仅在该环境中可用。

**可用环境**：

- **WebView**：默认环境，可使用 `fetch` 等标准 WebView API；TextGO 另外提供 `_` 和 `_keyboard`
- **Node.js**：配置其自定义运行时路径后使用
- **Deno**：配置其自定义运行时路径后使用
- **系统回退**：未配置自定义运行时时，在 WebView 失败后先尝试 Node.js，再尝试 Deno

在“执行脚本”选项中配置自定义运行时路径：

![TextGO 脚本运行时选项](/screenshots/zh-CN/script-runtime-options.png)

## 创建 JavaScript 脚本

### 步骤 1：进入脚本管理

1. 打开“设置”>“执行脚本”
2. 点击“+”按钮添加脚本

### 步骤 2：基本信息

**脚本名称**（必填）

- 标识脚本
- 建议使用描述性的名称

**脚本图标**（可选）

- 从内置图标库中选择图标
- 也可以上传自定义 SVG 图标

**脚本类型**

- 选择 **JavaScript**

![TextGO JavaScript 脚本编辑窗口](/screenshots/zh-CN/javascript-script-editor.png)

### 步骤 3：编写脚本

JavaScript 脚本必须包含一个 `process` 函数：

```javascript
function process(data) {
  // data.clipboard - 剪贴板内容
  // data.selection - 选中的文本
  // data.datetime - ISO 8601 格式的执行时间

  // 返回处理后的文本
  return '';
}
```

**参数说明**：

- `data`：输入数据对象
  - `data.clipboard`：当前剪贴板的文本内容
  - `data.selection`：选中的文本内容
  - `data.datetime`：ISO 8601 格式的执行时间

**返回值**：

- 字符串会直接返回，其他可序列化值会转换为 JSON
- WebView 脚本可以将 `process` 定义为 `async` 函数
- 可以返回空字符串

## WebView API

WebView 脚本可使用以下预定义全局变量：

- `_`：`es-toolkit` 提供的工具函数
- `_keyboard`：按键模拟 API

### 模拟键盘输入

`_keyboard.press()` 支持发送单个按键，或组合修饰键发送按键：

```javascript
_keyboard.press(key);
_keyboard.press(modifiers, key);
```

- `key`：单个字符或支持的按键名称
- `modifiers`：修饰键名称数组

支持的按键名称包括 `Enter`/`Return`、`Tab`、`Escape`/`Esc`、`Space`、`Backspace`、`Delete`/`Del`、`ArrowUp` 等方向键、`Home`、`End`、`PageUp`、`PageDown`，以及 `F1` 至 `F12`。命名按键和修饰键均不区分大小写。

修饰键别名：

| 修饰键  | 支持的别名                                          |
| ------- | --------------------------------------------------- |
| Command | `Meta`、`Cmd`、`Command`、`Super`、`Win`、`Windows` |
| Control | `Control`、`Ctrl`                                   |
| Alt     | `Alt`、`Option`                                     |
| Shift   | `Shift`                                             |

编写跨平台快捷键时，使用 `Or` 连接一个 Command 别名和一个 Control 别名，顺序不限。例如，`CmdOrCtrl`、`CommandOrControl` 和 `ControlOrWindows` 在 macOS 上使用 Command，在 Windows 上使用 Control。

```javascript
function process(data) {
  _keyboard.press(['CmdOrCtrl'], 'c');
  return data.selection;
}
```

TextGO 会按顺序执行多次调用，并在按键队列完成后结束脚本。任一按键操作失败都会使脚本执行失败。由于按键操作具有副作用，这类脚本不会生成工具栏预览。

## 使用 JavaScript 脚本

创建脚本后，将其添加到快捷键规则：

1. 打开“全局快捷键”
2. 添加一条新规则
3. 在“执行动作”中选择创建的 JavaScript 脚本
4. 保存规则

## JavaScript 脚本示例

### 示例 1：文本反转

```javascript
function process(data) {
  return [...data.selection].reverse().join('');
}
```

### 示例 2：统计字符数

```javascript
function process(data) {
  return [...data.selection].length;
}
```

### 示例 3：去除重复行

```javascript
function process(data) {
  const lines = data.selection.split('\n');
  const unique = [...new Set(lines)];
  return unique.join('\n');
}
```

### 示例 4：统计词频

此示例使用 `es-toolkit` 提供的 WebView 专用全局变量 `_`。

```javascript
function process(data) {
  const words = data.selection.toLowerCase().match(/\p{L}+/gu) ?? [];
  return _.countBy(words, (word) => word);
}
```

### 示例 5：保存当前文档

此示例使用 `_keyboard`，因此会自动在 WebView 中运行。

```javascript
function process() {
  _keyboard.press(['CmdOrCtrl'], 's');
  return '';
}
```
