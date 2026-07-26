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

Search existing issues before submitting a new one.

### 1. Report Bugs

Use this template to report a bug on [GitHub Issues](https://github.com/C5H12O5/TextGO/issues):

```markdown
**Describe the bug**
Briefly describe the problem.

**To Reproduce**
List the steps to reproduce it.

**Environment**

- OS: [e.g., macOS 26]
- Version: [e.g., v1.0.0]

**Screenshots (optional)**
Attach screenshots or recordings.
```

### 2. Feature Suggestions

Use this template to suggest a feature on [GitHub Issues](https://github.com/C5H12O5/TextGO/issues):

```markdown
**What feature would you like to add?**
Clearly describe the feature.

**Why do you need this feature?**
Explain why it would be useful.

**Additional context (optional)**
Provide any other relevant information.
```

## Submit a Pull Request

### 1. Prepare Development Environment

**Required tools:** Node.js, pnpm, Rust, Git

```bash
# After forking the project, clone your repository
git clone https://github.com/YOUR_USERNAME/TextGO.git
cd TextGO

# Install dependencies
pnpm install
```

### 2. Development and Testing

```bash
# Start development server
pnpm tauri dev

# Enable debug logs (macOS/Linux)
RUST_LOG=debug pnpm tauri dev

# Enable debug logs (Windows PowerShell)
$env:RUST_LOG="debug"; pnpm tauri dev

# Build production version
pnpm tauri build
```

### 3. Create Branch and Develop

```bash
# Update and create feature branch
git checkout main
git pull upstream main
git checkout -b feature/my-new-feature  # or fix/bug-description
```

**Code standards:**

- TypeScript: Follow the Prettier and ESLint rules; run `pnpm lint`
- Rust: Format with `cargo fmt` and check with `cargo clippy`

### 4. Commit Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
git add .
git commit -m "feat: add keyboard shortcut customization"
# or fix/docs/refactor/perf/test/chore etc.
```

### 5. Submit Pull Request

```bash
# Push to your repository
git push origin feature/my-new-feature
```

Create a pull request on GitHub. Describe what changed and why, and reference related issues.

## Documentation Contribution

### Improve Existing Documentation

1. Find errors or unclear parts
2. Edit the corresponding `.md` file
3. Submit a pull request

### Translate Documentation to Other Languages

1. Copy the English documentation to a new language directory
2. Translate content
3. Keep structure consistent
4. Submit a pull request
