# 常见问题

以下是 TextGO 常见问题及解决方法。

<details class="faq-item">
<summary>1. macOS 提示“App 已损坏，无法打开”。</summary>

<br>

_在终端运行以下命令：_

```bash
sudo xattr -r -d com.apple.quarantine /Applications/TextGO.app
```

</details>

<details class="faq-item">
<summary>2. macOS 提示“Apple 无法检查 App 是否包含恶意软件”。</summary>

<br>

_按以下步骤操作：_

1. 打开“系统设置”>“隐私与安全性”
2. 在“安全性”部分找到被阻止的应用
3. 点击“仍要打开”
4. 输入登录密码并确认

</details>

<details class="faq-item">
<summary>3. macOS 更新后辅助功能权限失效。</summary>

<br>

_TextGO 是未签名应用，macOS 会将辅助功能权限与当前二进制文件绑定。应用更新后，二进制文件的身份发生变化，原有权限随之失效，即使系统设置中仍显示为已启用。_

_重新授权：_

1. 打开“系统设置”>“隐私与安全性”>“辅助功能”
2. 选中 TextGO，点击“−”按钮将其移除
3. 点击“+”按钮重新添加 TextGO

</details>
