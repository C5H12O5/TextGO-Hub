# Register Shortcuts

TextGO supports three types of trigger methods: keyboard shortcuts, mouse double-click, and drag selection. Each method can be configured with independent rules. This guide will detail how to register and manage shortcuts.

## Add Shortcuts

### Step 1: Access Shortcut Settings

1. Click the system tray icon
2. Select "Manage Shortcuts"
3. Click the "Register Shortcut" button in the upper right corner

### Step 2: Select Shortcut Type

Choose a shortcut type from the dropdown list:

- **Double-Click**
- **Drag-Select**
- **Keyboard**

### Step 3: Add Rules

In the rule list below the corresponding shortcut, click the "+" button to add a new rule and configure the following:

#### 1. Recognition Type

Select the text type to recognize, with the following options:

**Skip Recognition**

Applies to all text without requiring recognition

**Built-in Types**

- General: Common text types including email, URL, etc.
- Text Case: Code naming formats including camelCase, snake_case, etc.
- Natural Language: Natural language text including English, Chinese, etc.
- Programming Language: Code snippets in programming languages including JavaScript, Python, etc.

**Custom Types**

- Regular Expression: Match specific text using custom regular expressions
- Machine Learning Model: Perform text classification using pre-trained machine learning models

#### 2. Execute Action

Select the action to execute after text recognition:

**Built-in Actions**

- Copy: Copy text to clipboard
- General: Common operations including opening links, opening files, etc.
- Convert Case: Convert between naming formats such as camelCase and snake_case
- Text Processing: Text processing operations including trimming spaces, etc.

**Custom Actions**

- Search: Search text content using a specified search engine
- Script: Execute custom JavaScript or Python scripts to process text
- AI Conversation: Process text content using local AI models

#### 3. Advanced Options

**Toolbar Display**

- Set whether to display icon or label in the toolbar
- Set whether to display execution results in the toolbar

**Execution Result**

- Choose the output mode for results
  - **Replace**: Execution result directly replaces selected text
  - **Popup**: Display execution result in a popup window for further editing or copying
- Set whether to save results to history
- Set whether to automatically copy results to clipboard

## Manage Shortcuts

### Edit Rules

1. Click the edit icon on the right side of a rule to modify the rule configuration
2. Select a rule and click the delete icon to delete that rule

### Adjust Order

After selecting a rule, you can adjust the rule execution order using the up and down arrow buttons. The rule order has the following effects:

1. In quiet mode, rules are matched sequentially from top to bottom
2. In toolbar mode, rules are displayed in the toolbar from top to bottom

## Switch Execution Mode

TextGO provides two execution modes: **Quiet Mode** and **Toolbar Mode**. Different modes are suitable for different usage scenarios, and choosing wisely can significantly improve work efficiency.

### Quiet Mode

After selecting text and triggering, the **action is executed immediately** without requiring additional operations.

**Features**:

- Fast and efficient, seamless workflow
- Suitable for deterministic processing tasks
- No interface interruption, focus on current work

**Applicable Scenarios**:

- Simple text conversion operations (e.g., naming style conversion)
- Clear action commands (e.g., opening URLs, copying text)
- Scenarios requiring quick consecutive operations

### Toolbar Mode

After selecting text and triggering, a **floating toolbar is displayed** where you can choose from multiple actions.

**Features**:

- Intuitive visual interface
- Supports multiple processing methods
- Allows previewing execution results

**Applicable Scenarios**:

- When the same text has multiple optional processing methods
- When you need to preview processing results before making a decision
- When uncertain which action to use
