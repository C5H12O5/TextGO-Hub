# 常见问题

本页面收集了 TextGO 使用过程中的常见问题和解决方案。

<details class="faq-item">
<summary>1. macOS 安装后打开提示"App 已损坏，无法打开。"</summary>

<br>

_可以在终端运行以下命令解决：_

```bash
sudo xattr -r -d com.apple.quarantine /Applications/TextGO.app
```

</details>

<details class="faq-item">
<summary>2. macOS 安装后打开提示"Apple 无法检查 App 是否包含恶意软件。"</summary>

<br>

_可以按照以下步骤解决：_

1. 打开"系统设置" > "隐私与安全性"
2. 在"安全性"部分找到被阻止的应用
3. 点击"仍要打开"按钮
4. 输入你的登录密码后点击确认

</details>

<details class="faq-item">
<summary>3. macOS 更新后辅助功能权限失效。</summary>

<br>

_TextGO 是未签名应用，macOS 将辅助功能权限与当前二进制文件绑定。每次更新后，新的二进制文件身份发生变化，导致原有权限失效——即使系统设置中仍显示为已勾选状态。_

_可以按照以下步骤解决：_

1. 打开"系统设置" > "隐私与安全性" > "辅助功能"
2. 选中 TextGO 点击"−"按钮将其移除
3. 点击"+"按钮重新添加 TextGO

</details>
