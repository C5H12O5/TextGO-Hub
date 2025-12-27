# 快速开始

## 下载安装

从 [**GitHub Releases**](https://github.com/C5H12O5/TextGO/releases) 下载对应平台的安装包，按照安装说明进行安装后即可使用。

### 系统要求

- **macOS**: macOS 11.0 或更高版本
- **Windows**: Windows 10 或更高版本

## 权限设置

### macOS 权限

在 macOS 平台，需要以下权限才能正常工作：

1. **辅助功能权限**：用于模拟键盘操作
2. **输入监控权限**：用于监听鼠标事件

应用使用期间，系统会自动提示授予这些权限。你也可以手动在"系统设置" > "隐私与安全性"中进行配置。

### 常见问题

<details>
<summary>macOS 安装后打开提示"App 已损坏，无法打开。"</summary>

可以在终端运行以下命令解决：

```bash
sudo xattr -r -d com.apple.quarantine /Applications/TextGO.app
```

</details>

<details>
<summary>macOS 安装后打开提示"Apple 无法检查 App 是否包含恶意软件。"</summary>

可以按照以下步骤解决：

1. 打开"系统设置" > "隐私与安全性"
2. 在"安全性"部分找到被阻止的应用
3. 点击"仍要打开"按钮
4. 输入你的登录密码后点击确认

</details>

## 首次运行

完成安装并授予必要权限后：

1. 从"应用程序"文件夹（macOS）或"开始"菜单（Windows）启动 TextGO
2. 应用将在系统托盘中运行
3. 从设置菜单配置你的偏好
4. 开始使用快捷键或鼠标触发进行文本处理

## 下一步

- 了解 [功能特性](/zh-cn/guide/features) 来掌握 TextGO 的能力
- 探索 [开发指南](/zh-cn/guide/development) 如果你想贡献或扩展 TextGO
