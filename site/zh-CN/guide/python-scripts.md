# 执行 Python 脚本

使用 Python 及其第三方库，可以完成数据处理、科学计算和文本分析。

## 功能概述

Python 脚本可以：

- 使用 Python 处理文本
- 使用 Python 第三方库

## 运行环境

在“执行脚本”选项中配置了自定义 Python 可执行文件时，TextGO 会优先使用该路径；否则会结合系统 `PATH` 和常见安装位置，依次尝试 `python3` 和 `python`。

**支持的 Python 版本**：

- Python 3.9+

脚本导入的第三方包必须安装在 TextGO 实际使用的 Python 环境中。

## 创建 Python 脚本

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

- 选择 **Python**

![TextGO Python 脚本编辑窗口](/screenshots/zh-CN/python-script-editor.png)

### 步骤 3：编写脚本

Python 脚本必须包含一个 `process` 函数：

```python
def process(data):
    # data["clipboard"] - 剪贴板内容
    # data["selection"] - 选中的文本
    # data["datetime"] - ISO 8601 格式的执行时间

    # 返回处理后的文本
    return ""
```

**参数说明**：

- `data`：输入数据字典
  - `data["clipboard"]`：当前剪贴板的文本内容
  - `data["selection"]`：选中的文本内容
  - `data["datetime"]`：ISO 8601 格式的执行时间

**返回值**：

- 字符串会直接返回，其他可序列化值会转换为 JSON
- 可以返回空字符串

## 使用 Python 脚本

创建脚本后，将其添加到快捷键规则：

1. 打开“全局快捷键”
2. 添加一条新规则
3. 在“执行动作”中选择创建的 Python 脚本
4. 保存规则

## Python 脚本示例

### 示例 1：计算器

```python
def process(data):
    try:
        result = eval(data["selection"])
        return str(result)
    except Exception as e:
        return f"计算错误: {e}"
```

### 示例 2：排序行

```python
def process(data):
    lines = data["selection"].split("\n")
    sorted_lines = sorted(lines)
    return "\n".join(sorted_lines)
```

### 示例 3：去除空行

```python
def process(data):
    lines = data["selection"].split("\n")
    non_empty = [line for line in lines if line.strip()]
    return "\n".join(non_empty)
```
