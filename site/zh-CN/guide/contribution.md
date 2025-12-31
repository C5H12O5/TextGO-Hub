# 贡献指南

感谢你有兴趣为 TextGO 做出贡献！本指南将帮助你了解如何参与项目开发。

## 贡献方式

你可以通过以下方式为 TextGO 做出贡献：

- 🐛 **报告 Bug**：发现问题并提交 Issue
- 💡 **提出建议**：分享你的想法和功能需求
- 📝 **改进文档**：完善文档和示例
- 🔧 **修复问题**：提交 Pull Request 修复 Bug
- ✨ **添加功能**：开发新功能
- 🌍 **翻译**：帮助翻译界面和文档
- 📚 **分享脚本**：分享你的自定义脚本和正则表达式

## 开始之前

### 1. 熟悉项目

- 阅读 [README](../../../README.zh-CN.md) 了解项目背景
- 浏览现有的 [Issues](https://github.com/chenjiahan/TextGO/issues) 和 [Pull Requests](https://github.com/chenjiahan/TextGO/pulls)
- 查看 [项目结构](#项目结构)

### 2. 开发环境要求

**必需**：

- Node.js 18+
- pnpm 8+
- Rust 1.70+
- Git

**推荐**：

- VS Code 或其他代码编辑器
- macOS / Linux / Windows 开发环境

### 3. Fork 和 Clone 项目

```bash
# 1. Fork 项目到你的 GitHub 账号

# 2. Clone 你 Fork 的仓库
git clone https://github.com/YOUR_USERNAME/TextGO.git
cd TextGO

# 3. 添加上游仓库
git remote add upstream https://github.com/chenjiahan/TextGO.git

# 4. 验证远程仓库
git remote -v
```

## 开发环境设置

### 1. 安装依赖

```bash
# 安装前端依赖
pnpm install

# 安装 Rust 依赖（自动完成）
```

### 2. 开发模式

```bash
# 启动开发服务器
pnpm tauri dev
```

这会：

- 启动 Vite 开发服务器（前端）
- 编译 Rust 代码（后端）
- 打开应用窗口
- 支持热重载

### 3. 构建应用

```bash
# 构建生产版本
pnpm tauri build

# 构建产物位置：
# macOS: src-tauri/target/release/bundle/
# Windows: src-tauri/target/release/bundle/
# Linux: src-tauri/target/release/bundle/
```

### 4. 代码检查

```bash
# 前端代码检查
pnpm lint

# 前端代码格式化
pnpm format

# TypeScript 类型检查
pnpm check

# Rust 代码检查
cd src-tauri
cargo clippy

# Rust 代码格式化
cargo fmt
```

## 项目结构

```
TextGO/
├── src/                      # 前端代码（Svelte）
│   ├── lib/                  # 核心库
│   │   ├── classifier.ts     # 机器学习分类器
│   │   ├── matcher.ts        # 文本匹配器
│   │   ├── executor.ts       # 执行器
│   │   └── ...
│   ├── components/           # Svelte 组件
│   ├── routes/               # 路由（SvelteKit）
│   └── App.svelte            # 主应用组件
│
├── src-tauri/                # 后端代码（Rust + Tauri）
│   ├── src/
│   │   ├── main.rs           # 主入口
│   │   ├── commands/         # Tauri 命令
│   │   │   ├── executor.rs   # 脚本执行
│   │   │   └── ...
│   │   └── ...
│   ├── Cargo.toml            # Rust 依赖
│   └── tauri.conf.json       # Tauri 配置
│
├── docs/                     # 文档
│   ├── zh-CN/                # 中文文档
│   └── en/                   # 英文文档
│
├── static/                   # 静态资源
├── package.json              # 前端依赖
├── svelte.config.js          # Svelte 配置
├── vite.config.ts            # Vite 配置
└── tsconfig.json             # TypeScript 配置
```

### 关键模块说明

#### 前端（src/）

**`lib/classifier.ts`** - 机器学习文本分类

- 使用 TensorFlow.js
- 单类分类器（One-Class Classification）
- 多粒度 Token 化

**`lib/matcher.ts`** - 文本识别匹配

- 正则表达式匹配
- 机器学习模型匹配
- 语言检测
- 内置识别类型

**`lib/executor.ts`** - 执行器系统

- 脚本执行
- URL 打开
- AI 调用
- 输出处理

**`components/`** - UI 组件

- Settings 组件（设置界面）
- Toolbar 组件（工具栏）
- 各种输入和配置组件

#### 后端（src-tauri/）

**`commands/executor.rs`** - 脚本执行后端

- JavaScript 执行（Node.js/Deno）
- Python 执行
- 进程管理
- 安全沙箱

**`main.rs`** - Tauri 主程序

- 窗口管理
- 系统托盘
- 全局快捷键
- 应用生命周期

## 开发指南

### 前端开发

#### 1. 添加新功能

**步骤**：

1. 在 `src/lib/` 创建新模块或修改现有模块
2. 在 `src/components/` 添加 UI 组件
3. 更新类型定义（如需要）
4. 添加测试
5. 更新文档

**示例：添加新的识别类型**

```typescript
// src/lib/matcher.ts

export const BUILTIN_TYPES = {
  // ... 现有类型

  // 新增类型
  credit_card: {
    name: '信用卡号',
    regex: /^(?:\d{4}[-\s]?){3}\d{4}$/,
    description: '16位信用卡号码'
  }
};
```

#### 2. 创建 Svelte 组件

```svelte
<!-- src/components/MyComponent.svelte -->
<script lang="ts">
  export let title: string;
  export let onSave: () => void;

  let value = '';

  function handleSubmit() {
    // 处理逻辑
    onSave();
  }
</script>

<div class="my-component">
  <h2>{title}</h2>
  <input bind:value />
  <button on:click={handleSubmit}>保存</button>
</div>

<style>
  .my-component {
    /* 样式 */
  }
</style>
```

#### 3. 调用 Rust 后端

```typescript
// 前端调用 Tauri 命令
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

### 后端开发

#### 1. 添加 Tauri 命令

```rust
// src-tauri/src/commands/my_command.rs

use tauri::command;

#[command]
pub fn my_command(arg: String) -> Result<String, String> {
    // 处理逻辑
    Ok(format!("Processed: {}", arg))
}

// src-tauri/src/main.rs
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            // ... 现有命令
            my_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

#### 2. 处理异步操作

```rust
use tokio::runtime::Runtime;

#[command]
pub async fn async_command() -> Result<String, String> {
    // 异步操作
    let result = tokio::time::sleep(
        std::time::Duration::from_secs(1)
    ).await;

    Ok("Done".to_string())
}
```

#### 3. 错误处理

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
    // ... 可能出错的代码

    Ok("Success".to_string())
}
```

### 测试

#### 1. 前端单元测试

```typescript
// src/lib/__tests__/classifier.test.ts
import { describe, it, expect } from 'vitest';
import { Classifier } from '../classifier';

describe('Classifier', () => {
  it('should train and predict correctly', () => {
    const classifier = new Classifier();

    // 训练
    classifier.train(['example text 1', 'example text 2']);

    // 预测
    const result = classifier.predict('example text 3');
    expect(result).toBeGreaterThan(0.5);
  });
});
```

运行测试：

```bash
pnpm test
```

#### 2. Rust 单元测试

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

运行测试：

```bash
cd src-tauri
cargo test
```

## 代码规范

### TypeScript / JavaScript

- 使用 TypeScript 进行类型标注
- 遵循 Prettier 格式化规则
- 使用 ESLint 检查代码质量
- 变量和函数使用 camelCase
- 类型和接口使用 PascalCase
- 常量使用 UPPER_SNAKE_CASE

**示例**：

```typescript
// ✅ 好的实践
interface UserConfig {
  name: string;
  age: number;
}

function processUserData(config: UserConfig): string {
  return `${config.name} is ${config.age} years old`;
}

// ❌ 避免
function ProcessUserData(Config) {
  return Config.name + ' is ' + Config.age + ' years old';
}
```

### Rust

- 遵循 Rust 官方代码风格
- 使用 `cargo fmt` 格式化
- 使用 `cargo clippy` 检查
- 变量和函数使用 snake_case
- 类型和 trait 使用 PascalCase
- 常量使用 UPPER_SNAKE_CASE

**示例**：

```rust
// ✅ 好的实践
pub struct UserConfig {
    pub name: String,
    pub age: u32,
}

pub fn process_user_data(config: &UserConfig) -> String {
    format!("{} is {} years old", config.name, config.age)
}

// ❌ 避免
pub fn ProcessUserData(Config: &UserConfig) -> String {
    Config.name.clone() + " is " + &Config.age.to_string() + " years old"
}
```

### Svelte

- 组件文件使用 PascalCase
- Props 使用 camelCase
- 事件处理函数使用 `handle` 前缀
- 样式使用 scoped（默认）

**示例**：

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

## 提交规范

### Commit Message 格式

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）**：

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链

**示例**：

```bash
# 新功能
git commit -m "feat(classifier): add support for multi-class classification"

# Bug 修复
git commit -m "fix(executor): resolve script timeout issue"

# 文档
git commit -m "docs: update installation guide for Windows"

# 重构
git commit -m "refactor(matcher): simplify regex matching logic"
```

### 创建 Pull Request

1. **创建分支**：

   ```bash
   git checkout -b feature/my-new-feature
   # 或
   git checkout -b fix/bug-description
   ```

2. **进行更改**：
   - 编写代码
   - 添加测试
   - 更新文档

3. **提交更改**：

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **同步上游**：

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **推送到 Fork**：

   ```bash
   git push origin feature/my-new-feature
   ```

6. **创建 Pull Request**：
   - 访问你的 Fork 仓库
   - 点击 "New Pull Request"
   - 填写 PR 模板
   - 提交

### Pull Request 检查清单

在提交 PR 前，确保：

- [ ] 代码通过所有测试
- [ ] 代码符合项目规范
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] Commit 消息符合规范
- [ ] 没有不相关的更改
- [ ] PR 描述清晰完整

## 报告 Bug

### 1. 搜索现有 Issues

在创建新 Issue 前，先搜索是否已有类似问题。

### 2. 使用 Bug Report 模板

```markdown
### 描述

简要描述问题

### 复现步骤

1. 打开应用
2. 执行某操作
3. 观察到错误

### 预期行为

应该发生什么

### 实际行为

实际发生了什么

### 环境信息

- OS: macOS 14.0
- TextGO 版本: 1.0.0
- 其他相关信息

### 截图/日志

如有必要，附上截图或日志
```

### 3. 提供详细信息

- 清晰的标题
- 详细的复现步骤
- 系统和版本信息
- 错误日志
- 截图或录屏

## 功能建议

### 1. 使用 Feature Request 模板

```markdown
### 功能描述

清晰描述你想要的功能

### 使用场景

这个功能解决什么问题？谁会用到？

### 建议的实现方式

如果有想法，可以描述一下

### 替代方案

是否考虑过其他解决方案？

### 附加信息

其他相关信息
```

### 2. 讨论优先

对于大型功能，建议先在 Discussions 中讨论。

## 文档贡献

### 改进现有文档

1. 发现错误或不清楚的地方
2. 在相应的 `.md` 文件中修改
3. 提交 PR

### 添加新文档

1. 在 `docs/zh-CN/guide/` 或 `docs/en/guide/` 创建新文件
2. 更新侧边栏配置
3. 提交 PR

### 翻译文档

1. 复制中文文档到英文目录
2. 翻译内容
3. 保持结构一致
4. 提交 PR

## 社区

### 行为准则

- 尊重所有贡献者
- 使用友善、包容的语言
- 接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 获取帮助

- **GitHub Discussions**：提问和讨论
- **GitHub Issues**：报告 Bug 和功能请求
- **文档**：查看项目文档

### 保持联系

- ⭐ Star 项目以获取更新
- 👀 Watch 项目以接收通知
- 🔔 订阅 Release 通知

## 许可证

通过向 TextGO 贡献代码，你同意你的贡献将在 [MIT License](../../../LICENSE) 下发布。

## 感谢

感谢所有为 TextGO 做出贡献的开发者！

- [贡献者列表](https://github.com/chenjiahan/TextGO/graphs/contributors)

---

再次感谢你的贡献！如有任何问题，欢迎在 GitHub 上提问。
