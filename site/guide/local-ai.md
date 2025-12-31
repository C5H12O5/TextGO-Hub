# Call Local AI

TextGO supports calling local AI models to process text, currently supporting only the Ollama platform. With local AI, you can accomplish various text processing tasks like translation, rewriting, summarization, Q&A, and more, with all data processed locally to fully protect your privacy.

## Feature Overview

AI actions allow you to:

- Use local AI models to process text
- Create custom prompt templates

Supported platforms:

- [Ollama](https://ollama.ai/): Ollama is a simple and easy-to-use local AI platform that supports downloading and using various pre-trained models.

## Create AI Action

### Step 1: Access AI Conversation Configuration

1. Open "Settings" > "AI Conversation"
2. Click the "+" button to add a new AI action

### Step 2: Basic Information

**Action Name** (Required)

- Used to identify this AI action
- Recommend using the model name or function description

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

1. Open "Settings" > "Shortcuts"
2. Add or edit a rule
3. Select your created AI conversation action in "Execute Action"
4. Save the rule
