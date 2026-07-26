# Execute JavaScript Scripts

TextGO supports using JavaScript to write custom scripts for text processing. JavaScript scripts can perform various complex text transformation and processing operations, greatly extending TextGO's capabilities.

## Feature Overview

JavaScript scripts allow you to:

- Process selected text and clipboard content
- Use WebView helpers or a configured Node.js/Deno runtime
- Simulate keys and cross-platform keyboard shortcuts

## Runtime Environment

TextGO runs JavaScript in the app's WebView by default. If you configure a custom Node.js or Deno executable in settings, TextGO uses that runtime instead. Without a custom runtime, TextGO falls back to the system Node.js and then Deno only when WebView execution fails.

Scripts that reference `_keyboard` always run in the WebView because keyboard simulation is only available there.

**Available Environments**:

- **WebView**: Default environment; provides `fetch`, `_`, and `_keyboard`
- **Node.js**: Used when its custom runtime path is configured
- **Deno**: Used when its custom runtime path is configured
- **System fallback**: Tries Node.js first, then Deno

You can configure custom runtime paths from the Script Execution options:

![TextGO script runtime options](/screenshots/en/script-runtime-options.png)

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

**Parameter Description**:

- `data`: Object containing input data
  - `data.clipboard`: Current clipboard text content
  - `data.selection`: Selected text content
  - `data.datetime`: Execution time in ISO 8601 format

**Return Value**:

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

Supported key names include `Enter`, `Tab`, `Escape`, `Space`, `Backspace`, `Delete`, arrow keys, `Home`, `End`, `PageUp`, `PageDown`, and `F1` through `F12`.

Modifier aliases:

| Modifier | Aliases                                             |
| -------- | --------------------------------------------------- |
| Command  | `Meta`, `Cmd`, `Command`, `Super`, `Win`, `Windows` |
| Control  | `Control`, `Ctrl`                                   |
| Alt      | `Alt`, `Option`                                     |
| Shift    | `Shift`                                             |

For cross-platform shortcuts, join one Command alias and one Control alias with `Or`. The aliases are case-insensitive and may appear in either order. For example, `CmdOrCtrl`, `CommandOrControl`, and `ControlOrWindows` use Command on macOS and Control on Windows and other platforms.

```javascript
function process(data) {
  _keyboard.press(['CmdOrCtrl'], 'c');
  return data.selection;
}
```

Multiple calls are executed in order, and TextGO waits for the keyboard queue before completing the script. A failed key operation fails the script. Because keyboard actions have side effects, TextGO does not run these scripts to generate toolbar previews.

## Use JavaScript Script

After creating the script, you can use it in shortcut rules:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select your created JavaScript script in "Execute Action"
4. Save the rule

## JavaScript Script Examples

### Example 1: Text Reversal

```javascript
function process(data) {
  return data.selection.split('').reverse().join('');
}
```

### Example 2: Character Count

```javascript
function process(data) {
  const text = data.selection.trim();
  return text.length;
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
