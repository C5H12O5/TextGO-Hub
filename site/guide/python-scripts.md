# Run Python Scripts

Use Python and its third-party libraries for data processing, scientific computing, and text analysis.

## Feature Overview

Python scripts can:

- Use Python to process text
- Use third-party Python libraries

## Runtime Environment

TextGO uses the custom Python executable configured in Script Execution options when provided. Otherwise, it tries `python3` and then `python`, using the system `PATH` plus common installation locations.

**Supported Python Versions**:

- Python 3.9+

Packages imported by a script must be installed in the Python environment selected by TextGO.

## Create a Python Script

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

- Select **Python**

![TextGO Python script editor](/screenshots/en/python-script-editor.png)

### Step 3: Write Your Script

Python scripts must include a `process` function:

```python
def process(data):
    # data["clipboard"] - Clipboard content
    # data["selection"] - Selected text
    # data["datetime"] - Execution time in ISO 8601 format

    # Return processed text
    return ""
```

**Parameters:**

- `data`: Input dictionary
  - `data["clipboard"]`: Current clipboard text content
  - `data["selection"]`: Selected text content
  - `data["datetime"]`: Execution time in ISO 8601 format

**Return value:**

- Strings are returned directly; other serializable values are converted to JSON
- Can return an empty string

## Use a Python Script

After creating a script, add it to a shortcut rule:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select the Python script in "Execute Action"
4. Save the rule

## Python Script Examples

### Example 1: Word Count

```python
def process(data):
    return len(data["selection"].split())
```

### Example 2: Sort Lines

```python
def process(data):
    lines = data["selection"].split("\n")
    sorted_lines = sorted(lines)
    return "\n".join(sorted_lines)
```

### Example 3: Remove Empty Lines

```python
def process(data):
    lines = data["selection"].split("\n")
    non_empty = [line for line in lines if line.strip()]
    return "\n".join(non_empty)
```
