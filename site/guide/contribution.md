# Contribution Guide

Thank you for your interest in contributing to TextGO! This guide will help you understand how to participate in the project.

## Ways to Contribute

You can contribute to TextGO in the following ways:

- 🐛 **Report Bugs**: Discover issues and submit Issues
- 💡 **Suggest Features**: Share your ideas and feature requests
- 📝 **Improve Documentation**: Enhance documentation and examples
- 🔧 **Fix Issues**: Submit Pull Requests to fix bugs
- ✨ **Add Features**: Develop new features
- 🌍 **Help Translate**: Help translate the interface and documentation
- 📚 **Share Scripts**: Share your custom scripts and regular expressions

## Submit Issue

Please search existing Issues before submitting to avoid duplicates.

### 1. Report Bugs

Follow the template below to submit a bug report on [GitHub Issues](https://github.com/C5H12O5/TextGO/issues):

```markdown
**Describe the bug**
Briefly describe the issue

**To Reproduce**
Provide steps to reproduce

**Environment**
- OS: [e.g., macOS 26]
- Version: [e.g., v1.0.0]

**Screenshots (optional)**
Attach screenshots or recordings
```

### 2. Feature Suggestions

Follow the template below to submit feature suggestions on [GitHub Issues](https://github.com/C5H12O5/TextGO/issues):

```markdown
**What feature would you like to add?**
Clearly describe the feature you want

**Why do you need this feature?**
Explain the necessity of the feature

**Additional context (optional)**
Provide any additional information
```

## Submit Pull Request

### 1. Prepare Development Environment

**Required Tools**: Node.js, pnpm, Rust, Git

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

**Code Standards**:
- TypeScript: Follow Prettier and ESLint rules, run `pnpm lint` to check
- Rust: Use `cargo fmt` to format, `cargo clippy` to check

### 4. Commit Changes

Use [Conventional Commits](https://www.conventionalcommits.org/) specification:

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

Create PR on GitHub, clearly describe the changes and reasons, reference Issue numbers if applicable

## Documentation Contribution

### Improve Existing Documentation

1. Find errors or unclear parts
2. Modify in the corresponding `.md` file
3. Submit PR

### Translate Documentation to Other Languages

1. Copy English documentation to new language directory
2. Translate content
3. Keep structure consistent
4. Submit PR
