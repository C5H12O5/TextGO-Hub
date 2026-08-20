# Call an LLM API

TextGO connects to local and cloud AI models for translation, rewriting, summarization, Q&A, and other text-processing tasks.

## Feature Overview

AI actions can:

- Use local or cloud AI models to process text
- Create custom prompt templates

Supported model providers:

**Local:**

- [Ollama](https://ollama.ai/)
- [LM Studio](https://lmstudio.ai/)

**Cloud:**

- [OpenRouter](https://openrouter.ai/)
- [OpenAI](https://openai.com/)
- [Anthropic](https://www.anthropic.com/)
- [Google Gemini](https://gemini.google.com/)
- [xAI](https://x.ai/)

You can also add OpenAI-compatible providers by entering a name, base URL, and API key.

Configure local service addresses, cloud API keys, and custom providers from the model provider options:

![TextGO model provider options](/screenshots/en/model-provider-options.png)

## Create an AI Action

### Step 1: Access AI Conversation Configuration

1. Open "Settings" > "AI Conversation"
2. Click the "+" button to add a new AI action

### Step 2: Basic Information

**Action Name** (Required)

- Identifies the AI action
- Use a descriptive name

**Action Icon** (Optional)

- Choose an icon from the built-in library
- You can also upload a custom SVG icon

### Step 3: Create a Prompt Template

The prompt determines how AI processes your text.

**Variables:**

- {&#123;selection&#125;}: Selected text
- {&#123;clipboard&#125;}: Clipboard content
- {&#123;datetime&#125;}: Execution time in ISO 8601 format

**System prompt (optional):**

Use the system prompt to define the AI's role and behavior.

**More Options** includes maximum tokens, temperature, and top-p.

![TextGO AI prompt editor](/screenshots/en/ai-prompt-editor.png)

## Use an AI Action

After creating a prompt template, add it to a shortcut rule:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select the AI conversation action in "Execute Action"
4. Save the rule

AI actions always open the result in a popup, where the conversation can continue.
