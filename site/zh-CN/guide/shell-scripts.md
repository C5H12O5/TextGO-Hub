# 执行 Shell 脚本

使用 Shell 或 PowerShell 脚本，可以执行文件操作、系统命令和文本处理任务。

## 功能概述

Shell 和 PowerShell 脚本可以：

- 使用命令处理文本
- 利用系统工具和命令行程序
- 执行特定平台的操作

## 运行环境

TextGO 会根据当前操作系统提供对应的脚本类型：

- **macOS**：Shell 脚本使用 `sh` 运行
- **Windows**：PowerShell 脚本使用 `powershell` 运行

## 创建 Shell 脚本

### 步骤 1：进入脚本管理

1. 打开“设置”>“执行脚本”
2. 点击“+”按钮打开“新增脚本”窗口

### 步骤 2：基本信息

**动作名称**（必填）

- 标识脚本
- 建议使用描述性的名称

**动作图标**（可选）

- 点击当前动作图标打开图标选择窗口
- 可选择“内置图标”或“上传自定义 SVG”

**脚本类型**（必填）

- macOS 上选择 **Shell**，Windows 上选择 **PowerShell**

![TextGO Shell 脚本编辑窗口](/screenshots/zh-CN/shell-script-editor.png)

### 步骤 3：编写脚本

**脚本**（必填）

Shell 和 PowerShell 脚本会接收以下预定义变量。

**可用变量**：

- `${clipboard}`：剪贴板内容
- `${selection}`：选中的文本
- `${datetime}`：ISO 8601 格式的执行时间

**输出**：

- 标准输出（`stdout`）将作为处理结果
- 使用 `echo` 或类似命令输出处理后的文本

## 使用 Shell 脚本

创建脚本后，将其添加到快捷键规则：

1. 打开“全局快捷键”
2. 添加一条新规则
3. 在“执行动作”中选择创建的 Shell 或 PowerShell 脚本
4. 保存规则
