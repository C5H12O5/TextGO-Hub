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

**必需工具**：Node.js LTS、pnpm 11、Rust stable、Git

请在 macOS 或 Windows 上开发并验证桌面行为；当前平台实现和发布构建不覆盖 Linux。前端使用 Svelte 5 / SvelteKit 2，桌面端使用 Tauri 2 / Rust。

```bash
# Fork 项目后，克隆你的仓库
git clone https://github.com/YOUR_USERNAME/TextGO.git
cd TextGO
git remote add upstream https://github.com/C5H12O5/TextGO.git

# 安装依赖
pnpm install
```

### 2. 开发和测试

```bash
# 启动完整桌面开发环境
pnpm tauri dev

# 启用调试日志（macOS）
RUST_LOG=debug pnpm tauri dev

# 启用调试日志（Windows PowerShell）
$env:RUST_LOG="debug"; pnpm tauri dev

# 构建生产版本
pnpm tauri build
```

仅启动前端可使用 `pnpm dev`（端口 1420），但普通浏览器不具备 Tauri API，桌面功能仍需通过 `pnpm tauri dev` 验证。

### 3. 创建分支并开发

```bash
# 更新并创建功能分支
git checkout main
git pull upstream main
git checkout -b feature/my-new-feature  # 或 fix/bug-description
```

**代码规范：**

- 前端：运行 `pnpm check` 和 `pnpm lint`；涉及构建配置、依赖、按需加载或新增界面文案时补跑 `pnpm build`
- Rust：运行 `cargo fmt --manifest-path ./src-tauri/Cargo.toml`、`cargo clippy --manifest-path ./src-tauri/Cargo.toml -- -D warnings` 和相关的 `cargo test --manifest-path ./src-tauri/Cargo.toml`
- 界面文案：同步 `messages/en.json` 和 `messages/zh-CN.json`，不手改生成的 `src/lib/paraglide/`；新增文案后若检查缺少消息导出，先运行 `pnpm build` 再检查
- 按改动验证鼠标和快捷键触发、静默与工具栏模式、输出及设置持久化；AI 改动还需验证流式回复和取消。PR 中说明实际验证的平台及未覆盖项

格式化只针对修改文件，例如 `pnpm exec prettier --write <变更文件>`，避免顺带改写整个仓库。

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

文档维护在 [TextGO Hub](https://github.com/C5H12O5/TextGO-Hub) 仓库中。进行以下修改前，请先 Fork 并克隆该仓库。

### 改进现有文档

1. 发现错误或不清楚的地方
2. 修改 `site/guide/` 与 `site/zh-CN/guide/` 中对应的文档，保持中英文说明一致
3. 在 TextGO Hub 根目录运行 `pnpm install`，再运行 `pnpm exec prettier --check <变更文件>` 和 `pnpm build`，检查格式、链接和站点构建
4. 提交 PR

### 翻译文档到其他语言

1. 复制英文源文档到新语言目录
2. 翻译内容
3. 保持结构一致
4. 提交 PR
