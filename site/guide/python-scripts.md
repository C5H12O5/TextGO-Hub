# Execute Python Scripts

TextGO supports using Python to write custom scripts for text processing. Python has a rich third-party library ecosystem, making it ideal for handling complex data processing, scientific computing, and text analysis tasks.

## Feature Overview

Python scripts allow you to:

- Use Python to process text
- Leverage the rich Python third-party library ecosystem

## Runtime Environment

TextGO automatically detects Python environments on your system.

**Supported Python Versions**:

- Python 3.9+

**Auto-detection Paths**:

- TextGO automatically detects available runtimes on your system
- Custom runtime paths can be specified in settings

## Create Python Script

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

- Select **Python**

### Step 3: Write Your Script

Python scripts must include a `process` function:

```python
def process(data):
    # data["clipboard"] - Clipboard content
    # data["selection"] - Selected text

    # Return processed text
    return ""
```

**Parameter description**:

- `data`: Dictionary containing input data
  - `data["clipboard"]`: Current clipboard text content
  - `data["selection"]`: Selected text content

**Return value**:

- Must return a string
- Returned content will be the processing result
- Can return an empty string

## Use Python Script

After creating the script, you can use it in shortcut rules:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select your created Python script in "Execute Action"
4. Save the rule

## Python Script Examples

#### Example 1: Calculator

```python
def process(data):
    try:
        result = eval(data["selection"])
        return str(result)
    except Exception as e:
        return f"Calculation Error: {e}"
```

#### Example 2: Sort Lines

```python
def process(data):
    lines = data["selection"].split('\n')
    sorted_lines = sorted(lines)
    return '\n'.join(sorted_lines)
```

#### Example 3: Remove Empty Lines

```python
def process(data):
    lines = data["selection"].split('\n')
    non_empty = [line for line in lines if line.strip()]
    return '\n'.join(non_empty)
```
