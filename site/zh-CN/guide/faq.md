# 常见问题

本页面收集了 TextGO 使用过程中的常见问题和解决方案。

## 安装和启动

### macOS 安全提示

**问题**：首次启动时显示"无法打开应用程序"或"来自身份不明的开发者"。

**解决方案**：

1. 打开"系统设置" > "隐私与安全性"
2. 在"安全性"部分，点击"仍要打开"按钮
3. 或者，在终端中运行：
   ```bash
   xattr -cr /Applications/TextGO.app
   ```

## 权限设置

### macOS 辅助功能权限

**问题**：无法捕获快捷键或获取选中文本。

**原因**：TextGO 需要辅助功能权限来监听全局快捷键。

**解决方案**：

1. 打开"系统设置" > "隐私与安全性" > "辅助功能"
2. 找到 TextGO 并启用
3. 如果没有看到 TextGO：
   - 点击"+"号
   - 选择 TextGO 应用
   - 启用权限
4. 重启 TextGO

**验证**：

- 打开 TextGO
- 查看设置界面是否显示"✓ 辅助功能权限已授予"

## 快捷键问题

### 快捷键不生效

**问题**：注册的快捷键没有响应。

**可能原因**：

1. **权限问题**：没有授予辅助功能权限
2. **快捷键冲突**：与系统或其他应用的快捷键冲突
3. **快捷键格式**：快捷键格式不正确

**解决方案**：

1. **检查权限**：
   - macOS：查看辅助功能权限
   - Windows：以管理员身份运行
2. **避免冲突**：
   - 选择不常用的快捷键组合
   - 检查系统快捷键设置
   - 使用 Cmd/Ctrl + Shift + 字母 组合

3. **正确格式**：

   ```yaml
   # ✅ 正确
   Cmd+Shift+C    # macOS
   Ctrl+Shift+C   # Windows/Linux

   # ❌ 错误
   Command+Shift+C
   cmd+shift+c
   ```

### 鼠标快捷键不工作

**问题**：鼠标手势或点击快捷键无响应。

**解决方案**：

1. 确认已启用鼠标快捷键功能
2. 检查鼠标按键配置
3. 某些鼠标驱动可能会拦截按键
4. 尝试使用不同的鼠标按键组合

### 拖拽快捷键失败

**问题**：拖拽文本时没有触发动作。

**检查**：

1. 是否正确配置了拖拽目标
2. 拖拽区域是否在应用窗口内
3. 拖拽的内容类型是否支持

**提示**：

- 拖拽功能需要明确的目标区域
- 某些应用可能不支持拖拽操作

## 文本识别

### 识别不准确

**问题**：文本识别经常出错或匹配到错误的类型。

**原因**：

1. 正则表达式过于宽泛
2. 模型训练数据不足
3. 识别规则的优先级问题

**解决方案**：

1. **优化正则表达式**：

   ```javascript
   // ❌ 太宽泛
   /\d+/

   // ✅ 更精确
   /^https?:\/\/.+$/
   /^\d{11}$/  // 手机号
   ```

2. **增加训练样本**：
   - 为模型提供更多正确的示例
   - 包含各种变体
   - 至少 20-30 个样本

3. **调整优先级**：
   - 将更具体的规则放在前面
   - 使用排除规则避免误匹配

### 内置识别类型不够用

**问题**：需要识别的文本类型不在内置列表中。

**解决方案**：

1. **使用正则表达式**：
   - 创建自定义正则匹配规则
   - 参考 [编写正则表达式](./write-regexes.md)

2. **训练自定义模型**：
   - 收集样本数据
   - 训练机器学习模型
   - 参考 [训练模型](./train-models.md)

### 语言检测错误

**问题**：文本的语言被错误识别。

**原因**：

- 文本过短（少于 10 个字符）
- 混合语言文本
- 特殊字符较多

**解决方案**：

1. 提供更长的文本样本
2. 使用正则表达式进行预过滤
3. 手动指定语言类型

## 脚本执行

### JavaScript 脚本报错

**问题**：脚本执行时出现错误。

**常见错误**：

1. **SyntaxError**：语法错误

   ```javascript
   // 检查语法
   function process(data) {
     return data.selection.toUpperCase(); // 注意分号
   }
   ```

2. **ReferenceError**：变量未定义

   ```javascript
   // 确保所有变量都已定义
   function process(data) {
     const text = data.selection; // 使用 const 或 let
     return text;
   }
   ```

3. **TypeError**：类型错误
   ```javascript
   // 检查数据类型
   function process(data) {
     if (typeof data.selection !== 'string') {
       return '输入必须是字符串';
     }
     return data.selection.toUpperCase();
   }
   ```

**调试步骤**：

1. 使用 `console.log` 输出调试信息
2. 在脚本编辑器中测试
3. 检查错误消息的行号

### Python 脚本找不到模块

**问题**：`ModuleNotFoundError: No module named 'xxx'`

**解决方案**：

1. **确认模块已安装**：

   ```bash
   pip list | grep module_name
   ```

2. **安装缺失模块**：

   ```bash
   pip install module_name
   ```

3. **检查 Python 环境**：

   ```bash
   # 查看当前 Python 路径
   which python3

   # 查看 pip 安装位置
   pip show module_name
   ```

4. **使用虚拟环境**：
   - 创建专用虚拟环境
   - 在 TextGO 中配置虚拟环境路径
   - 参考 [Python 脚本](./python-scripts.md)

## 数据和配置

### 配置文件位置

**问题**：想要备份或迁移配置。

**配置文件路径**：

- **macOS**：`~/Library/Application Support/com.textgo.app/`
- **Windows**：`%APPDATA%\com.textgo.app\`
- **Linux**：`~/.config/textgo/`

**重要文件**：

- `config.json`：应用配置
- `shortcuts.json`：快捷键规则
- `models/`：训练的模型文件
- `scripts/`：自定义脚本

### 重置设置

**问题**：应用配置出现问题，想要重置。

**方案 1：应用内重置**

1. 打开"设置" > "高级"
2. 点击"重置所有设置"
3. 确认操作

**方案 2：手动删除配置**

```bash
# macOS
rm -rf ~/Library/Application\ Support/com.textgo.app/

# Linux
rm -rf ~/.config/textgo/

# Windows (PowerShell)
Remove-Item -Recurse -Force $env:APPDATA\com.textgo.app\
```

**注意**：重置后所有配置和数据都会丢失，请先备份！

## 更新和升级

### 检查更新

**手动检查**：

1. 打开"帮助" > "检查更新"
2. 如有新版本，点击"下载"

**自动更新**：

- 启用"自动检查更新"选项
- 应用会在启动时自动检查

### 升级失败

**问题**：更新时出现错误。

**解决方案**：

1. **重新下载安装包**：
   - 访问 [GitHub Releases](https://github.com/chenjiahan/TextGO/releases)
   - 下载最新版本
   - 手动安装

2. **清理旧版本**：

   ```bash
   # macOS
   rm -rf /Applications/TextGO.app

   # 然后重新安装
   ```

3. **检查系统要求**：
   - macOS 11.0+
   - Windows 10+
   - 现代 Linux 发行版

## 其他问题

### 日志文件位置

**查看日志**：

- **macOS**：`~/Library/Logs/com.textgo.app/`
- **Windows**：`%APPDATA%\com.textgo.app\logs\`
- **Linux**：`~/.local/share/textgo/logs/`

**日志级别**：

1. 打开"设置" > "高级" > "日志级别"
2. 选择：Error / Warning / Info / Debug

### 报告问题

**提交 Bug**：

1. 访问 [GitHub Issues](https://github.com/chenjiahan/TextGO/issues)
2. 点击"New Issue"
3. 选择"Bug Report"模板
4. 填写详细信息：
   - 系统版本
   - TextGO 版本
   - 复现步骤
   - 错误日志
   - 截图（如有）

**获取帮助**：

- GitHub Discussions
- 项目文档
- 社区论坛

### 卸载应用

**macOS**：

```bash
# 删除应用
rm -rf /Applications/TextGO.app

# 删除配置（可选）
rm -rf ~/Library/Application\ Support/com.textgo.app/
rm -rf ~/Library/Logs/com.textgo.app/
```

**Windows**：

1. 打开"设置" > "应用"
2. 找到 TextGO
3. 点击"卸载"

**Linux**：

```bash
# 删除 AppImage
rm TextGO.AppImage

# 删除配置（可选）
rm -rf ~/.config/textgo/
rm -rf ~/.local/share/textgo/
```

## 还有问题？

如果本页面没有解决你的问题：

1. **查看文档**：浏览其他文档页面
2. **搜索 Issues**：在 GitHub 上搜索类似问题
3. **提问**：在 GitHub Discussions 提问
4. **报告 Bug**：提交 Issue

## 下一步

- [贡献指南](./contribution.md) - 参与项目开发
- [快速开始](./getting-started.md) - 从头开始学习
