# Open URLs

TextGO supports custom web search actions that can open selected text in specified search engines or websites. This feature can greatly improve information search efficiency.

## Feature Overview

Web search actions allow you to:

- Specify search engines or target websites
- Choose default browser or specify a specific browser

## Create Search Action

### Step 1: Access Search Configuration

1. Open "Settings" > "Web Search"
2. Click the "+" button to add a new search action

### Step 2: Basic Information

**Search Name** (Required)

- Used to identify this search action
- Recommend using the search engine or website name

**Search Icon** (Optional)

- Click the icon selector to choose an icon
- Supports built-in icon library
- Supports uploading custom SVG icons

### Step 3: Configure Browser

**Browser Selection** (Optional)

You can specify which browser to use to open search results. If not specified, the system default browser will be used.

### Step 4: Configure Search URL

**URL Template** (Required)

Use {&#123;selection&#125;} as a placeholder to represent the selected text.

## Use Search Action

Created search actions can be used in shortcut rules:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select your created search action in "Execute Action"
4. Save the rule

## Common Templates

```
Google:
https://www.google.com/search?q={{selection}}

Bing:
https://www.bing.com/search?q={{selection}}

DuckDuckGo:
https://duckduckgo.com/?q={{selection}}

Baidu:
https://www.baidu.com/s?wd={{selection}}

Bing Translate:
https://www.bing.com/translator?text={{selection}}

Wikipedia:
https://en.wikipedia.org/wiki/{{selection}}

YouTube:
https://www.youtube.com/results?search_query={{selection}}

GitHub:
https://github.com/search?q={{selection}}

Stack Overflow:
https://stackoverflow.com/search?q={{selection}}
```
