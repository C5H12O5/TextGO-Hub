# 开发指南

## 前置要求

开始开发之前，确保你已安装以下内容：

1. **Rust**：从 [rustup.rs](https://rustup.rs/) 安装
2. **Node.js**：18 或更高版本
3. **pnpm**：使用 `npm install -g pnpm` 全局安装

关于特定平台的详细前置要求，请参考 [Tauri 官方文档](https://v2.tauri.app/start/prerequisites/)。

## 搭建开发环境

1. 克隆仓库：

```bash
git clone https://github.com/C5H12O5/TextGO.git
cd TextGO
```

2. 安装依赖：

```bash
pnpm install
```

3. 运行开发模式：

```bash
pnpm tauri dev
```

### 启用调试日志

**类 Unix 系统（macOS、Linux）：**

```bash
RUST_LOG=debug pnpm tauri dev
```

**Windows PowerShell：**

```powershell
$env:RUST_LOG="debug"; pnpm tauri dev
```

## 项目结构

```
TextGO/
├── src/                    # Svelte 前端源码
│   ├── lib/               # 共享组件和工具
│   └── routes/            # 应用路由
├── src-tauri/             # Rust 后端源码
│   ├── src/               # Rust 源文件
│   └── Cargo.toml         # Rust 依赖
├── static/                # 静态资源
└── package.json           # Node.js 依赖
```

## 构建

构建生产版本：

```bash
pnpm tauri build
```

构建好的安装包将位于 `src-tauri/target/release/bundle/` 目录。

## 技术栈

- **前端**：Svelte 5 + TypeScript
- **后端**：Rust + Tauri v2
- **样式**：现代 CSS 特性
- **构建工具**：Vite

## 贡献

我们欢迎贡献！以下是你可以提供帮助的方式：

1. Fork 仓库
2. 创建特性分支（`git checkout -b feature/amazing-feature`）
3. 提交你的更改（`git commit -m 'Add some amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开 Pull Request

### 编码指南

- 遵循现有代码风格
- 编写清晰的提交消息
- 为复杂逻辑添加注释
- 彻底测试你的更改

## 调试技巧

### 前端调试

1. 在开发模式下打开 DevTools（自动可用）
2. 使用 `console.log()` 进行调试
3. 检查 Network 选项卡查看 API 调用

### 后端调试

1. 使用 `RUST_LOG=debug` 启用调试日志
2. 在 Rust 代码中使用 `dbg!()` 宏
3. 在终端中检查应用日志

## 资源

- [Tauri 文档](https://v2.tauri.app/)
- [Svelte 文档](https://svelte.dev/)
- [Rust 程序设计语言](https://doc.rust-lang.org/book/)

## 开源协议

本项目基于 GPLv3 开源协议发布。详见 [LICENSE](https://github.com/C5H12O5/TextGO/blob/main/LICENSE) 文件。

## 特别鸣谢

本项目基于众多优秀的开源项目构建而成。完整的第三方依赖列表及其开源协议请查看 [LICENSES.md](https://github.com/C5H12O5/TextGO/blob/main/LICENSES.md) 文件。
