# 贡献指南

感谢你有兴趣为 TextGO 做出贡献！本指南将帮助你了解如何参与项目。

## 贡献方式

你可以通过以下方式为 TextGO 做出贡献：

- 🐛 **报告 Bug**：发现问题并提交 Issue
- 💡 **提出建议**：分享你的想法和功能需求
- 📝 **改进文档**：完善文档和示例
- 🔧 **修复问题**：提交 Pull Request 修复 Bug
- ✨ **添加功能**：开发新功能
- 🌍 **帮助翻译**：帮助翻译界面和文档
- 📚 **分享脚本**：分享你的自定义脚本和正则表达式

## 提交 Issue

提交前请先搜索现有 Issues，避免重复。

### 1. 报告 Bug

参考以下模板在 [GitHub Issues](https://github.com/C5H12O5/TextGO/issues) 上提交 Bug 报告：

```markdown
**问题描述**
简要描述问题

**复现步骤**
提供复现步骤

**系统信息**
- 系统：[例如 macOS 26]
- 版本：[例如 v1.0.0]

**截屏（可选）**
附上截图或录屏
```

### 2. 功能建议

参考以下模板在 [GitHub Issues](https://github.com/C5H12O5/TextGO/issues) 上提交功能建议：

```markdown
**希望添加什么功能？**
清晰描述你想要的功能

**为什么需要这个功能？**
说明该功能的必要性

**补充说明（可选）**
提供任何额外信息
```

## 提交 Pull Request

### 1. 准备开发环境

**必需工具**：Node.js、pnpm、Rust、Git

```bash
# Fork 项目后，Clone 你的仓库
git clone https://github.com/YOUR_USERNAME/TextGO.git
cd TextGO

# 安装依赖
pnpm install
```

### 2. 开发和测试

```bash
# 启动开发服务器
pnpm tauri dev

# 启用调试日志（macOS/Linux）
RUST_LOG=debug pnpm tauri dev

# 启用调试日志（Windows PowerShell）
$env:RUST_LOG="debug"; pnpm tauri dev

# 构建生产版本
pnpm tauri build
```

### 3. 创建分支并开发

```bash
# 更新并创建功能分支
git checkout main
git pull upstream main
git checkout -b feature/my-new-feature  # 或 fix/bug-description
```

**代码规范**：
- TypeScript：遵循 Prettier 和 ESLint 规则，运行 `pnpm lint` 检查
- Rust：使用 `cargo fmt` 格式化，`cargo clippy` 检查

### 4. 提交更改

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
git add .
git commit -m "feat: add keyboard shortcut customization"
# 或 fix/docs/refactor/perf/test/chore 等类型
```

### 5. 提交 Pull Request

```bash
# 推送到你的仓库
git push origin feature/my-new-feature
```

在 GitHub 上创建 PR，清晰描述更改内容和原因，如有相关 Issue 请引用编号

## 文档贡献

### 改进现有文档

1. 发现错误或不清楚的地方
2. 在相应的 `.md` 文件中修改
3. 提交 PR

### 翻译文档到其他语言

1. 复制中文文档到新语言目录
2. 翻译内容
3. 保持结构一致
4. 提交 PR
