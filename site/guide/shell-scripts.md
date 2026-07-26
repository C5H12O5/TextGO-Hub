# Run Shell Scripts

Use Shell or PowerShell scripts for file operations, system commands, and text processing.

## Feature Overview

Shell and PowerShell scripts can:

- Process text with shell commands
- Leverage system utilities and command-line tools
- Execute platform-specific operations

## Runtime Environment

TextGO provides the script type appropriate for the current operating system:

- **macOS**: Shell scripts run with `sh`
- **Windows**: PowerShell scripts run with `powershell`

## Create a Shell Script

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

- Select **Shell** on macOS or **PowerShell** on Windows

![TextGO Shell script editor](/screenshots/en/shell-script-editor.png)

### Step 3: Write Your Script

Shell and PowerShell scripts receive predefined variables.

**Available variables:**

- `${clipboard}`: Clipboard content
- `${selection}`: Selected text
- `${datetime}`: Execution time in ISO 8601 format

**Output:**

- Standard output (`stdout`) becomes the processing result
- Use `echo` or a similar command to output processed text

## Use a Shell Script

After creating a script, add it to a shortcut rule:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select the Shell or PowerShell script in "Execute Action"
4. Save the rule
