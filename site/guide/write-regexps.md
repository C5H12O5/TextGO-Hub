# Write Regular Expressions

In addition to machine learning models, TextGO also supports using regular expressions to precisely match text patterns. Regular expressions are suitable for matching text types with clear structures and rules.

## What is Regular Expression

A regular expression (Regular Expression) is a powerful tool for matching string patterns. It uses special syntax to describe the structure and characteristics of text.

## When to Use Regular Expressions

### Suitable Scenarios for Regular Expressions

✅ **Text with Clear Structure**

- Including phone numbers, ID numbers, postal codes, etc.
- Specific format codes or numbers
- Fixed format dates and times

✅ **Requires 100% Accuracy**

- Critical business domains like finance and healthcare
- Scenarios requiring strict validation

✅ **Simple and Clear Patterns**

- Cases that can be described with simple rules
- Limited and controllable variation range

### Unsuitable Scenarios for Regular Expressions

❌ **Fuzzy or Complex Patterns**

- Requires understanding contextual semantics
- Highly variable, difficult to enumerate all cases

❌ **Patterns That Need Learning**

- No clear fixed rules
- Needs to learn characteristics from many samples

## Create Regular Expression

### Step 1: Access Regex Management

1. Open "Settings" > "Regular Expressions"
2. Click the "+" button to add a new regex

### Step 2: Basic Information

**Regex Name** (Required)

- Used to identify the regular expression
- Recommend using a descriptive name

**Regex Icon** (Optional)

- Click the icon selector to choose an icon
- Supports built-in icon library
- Supports uploading custom SVG icons

### Step 3: Write Regular Expression

**Regex Pattern** (Required)

- Enter the regular expression pattern

**Match Flags** (Optional)

- `i`: Case insensitive match
- `u`: Match with full unicode
- `m`: ^ and $ match start/end of line
- `s`: Dot matches newline

## Use Regular Expression

Created regular expressions will automatically appear in the recognition type list:

1. Open "Shortcut Settings"
2. Add a new rule
3. Select your created regular expression in "Recognition Type"
4. Configure the corresponding action and save

## Regular Expression Syntax

### Basic Syntax

**Character Matching**

| Syntax   | Description                  | Example                          |
| -------- | ---------------------------- | -------------------------------- |
| `.`      | Match any single character   | `a.c` matches `abc`, `a1c`       |
| `\d`     | Match digit (0-9)            | `\d{3}` matches `123`            |
| `\D`     | Match non-digit              | `\D+` matches `abc`              |
| `\w`     | Match word character         | `\w+` matches `hello_123`        |
| `\W`     | Match non-word character     | `\W+` matches `@#$`              |
| `\s`     | Match whitespace             | `\s+` matches space, tab         |
| `\S`     | Match non-whitespace         | `\S+` matches `hello`            |
| `[abc]`  | Match a or b or c            | `[0-9]` matches any digit        |
| `[^abc]` | Not match a, b, c            | `[^0-9]` matches non-digit       |

**Quantifiers**

| Syntax  | Description      | Example                                |
| ------- | ---------------- | -------------------------------------- |
| `*`     | 0 or more times  | `ab*` matches `a`, `ab`, `abb`         |
| `+`     | 1 or more times  | `ab+` matches `ab`, `abb`              |
| `?`     | 0 or 1 time      | `ab?` matches `a`, `ab`                |
| `{n}`   | Exactly n times  | `a{3}` matches `aaa`                   |
| `{n,}`  | At least n times | `a{2,}` matches `aa`, `aaa`            |
| `{n,m}` | n to m times     | `a{2,4}` matches `aa`, `aaa`, `aaaa`   |

**Position Matching**

| Syntax | Description        | Example                                |
| ------ | ------------------ | -------------------------------------- |
| `^`    | Start of string    | `^hello` must start with hello         |
| `$`    | End of string      | `world$` must end with world           |
| `\b`   | Word boundary      | `\bword\b` matches complete word       |
| `\B`   | Non-word boundary  | `\Bword` word inside another word      |

**Grouping and Alternation**

| Syntax      | Description         | Example                           |
| ----------- | ------------------- | --------------------------------- |
| `(abc)`     | Group               | `(ab)+` matches `ab`, `abab`      |
| `a\|b`      | a or b              | `cat\|dog` matches cat or dog     |
| `(?:abc)`   | Non-capturing group | `(?:ab)+` matches but not capture |

**Escape Characters**

| Syntax | Description         |
| ------ | ------------------- |
| `\.`   | Literal dot         |
| `\*`   | Literal asterisk    |
| `\\`   | Literal backslash   |
| `\[`   | Literal left bracket|
| `\(`   | Literal left paren  |
