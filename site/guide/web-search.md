# Web Search

Custom web search actions open a search engine or website with the selected text.

## Feature Overview

Web search actions can:

- Specify search engines or target websites
- Use the default browser or a specific browser

## Create a Search Action

### Step 1: Access Search Configuration

1. Open "Settings" > "Web Search"
2. Click the "+" button to open the "New Search Action" dialog

### Step 2: Basic Information

**Action Name** (Required)

- Identifies the search action
- Use the search engine or website name

**Action Icon** (Optional)

- Click the current action icon to open the icon selector
- Select from "Built-in Icons" or use "Upload Custom SVG"

### Step 3: Configure Browser

**Browser** (Optional)

Choose a browser for search results. Leave empty to use default browser.

### Step 4: Configure Search URL

**Search URL** (Required)

Use {&#123;selection&#125;} to insert selected text. TextGO trims the selection and URL-encodes it before replacing every occurrence of the placeholder in the URL.

![TextGO web search action editor](/screenshots/en/web-search-editor.png)

## Use a Search Action

After creating a search action, add it to a shortcut rule:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select the search action in "Execute Action"
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
