# 调用 LLM API

TextGO 可以调用本地或在线 AI 模型，完成翻译、改写、摘要和问答等任务。

## 功能概述

AI 动作可以：

- 使用本地或在线 AI 模型处理文本
- 创建自定义提示词模板

支持的平台：

**本地：**

- [Ollama](https://ollama.ai/)
- [LM Studio](https://lmstudio.ai/)

**在线：**

- [OpenRouter](https://openrouter.ai/)
- [OpenAI](https://openai.com/)
- [Anthropic](https://www.anthropic.com/)
- [Google Gemini](https://gemini.google.com/)
- [xAI](https://x.ai/)

还可以填写提供商名称、Base URL 和 API Key，添加兼容 OpenAI 接口的自定义提供商。

在模型提供商选项中配置本地服务地址、云端 API Key 和自定义提供商：

![TextGO 模型提供商选项](/screenshots/zh-CN/model-provider-options.png)

## 创建 AI 动作

### 步骤 1：进入 AI 对话配置

1. 打开“设置”>“AI 对话”
2. 点击“+”按钮添加 AI 动作

### 步骤 2：基本信息

**动作名称**（必填）

- 标识 AI 动作
- 建议使用描述性的名称

**动作图标**（可选）

- 从内置图标库中选择图标
- 也可以上传自定义 SVG 图标

### 步骤 3：创建提示词模板

提示词（Prompt）决定 AI 如何处理文本。

**变量说明**：

- {&#123;selection&#125;}：选中的文本
- {&#123;clipboard&#125;}：剪贴板内容
- {&#123;datetime&#125;}：ISO 8601 格式的执行时间

**配置系统提示词（可选）**：

系统提示词（System Prompt）用于定义 AI 的角色和行为。

“更多选项”还支持设置最大 Token 数、温度和 Top P。

![TextGO AI 提示词编辑窗口](/screenshots/zh-CN/ai-prompt-editor.png)

## 使用 AI 动作

创建提示词模板后，将其添加到快捷键规则：

1. 打开“全局快捷键”
2. 添加一条新规则
3. 在“执行动作”中选择创建的 AI 对话动作
4. 保存规则

AI 动作始终在弹窗中显示结果，并可在弹窗中继续对话。
