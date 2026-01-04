# 执行 JavaScript 脚本

TextGO 支持使用 JavaScript 编写自定义脚本来处理文本。JavaScript 脚本可以执行各种复杂的文本转换和处理操作，极大地扩展 TextGO 的功能。

## 功能概述

JavaScript 脚本允许你：

- 使用 JavaScript 处理文本
- 利用丰富的 JavaScript 标准库和生态系统

## 运行环境

TextGO 使用 Node.js 或 Deno 运行 JavaScript 脚本。

**支持的运行时**：

- **Node.js**：使用最广泛的 JavaScript 运行时
- **Deno**：现代、安全的 JavaScript/TypeScript 运行时

**自动检测**：

- TextGO 会自动检测系统中可用的运行时
- 优先使用 Node.js，如不可用则使用 Deno
- 可以在设置中指定自定义的运行时路径

## 创建 JavaScript 脚本

### 步骤 1：进入脚本管理

1. 打开"设置" > "执行脚本"
2. 点击"+"号添加新脚本

### 步骤 2：基本信息

**脚本名称**（必填）

- 用于标识这个脚本
- 建议使用描述性的名称

**脚本图标**（可选）

- 点击图标选择器选择图标
- 支持内置图标库
- 支持上传自定义 SVG 图标

**脚本类型**

- 选择 **JavaScript**

### 步骤 3：编写脚本

JavaScript 脚本必须包含一个 `process` 函数：

```javascript
function process(data) {
  // data.clipboard - 剪贴板内容
  // data.selection - 选中的文本

  // 返回处理后的文本
  return '';
}
```

**参数说明**：

- `data`：包含输入数据的对象
  - `data.clipboard`：当前剪贴板的文本内容
  - `data.selection`：选中的文本内容

**返回值**：

- 必须返回字符串
- 返回的内容会作为处理结果
- 可以返回空字符串

## 使用 JavaScript 脚本

创建好脚本后，可以在快捷键规则中使用：

1. 打开"快捷键设置"
2. 添加一条新规则
3. 在"执行动作"中选择你创建的 JavaScript 脚本
4. 保存规则

## JavaScript 脚本示例

#### 示例 1：文本反转

```javascript
function process(data) {
  return data.selection.split('').reverse().join('');
}
```

#### 示例 2：统计字符数

```javascript
function process(data) {
  const text = data.selection.trim();
  return text.length;
}
```

#### 示例 3：移除重复行

```javascript
function process(data) {
  const lines = data.selection.split('\n');
  const unique = [...new Set(lines)];
  return unique.join('\n');
}
```
