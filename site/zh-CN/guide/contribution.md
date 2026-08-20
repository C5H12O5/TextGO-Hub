# 贡献指南

感谢你为 TextGO 做出贡献。本指南介绍参与项目的方式。

## 贡献方式

- 🐛 **报告 Bug**：发现问题并提交 Issue
- 💡 **提出建议**：分享你的想法和功能需求
- 📝 **改进文档**：完善文档和示例
- 🔧 **修复问题**：提交 Pull Request 修复 Bug
- ✨ **添加功能**：开发新功能
- 🌍 **帮助翻译**：翻译界面和文档
- 📚 **分享脚本**：分享自定义脚本和正则表达式

## 提交 Issue

提交前请先搜索[现有 Issue](https://github.com/C5H12O5/TextGO/issues)，避免重复。创建 Issue 时请选择合适的[模板](https://github.com/C5H12O5/TextGO/issues/new/choose)，并按提示填写信息。

## 提交 Pull Request

### 1. 准备开发环境

**必需工具**：Node.js、pnpm、Rust、Git

```bash
# Fork 项目后，克隆你的仓库
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

**代码规范：**

- TypeScript：遵循 Prettier 和 ESLint 规则，运行 `pnpm lint`
- Rust：使用 `cargo fmt` 格式化，使用 `cargo clippy` 检查

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

在 GitHub 上创建 PR，说明更改内容和原因；如有相关 Issue，请引用编号。

## 文档贡献

### 改进现有文档

1. 发现错误或不清楚的地方
2. 修改相应的 `.md` 文件
3. 提交 PR

### 翻译文档到其他语言

1. 复制英文源文档到新语言目录
2. 翻译内容
3. 保持结构一致
4. 提交 PR
