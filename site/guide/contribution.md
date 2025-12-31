# Contribution Guide

Thank you for your interest in contributing to TextGO! This guide will help you understand how to participate in the project development.

## Ways to Contribute

You can contribute to TextGO in the following ways:

- 🐛 **Report Bugs**: Discover issues and submit Issues
- 💡 **Suggest Features**: Share your ideas and feature requests
- 📝 **Improve Documentation**: Enhance documentation and examples
- 🔧 **Fix Issues**: Submit Pull Requests to fix bugs
- ✨ **Add Features**: Develop new features
- 🌍 **Translation**: Help translate the interface and documentation
- 📚 **Share Scripts**: Share your custom scripts and regular expressions

## Before You Start

### 1. Get Familiar with the Project

- Read the [README](../../../README.md) to understand the project background
- Browse existing [Issues](https://github.com/chenjiahan/TextGO/issues) and [Pull Requests](https://github.com/chenjiahan/TextGO/pulls)
- Review the [Project Structure](#project-structure)

### 2. Development Environment Requirements

**Required**:

- Node.js 18+
- pnpm 8+
- Rust 1.70+
- Git

**Recommended**:

- VS Code or other code editor
- macOS / Linux / Windows development environment

### 3. Fork and Clone the Project

```bash
# 1. Fork the project to your GitHub account

# 2. Clone your forked repository
git clone https://github.com/YOUR_USERNAME/TextGO.git
cd TextGO

# 3. Add upstream repository
git remote add upstream https://github.com/chenjiahan/TextGO.git

# 4. Verify remote repositories
git remote -v
```

## Development Environment Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
pnpm install

# Install Rust dependencies (automatic)
```

### 2. Development Mode

```bash
# Start development server
pnpm tauri dev
```

This will:

- Start Vite development server (frontend)
- Compile Rust code (backend)
- Open application window
- Support hot reload

### 3. Build Application

```bash
# Build production version
pnpm tauri build

# Build output location:
# macOS: src-tauri/target/release/bundle/
# Windows: src-tauri/target/release/bundle/
# Linux: src-tauri/target/release/bundle/
```

### 4. Code Checking

```bash
# Frontend code checking
pnpm lint

# Frontend code formatting
pnpm format

# TypeScript type checking
pnpm check

# Rust code checking
cd src-tauri
cargo clippy

# Rust code formatting
cargo fmt
```

## Project Structure

```
TextGO/
├── src/                      # Frontend code (Svelte)
│   ├── lib/                  # Core library
│   │   ├── classifier.ts     # Machine learning classifier
│   │   ├── matcher.ts        # Text matcher
│   │   ├── executor.ts       # Executor
│   │   └── ...
│   ├── components/           # Svelte components
│   ├── routes/               # Routes (SvelteKit)
│   └── App.svelte            # Main application component
│
├── src-tauri/                # Backend code (Rust + Tauri)
│   ├── src/
│   │   ├── main.rs           # Main entry
│   │   ├── commands/         # Tauri commands
│   │   │   ├── executor.rs   # Script execution
│   │   │   └── ...
│   │   └── ...
│   ├── Cargo.toml            # Rust dependencies
│   └── tauri.conf.json       # Tauri configuration
│
├── docs/                     # Documentation
│   ├── zh-CN/                # Chinese documentation
│   └── en/                   # English documentation
│
├── static/                   # Static resources
├── package.json              # Frontend dependencies
├── svelte.config.js          # Svelte configuration
├── vite.config.ts            # Vite configuration
└── tsconfig.json             # TypeScript configuration
```

### Key Module Description

#### Frontend (src/)

**`lib/classifier.ts`** - Machine learning text classification

- Uses TensorFlow.js
- One-Class Classification
- Multi-granularity tokenization

**`lib/matcher.ts`** - Text recognition matching

- Regular expression matching
- Machine learning model matching
- Language detection
- Built-in recognition types

**`lib/executor.ts`** - Executor system

- Script execution
- URL opening
- AI calling
- Output processing

**`components/`** - UI components

- Settings component (settings interface)
- Toolbar component (toolbar)
- Various input and configuration components

#### Backend (src-tauri/)

**`commands/executor.rs`** - Script execution backend

- JavaScript execution (Node.js/Deno)
- Python execution
- Process management
- Security sandbox

**`main.rs`** - Tauri main program

- Window management
- System tray
- Global shortcuts
- Application lifecycle

## Development Guide

### Frontend Development

#### 1. Adding New Features

**Steps**:

1. Create new module or modify existing module in `src/lib/`
2. Add UI components in `src/components/`
3. Update type definitions (if needed)
4. Add tests
5. Update documentation

**Example: Adding new recognition type**

```typescript
// src/lib/matcher.ts

export const BUILTIN_TYPES = {
  // ... existing types

  // New type
  credit_card: {
    name: 'Credit Card Number',
    regex: /^(?:\d{4}[-\s]?){3}\d{4}$/,
    description: '16-digit credit card number'
  }
};
```

#### 2. Creating Svelte Components

```svelte
<!-- src/components/MyComponent.svelte -->
<script lang="ts">
  export let title: string;
  export let onSave: () => void;

  let value = '';

  function handleSubmit() {
    // Processing logic
    onSave();
  }
</script>

<div class="my-component">
  <h2>{title}</h2>
  <input bind:value />
  <button on:click={handleSubmit}>Save</button>
</div>

<style>
  .my-component {
    /* Styles */
  }
</style>
```

#### 3. Calling Rust Backend

```typescript
// Frontend calling Tauri command
import { invoke } from '@tauri-apps/api/tauri';

async function executeScript(script: string, data: any) {
  try {
    const result = await invoke('execute_script', {
      scriptType: 'javascript',
      scriptContent: script,
      data: data
    });
    return result;
  } catch (error) {
    console.error('Script execution failed:', error);
    throw error;
  }
}
```

### Backend Development

#### 1. Adding Tauri Commands

```rust
// src-tauri/src/commands/my_command.rs

use tauri::command;

#[command]
pub fn my_command(arg: String) -> Result<String, String> {
    // Processing logic
    Ok(format!("Processed: {}", arg))
}

// src-tauri/src/main.rs
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            // ... existing commands
            my_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### 2. Handling Async Operations

```rust
use tokio::runtime::Runtime;

#[command]
pub async fn async_command() -> Result<String, String> {
    // Async operation
    let result = tokio::time::sleep(
        std::time::Duration::from_secs(1)
    ).await;

    Ok("Done".to_string())
}
```

#### 3. Error Handling

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum MyError {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Custom error: {0}")]
    Custom(String),
}

#[command]
pub fn safe_command() -> Result<String, MyError> {
    // ... code that might error

    Ok("Success".to_string())
}
```

### Testing

#### 1. Frontend Unit Testing

```typescript
// src/lib/__tests__/classifier.test.ts
import { describe, it, expect } from 'vitest';
import { Classifier } from '../classifier';

describe('Classifier', () => {
  it('should train and predict correctly', () => {
    const classifier = new Classifier();

    // Train
    classifier.train(['example text 1', 'example text 2']);

    // Predict
    const result = classifier.predict('example text 3');
    expect(result).toBeGreaterThan(0.5);
  });
});
```

Run tests:

```bash
pnpm test
```

#### 2. Rust Unit Testing

```rust
// src-tauri/src/commands/executor.rs

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_execute_script() {
        let result = execute_script(
            "javascript".to_string(),
            "function process(data) { return 'test'; }".to_string(),
            serde_json::json!({"selection": "test"})
        );

        assert!(result.is_ok());
    }
}
```

Run tests:

```bash
cd src-tauri
cargo test
```

## Code Standards

### TypeScript / JavaScript

- Use TypeScript for type annotations
- Follow Prettier formatting rules
- Use ESLint to check code quality
- Variables and functions use camelCase
- Types and interfaces use PascalCase
- Constants use UPPER_SNAKE_CASE

**Examples**:

```typescript
// ✅ Good practice
interface UserConfig {
  name: string;
  age: number;
}

function processUserData(config: UserConfig): string {
  return `${config.name} is ${config.age} years old`;
}

// ❌ Avoid
function ProcessUserData(Config) {
  return Config.name + ' is ' + Config.age + ' years old';
}
```

### Rust

- Follow official Rust code style
- Use `cargo fmt` for formatting
- Use `cargo clippy` for checking
- Variables and functions use snake_case
- Types and traits use PascalCase
- Constants use UPPER_SNAKE_CASE

**Examples**:

```rust
// ✅ Good practice
pub struct UserConfig {
    pub name: String,
    pub age: u32,
}

pub fn process_user_data(config: &UserConfig) -> String {
    format!("{} is {} years old", config.name, config.age)
}

// ❌ Avoid
pub fn ProcessUserData(Config: &UserConfig) -> String {
    Config.name.clone() + " is " + &Config.age.to_string() + " years old"
}
```

### Svelte

- Component files use PascalCase
- Props use camelCase
- Event handlers use `handle` prefix
- Styles use scoped (default)

**Examples**:

```svelte
<script lang="ts">
  // Props
  export let userName: string;
  export let onSave: (name: string) => void;

  // Local state
  let isEditing = false;

  // Event handlers
  function handleEdit() {
    isEditing = true;
  }

  function handleSave() {
    onSave(userName);
    isEditing = false;
  }
</script>
```

## Commit Standards

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting (does not affect functionality)
- `refactor`: Refactoring
- `perf`: Performance optimization
- `test`: Testing related
- `chore`: Build/toolchain

**Examples**:

```bash
# New feature
git commit -m "feat(classifier): add support for multi-class classification"

# Bug fix
git commit -m "fix(executor): resolve script timeout issue"

# Documentation
git commit -m "docs: update installation guide for Windows"

# Refactoring
git commit -m "refactor(matcher): simplify regex matching logic"
```

### Creating Pull Requests

1. **Create branch**:

   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/bug-description
   ```

2. **Make changes**:
   - Write code
   - Add tests
   - Update documentation

3. **Commit changes**:

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Sync upstream**:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push to fork**:

   ```bash
   git push origin feature/my-new-feature
   ```

6. **Create Pull Request**:
   - Visit your forked repository
   - Click "New Pull Request"
   - Fill in PR template
   - Submit

### Pull Request Checklist

Before submitting PR, ensure:

- [ ] Code passes all tests
- [ ] Code follows project standards
- [ ] Added necessary tests
- [ ] Updated relevant documentation
- [ ] Commit messages follow conventions
- [ ] No unrelated changes
- [ ] PR description is clear and complete

## Reporting Bugs

### 1. Search Existing Issues

Before creating a new Issue, search for similar problems.

### 2. Use Bug Report Template

```markdown
### Description

Brief description of the problem

### Reproduction Steps

1. Open application
2. Perform certain operation
3. Observe error

### Expected Behavior

What should happen

### Actual Behavior

What actually happened

### Environment Information

- OS: macOS 14.0
- TextGO version: 1.0.0
- Other relevant information

### Screenshots/Logs

If necessary, attach screenshots or logs
```

### 3. Provide Detailed Information

- Clear title
- Detailed reproduction steps
- System and version information
- Error logs
- Screenshots or screen recordings

## Feature Suggestions

### 1. Use Feature Request Template

```markdown
### Feature Description

Clearly describe the feature you want

### Use Cases

What problem does this feature solve? Who will use it?

### Suggested Implementation

If you have ideas, describe them

### Alternatives

Have you considered other solutions?

### Additional Information

Other relevant information
```

### 2. Discuss First

For large features, recommend discussing in Discussions first.

## Documentation Contribution

### Improving Existing Documentation

1. Find errors or unclear areas
2. Modify in the corresponding `.md` file
3. Submit PR

### Adding New Documentation

1. Create new file in `docs/zh-CN/guide/` or `docs/en/guide/`
2. Update sidebar configuration
3. Submit PR

### Translating Documentation

1. Copy Chinese documentation to English directory
2. Translate content
3. Keep structure consistent
4. Submit PR

## Community

### Code of Conduct

- Respect all contributors
- Use friendly, inclusive language
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy toward other community members

### Getting Help

- **GitHub Discussions**: Ask questions and discuss
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: View project documentation

### Stay Connected

- ⭐ Star the project to get updates
- 👀 Watch the project to receive notifications
- 🔔 Subscribe to Release notifications

## License

By contributing code to TextGO, you agree that your contributions will be released under the [MIT License](../../../LICENSE).

## Acknowledgments

Thank you to all developers who have contributed to TextGO!

- [Contributors List](https://github.com/chenjiahan/TextGO/graphs/contributors)

---

Thank you again for your contribution! If you have any questions, feel free to ask on GitHub.
