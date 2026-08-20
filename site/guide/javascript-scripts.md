# Run JavaScript Scripts

Use JavaScript for custom text transformations, WebView APIs, and keyboard automation.

## Feature Overview

JavaScript scripts can:

- Process selected text and clipboard content
- Use WebView helpers or a configured Node.js or Deno runtime
- Simulate keys and cross-platform keyboard shortcuts

## Runtime Environment

TextGO runs JavaScript in the app's WebView by default. If you configure a custom Node.js or Deno executable, TextGO uses that runtime instead. Node.js takes precedence when both paths are configured. Without a custom runtime, TextGO tries system Node.js and then Deno only if WebView execution fails.

Scripts that reference `_keyboard` always run in the WebView because keyboard simulation is only available there.

**Available environments:**

- **WebView**: Default environment; standard WebView APIs such as `fetch` remain available, and TextGO adds `_` and `_keyboard`
- **Node.js**: Used when its custom runtime path is configured
- **Deno**: Used when its custom runtime path is configured
- **System fallback**: If WebView execution fails and no custom runtime is configured, tries Node.js and then Deno

You can configure custom runtime paths from the Script Execution options:

![TextGO script runtime options](/screenshots/en/script-runtime-options.png)

## Create a JavaScript Script

### Step 1: Access Script Management

1. Open "Settings" > "Script Execution"
2. Click the "+" button to add a new script

### Step 2: Basic Information

**Script Name** (Required)

- Identifies the script
- Use a descriptive name

**Script Icon** (Optional)

- Choose an icon from the built-in library
- You can also upload a custom SVG icon

**Script Type**

- Select **JavaScript**

![TextGO JavaScript script editor](/screenshots/en/javascript-script-editor.png)

### Step 3: Write the Script

JavaScript scripts must contain a `process` function:

```javascript
function process(data) {
  // data.clipboard - Clipboard content
  // data.selection - Selected text
  // data.datetime - Execution time in ISO 8601 format

  // Return processed text
  return '';
}
```

**Parameters:**

- `data`: Input object
  - `data.clipboard`: Current clipboard text content
  - `data.selection`: Selected text content
  - `data.datetime`: Execution time in ISO 8601 format

**Return value:**

- Strings are returned directly; other serializable values are converted to JSON
- WebView scripts may define `process` as an `async` function
- Can return an empty string

## WebView APIs

WebView scripts can use these predefined globals:

- `_`: Utility functions from `es-toolkit`
- `_keyboard`: Keyboard simulation

### Simulate Keyboard Input

`_keyboard.press()` supports a single key or a key with modifiers:

```javascript
_keyboard.press(key);
_keyboard.press(modifiers, key);
```

- `key`: A single character or a supported key name
- `modifiers`: An array of modifier names

Supported key names include `Enter`/`Return`, `Tab`, `Escape`/`Esc`, `Space`, `Backspace`, `Delete`/`Del`, arrow keys such as `ArrowUp`, `Home`, `End`, `PageUp`, `PageDown`, and `F1` through `F12`. Key and modifier names are case-insensitive.

Modifier aliases:

| Modifier | Aliases                                             |
| -------- | --------------------------------------------------- |
| Command  | `Meta`, `Cmd`, `Command`, `Super`, `Win`, `Windows` |
| Control  | `Control`, `Ctrl`                                   |
| Alt      | `Alt`, `Option`                                     |
| Shift    | `Shift`                                             |

For cross-platform shortcuts, join one Command alias and one Control alias with `Or`, in either order. For example, `CmdOrCtrl`, `CommandOrControl`, and `ControlOrWindows` use Command on macOS and Control on Windows.

```javascript
function process(data) {
  _keyboard.press(['CmdOrCtrl'], 'c');
  return data.selection;
}
```

TextGO executes multiple calls in order and waits for the keyboard queue before completing the script. A failed key operation fails the script. Because keyboard actions have side effects, these scripts do not generate toolbar previews.

## Use a JavaScript Script

After creating a script, add it to a shortcut rule:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select the JavaScript script in "Execute Action"
4. Save the rule

## JavaScript Script Examples

### Example 1: Text Reversal

```javascript
function process(data) {
  return [...data.selection].reverse().join('');
}
```

### Example 2: Character Count

```javascript
function process(data) {
  return [...data.selection].length;
}
```

### Example 3: Remove Duplicate Lines

```javascript
function process(data) {
  const lines = data.selection.split('\n');
  const unique = [...new Set(lines)];
  return unique.join('\n');
}
```

### Example 4: Word Frequency

This example uses the WebView-only `_` global provided by `es-toolkit`.

```javascript
function process(data) {
  const words = data.selection.toLowerCase().match(/\p{L}+/gu) ?? [];
  return _.countBy(words, (word) => word);
}
```

### Example 5: Save the Current Document

This example uses `_keyboard` and automatically runs in the WebView.

```javascript
function process() {
  _keyboard.press(['CmdOrCtrl'], 's');
  return '';
}
```
