# 执行 Python 脚本

TextGO 支持使用 Python 编写自定义脚本来处理文本。Python 拥有丰富的第三方库生态，非常适合处理复杂的数据处理、科学计算和文本分析任务。

## 功能概述

Python 脚本允许你：

- 使用 Python 处理文本
- 利用丰富的 Python 第三方库扩展功能

## 运行环境

TextGO 会自动检测系统中的 Python 环境。

**支持的 Python 版本**：

- Python 3.9+

**自动检测路径**：

- TextGO 会自动检测系统中可用的运行时
- 可以在设置中指定自定义的运行时路径

## 创建 Python 脚本

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

- 选择 **Python**

### 步骤 3：编写脚本

Python 脚本必须包含一个 `process` 函数：

```python
def process(data):
    # data["clipboard"] - 剪贴板内容
    # data["selection"] - 选中的文本

    # 返回处理后的文本
    return ""
```

**参数说明**：

- `data`：包含输入数据的字典
  - `data["clipboard"]`：当前剪贴板的文本内容
  - `data["selection"]`：选中的文本内容

**返回值**：

- 必须返回字符串
- 返回的内容将作为处理结果
- 可以返回空字符串

## 使用 Python 脚本

创建好脚本后，可以在快捷键规则中使用：

1. 打开"快捷键设置"
2. 添加一条新规则
3. 在"执行动作"中选择你创建的 Python 脚本
4. 保存规则

## Python 脚本示例

#### 示例 1：计算器

```python
def process(data):
    try:
        result = eval(data["selection"])
        return str(result)
    except Exception as e:
        return f"计算错误: {e}"
```

#### 示例 2：排序行

```python
def process(data):
    lines = data["selection"].split('\n')
    sorted_lines = sorted(lines)
    return '\n'.join(sorted_lines)
```

#### 示例 3：移除空行

```python
def process(data):
    lines = data["selection"].split('\n')
    non_empty = [line for line in lines if line.strip()]
    return '\n'.join(non_empty)
```
