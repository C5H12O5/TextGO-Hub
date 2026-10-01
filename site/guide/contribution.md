# Contribution Guide

Thank you for contributing to TextGO. This guide explains how to get involved.

## Ways to Contribute

- 🐛 **Report Bugs**: Submit an issue when you find a problem
- 💡 **Suggest Features**: Share your ideas and feature requests
- 📝 **Improve Documentation**: Refine guides and examples
- 🔧 **Fix Issues**: Submit pull requests that fix bugs
- ✨ **Add Features**: Develop new features
- 🌍 **Help Translate**: Translate the interface and documentation
- 📚 **Share Scripts**: Share custom scripts and regular expressions

## Submit an Issue

Search [existing issues](https://github.com/C5H12O5/TextGO/issues) before submitting to avoid duplicates. When creating an issue, choose the appropriate [template](https://github.com/C5H12O5/TextGO/issues/new/choose) and provide the requested information.

## Submit a Pull Request

### 1. Prepare Development Environment

**Required tools:** Node.js LTS, pnpm 11, Rust stable, Git

Develop and verify desktop behavior on macOS or Windows; the current platform implementation and release builds do not cover Linux. The frontend uses Svelte 5 / SvelteKit 2, and the desktop backend uses Tauri 2 / Rust.

```bash
# After forking the project, clone your repository
git clone https://github.com/YOUR_USERNAME/TextGO.git
cd TextGO
git remote add upstream https://github.com/C5H12O5/TextGO.git

# Install dependencies
pnpm install
```

### 2. Development and Testing

```bash
# Start the full desktop development environment
pnpm tauri dev

# Enable debug logs (macOS)
RUST_LOG=debug pnpm tauri dev

# Enable debug logs (Windows PowerShell)
$env:RUST_LOG="debug"; pnpm tauri dev

# Build production version
pnpm tauri build
```

Use `pnpm dev` for the frontend alone (port 1420). A regular browser has no Tauri APIs, so verify desktop features with `pnpm tauri dev`.

### 3. Create Branch and Develop

```bash
# Update and create feature branch
git checkout main
git pull upstream main
git checkout -b feature/my-new-feature  # or fix/bug-description
```

**Code standards:**

- Frontend: Run `pnpm check` and `pnpm lint`; also run `pnpm build` for build configuration, dependencies, lazy loading, or new UI messages
- Rust: Run `cargo fmt --manifest-path ./src-tauri/Cargo.toml`, `cargo clippy --manifest-path ./src-tauri/Cargo.toml -- -D warnings`, and relevant tests with `cargo test --manifest-path ./src-tauri/Cargo.toml`
- UI messages: Update both `messages/en.json` and `messages/zh-CN.json`. Do not edit generated files in `src/lib/paraglide/`; if new messages cause missing-export errors, run `pnpm build` before checking again
- Verify affected mouse and keyboard triggers, Quiet and Toolbar modes, output, and settings persistence. AI changes also need streaming and cancellation checks. State which platforms were tested and any gaps in the PR

Format only changed files, for example with `pnpm exec prettier --write <changed-files>`, to avoid rewriting unrelated files.

### 4. Commit Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
git add .
git commit -m "feat: add keyboard shortcut customization"
# or fix/docs/refactor/perf/test/chore, etc.
```

### 5. Submit Pull Request

```bash
# Push to your repository
git push origin feature/my-new-feature
```

Create a pull request on GitHub. Describe what changed and why, and reference related issues.

## Documentation Contribution

The documentation is maintained in the [TextGO Hub](https://github.com/C5H12O5/TextGO-Hub) repository. Fork and clone that repository before making the changes below.

### Improve Existing Documentation

1. Find errors or unclear parts
2. Edit the corresponding guides in `site/guide/` and `site/zh-CN/guide/`, keeping the English and Chinese instructions aligned
3. Run `pnpm install` from the TextGO Hub root, then `pnpm exec prettier --check <changed-files>` and `pnpm build` to verify formatting, links, and the site build
4. Submit a pull request

### Translate Documentation to Other Languages

1. Copy the English documentation to a new language directory
2. Translate content
3. Keep structure consistent
4. Submit a pull request
