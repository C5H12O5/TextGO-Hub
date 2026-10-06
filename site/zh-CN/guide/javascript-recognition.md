# 编写 JavaScript 识别脚本

TextGO 可通过 JavaScript 脚本判断选中文本是否匹配自定义类型。

## 什么是 JavaScript 识别脚本

识别脚本定义一个 `matches` 函数，返回 `true` 或 `false`。在规则执行前，函数可检查选中文本及其来源应用。

如需在匹配后转换文本，可创建 [JavaScript 动作脚本](./javascript-scripts.md)。

## 何时使用 JavaScript 识别脚本

### 适合使用脚本的场景

✅ **组合多个匹配条件**

- 同时检查文本内容、长度和格式
- 单个正则表达式难以维护的判断规则

✅ **结构化文本**

- 解析 JSON 并检查字段
- 同时校验字段值和文本格式

✅ **根据来源应用匹配**

- 匹配在指定应用中选中的文本
- 组合来源应用和文本内容作为判断条件

### 不适合使用脚本的场景

❌ **简单清晰的模式**

- [正则表达式](./write-regexps.md)可以直接描述的模式
- 无需额外条件的固定格式

❌ **需要学习的模式**

- 没有明确固定的规则
- 需要从样本中学习特征，可使用[分类模型](./train-models.md)

## 创建 JavaScript 识别脚本

### 步骤 1：进入脚本管理

1. 打开“设置”>“JavaScript 脚本”
2. 点击“+”按钮打开“新增脚本”窗口

### 步骤 2：基本信息

**类型名称**（必填）

- 标识脚本
- 建议使用描述性的名称

**类型图标**（可选）

- 点击当前类型图标打开图标选择窗口
- 可选择“内置图标”或“上传自定义 SVG”

### 步骤 3：编写脚本

**脚本**（必填）

JavaScript 识别脚本必须包含一个 `matches` 函数：

```javascript
function matches(data) {
  // data.selection - 选中文本
  // data.appId - 划词所在应用的 appId

  // 返回文本是否匹配
  return false;
}
```

**参数说明**：

- `data`：输入数据对象
  - `data.selection`：选中的文本内容
  - `data.appId`：来源应用标识；macOS 为应用的 Bundle ID，Windows 为可执行文件路径；无法获取时为空字符串

来源应用在快捷键触发时获取。

**返回值**：

- `true`：规则匹配
- `false`：规则不匹配
- 脚本可以将 `matches` 定义为 `async` 函数
- 返回 `1`、`"true"` 等其他类型，或脚本发生错误，均视为不匹配；继续检查后续规则

识别脚本在应用的 WebView 中运行。“脚本执行选项”中的 Node.js、Deno 路径不会改变该运行环境。

![TextGO JavaScript 识别脚本编辑窗口](/screenshots/zh-CN/javascript-recognition-editor.png)

## 使用 JavaScript 识别脚本

保存的脚本会出现在识别类型列表中：

1. 打开“全局快捷键”
2. 添加一条新规则
3. 在“识别类型”的“JavaScript 脚本”分组中选择已保存的脚本
4. 配置执行动作并保存

## JavaScript 识别脚本示例

### 示例 1：六位数字

去除首尾空格后，匹配六位数字：

```javascript
function matches(data) {
  return /^\d{6}$/.test(data.selection.trim());
}
```

### 示例 2：订单 JSON

匹配包含非空订单编号和正数金额的 JSON：

```javascript
function matches(data) {
  try {
    const order = JSON.parse(data.selection);
    return (
      typeof order?.orderId === 'string' &&
      order.orderId.trim().length > 0 &&
      typeof order.amount === 'number' &&
      order.amount > 0
    );
  } catch {
    return false;
  }
}
```

例如，`{"orderId":"ORD-1024","amount":99}` 会匹配；无效 JSON 或金额为 `0` 时不会匹配。

### 示例 3：在文本编辑中选中的数字

此示例适用于 macOS，匹配在文本编辑（TextEdit）中选中的六位数字：

```javascript
function matches(data) {
  return data.appId === 'com.apple.TextEdit' && /^\d{6}$/.test(data.selection.trim());
}
```

Windows 上应检查可执行文件路径。例如，`data.appId.toLowerCase().endsWith('\\notepad.exe')` 可限定为记事本。无法获取来源应用标识时，这两种判断均不会匹配。
