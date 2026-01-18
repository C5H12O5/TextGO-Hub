# Call LLM API

TextGO supports calling AI models to process text, including both local and cloud AI platforms. You can accomplish various text processing tasks like translation, rewriting, summarization, Q&A, and more.

## Feature Overview

AI actions allow you to:

- Use local or cloud AI models to process text
- Create custom prompt templates

Supported platforms:

**Local:**
- [Ollama](https://ollama.ai/)
- [LM Studio](https://lmstudio.ai/)

**Cloud:**
- [OpenRouter](https://openrouter.ai/)
- [OpenAI](https://openai.com/)
- [Anthropic](https://www.anthropic.com/)
- [Google Gemini](https://gemini.google.com/)
- [xAI](https://x.ai/)

## Create AI Action

### Step 1: Access AI Conversation Configuration

1. Open "Settings" > "AI Conversation"
2. Click the "+" button to add a new AI action

### Step 2: Basic Information

**Action Name** (Required)

- Used to identify this AI action
- Recommended to use descriptive names

**Action Icon** (Optional)

- Click the icon selector to choose an icon
- Supports built-in icon library
- Supports uploading custom SVG icons

### Step 3: Create Prompt Template

The prompt determines how AI processes your text.

**Variable Description**:

- {&#123;selection&#125;}: Selected text
- {&#123;clipboard&#125;}: Clipboard content

**Configure System Prompt (Optional)**:

The system prompt is used to set the AI's role and behavior.

## Use AI Action

After creating the prompt template, you can use it in shortcut rules:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select your created AI conversation action in "Execute Action"
4. Save the rule
