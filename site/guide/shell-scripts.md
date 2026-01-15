# Execute Shell Scripts

TextGO supports using Shell scripts to write custom scripts for text processing. Shell scripts provide powerful system integration capabilities, making them ideal for file operations, system commands, and text manipulation tasks.

## Feature Overview

Shell scripts allow you to:

- Use Shell commands to process text
- Leverage system utilities and command-line tools
- Execute platform-specific operations

## Runtime Environment

TextGO automatically detects and uses the appropriate shell environment based on your operating system.

- **macOS**: Shell
- **Windows**: PowerShell

## Create Shell Script

### Step 1: Access Script Management

1. Open "Settings" > "Script Execution"
2. Click the "+" button to add a new script

### Step 2: Basic Information

**Script Name** (Required)

- Used to identify this script
- Recommended to use descriptive names

**Script Icon** (Optional)

- Click the icon selector to choose an icon
- Supports built-in icon library
- Supports uploading custom SVG icons

**Script Type**

- Select **Shell/PowerShell**

### Step 3: Write Your Script

Shell scripts can access selected text through predefined variables.

**Available Variables**:

- `${clipboard}`: Clipboard content
- `${selection}`: Selected text

**Output**:

- The script's standard output (stdout) will be used as the processing result
- Use `echo` or similar commands to output the processed text

## Use Shell Script

After creating the script, you can use it in shortcut rules:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select your created Shell script in "Execute Action"
4. Save the rule
