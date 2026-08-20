# Call an LLM API

TextGO connects to local and cloud AI models for translation, rewriting, summarization, Q&A, and other text-processing tasks.

## Feature Overview

Prompt templates can:

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
- [Gemini](https://gemini.google.com/)
- [xAI](https://x.ai/)

Under "Custom Providers", enter "Name", "Base URL", and "API Key" to add an OpenAI-compatible provider.

Open "Model Provider Options" from the "AI Conversation" page to configure local service addresses, cloud API keys, and custom providers:

![TextGO model provider options](/screenshots/en/model-provider-options.png)

## Create a Prompt Template

### Step 1: Access AI Conversation Configuration

1. Open "Settings" > "AI Conversation"
2. Click the "+" button to open the "New Prompt Template" dialog

### Step 2: Basic Information

**Action Name** (Required)

- Identifies the prompt template
- Use a descriptive name

**Action Icon** (Optional)

- Click the current action icon to open the icon selector
- Select from "Built-in Icons" or use "Upload Custom SVG"

**Model Provider** (Required)

- Select a local, cloud, or custom model provider
- Configure an API key under "Model Provider Options" before selecting a cloud provider

**Model Name** (Required)

- Enter the model name used by the provider

### Step 3: Create a Prompt Template

**Prompt** (Required)

The prompt determines how AI processes your text.

**Variables:**

- {&#123;selection&#125;}: Selected text
- {&#123;clipboard&#125;}: Clipboard content
- {&#123;datetime&#125;}: Execution time in ISO 8601 format

**More Options** (Optional):

- **System Prompt**: Defines the AI's role and behavior
- **Max Tokens**: The maximum number of tokens that can be used in the generated response
- **Temperature**: Controls the randomness of generated text; higher values produce more random output
- **Top-P**: Controls the diversity of the generated text by nucleus sampling

![TextGO AI prompt editor](/screenshots/en/ai-prompt-editor.png)

## Use a Prompt Template

After creating a prompt template, add it to a shortcut rule:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select the prompt template in "Execute Action"
4. Save the rule

Prompt templates always open the result in a popup, where the conversation can continue.
