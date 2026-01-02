# Execute JavaScript Scripts

TextGO supports using JavaScript to write custom scripts for text processing. JavaScript scripts can perform various complex text transformation and processing operations, greatly extending TextGO's capabilities.

## Feature Overview

JavaScript scripts allow you to:

- Use JavaScript to process text
- Leverage the rich JavaScript standard library and ecosystem

## Runtime Environment

TextGO uses Node.js or Deno to run JavaScript scripts.

**Supported Runtimes**:

- **Node.js**: The most widely used JavaScript runtime
- **Deno**: Modern, secure JavaScript/TypeScript runtime

**Auto-Detection**:

- TextGO automatically detects available runtimes on your system
- Node.js is prioritized; if unavailable, Deno is used
- Custom runtime paths can be specified in settings

## Create JavaScript Script

### Step 1: Access Script Management

1. Open "Settings" > "Script Execution"
2. Click the "+" button to add a new script

### Step 2: Basic Information

**Script Name** (Required)

- Used to identify this script
- Recommend using a descriptive name

**Script Icon** (Optional)

- Click the icon selector to choose an icon
- Supports built-in icon library
- Supports uploading custom SVG icons

**Script Type**

- Select **JavaScript**

### Step 3: Write the Script

JavaScript scripts must contain a `process` function:

```javascript
function process(data) {
  // data.clipboard - Clipboard content
  // data.selection - Selected text

  // Return processed text
  return '';
}
```

**Parameter Description**:

- `data`: Object containing input data
  - `data.clipboard`: Current clipboard text content
  - `data.selection`: Selected text content

**Return Value**:

- Must return a string
- Returned content serves as the processing result
- Can return an empty string

## Use JavaScript Script

After creating the script, you can use it in shortcut rules:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select your created JavaScript script in "Execute Action"
4. Save the rule

## JavaScript Script Examples

#### Example 1: Text Reversal

```javascript
function process(data) {
  return data.selection.split('').reverse().join('');
}
```

#### Example 2: Character Count

```javascript
function process(data) {
  const text = data.selection.trim();
  return text.length;
}
```

#### Example 3: Remove Duplicate Lines

```javascript
function process(data) {
  const lines = data.selection.split('\n');
  const unique = [...new Set(lines)];
  return unique.join('\n');
}
```
