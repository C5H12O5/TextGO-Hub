# 打开网址

TextGO 支持自定义网络搜索动作，可以将选中的文本在指定的搜索引擎或网站中打开。这个功能可以极大地提升信息查找的效率。

## 功能概述

网络搜索动作允许你：

- 指定搜索引擎或目标网站
- 选择默认浏览器或指定特定浏览器

## 创建搜索动作

### 步骤 1：进入搜索配置

1. 打开"设置" > "网页搜索"
2. 点击"+"号添加新搜索动作

### 步骤 2：基本信息

**搜索名称**（必填）

- 用于标识这个搜索动作
- 建议使用搜索引擎或网站的名称

**搜索图标**（可选）

- 点击图标选择器选择图标
- 支持内置图标库
- 支持上传自定义 SVG 图标

### 步骤 3：配置浏览器

**浏览器选择**（可选）

可以指定使用哪个浏览器打开搜索结果。如果不指定，则使用系统默认浏览器。

### 步骤 4：配置搜索 URL

**URL 模板**（必填）

使用 {&#123;selection&#125;} 作为占位符,表示选中的文本。

## 使用搜索动作

创建好搜索动作后，可以在快捷键规则中使用：

1. 打开"快捷键设置"
2. 添加一条新规则
3. 在"执行动作"中选择你创建的搜索动作
4. 保存规则

## 常用模板

```
Google:
https://www.google.com/search?q={{selection}}

Bing:
https://www.bing.com/search?q={{selection}}

DuckDuckGo:
https://duckduckgo.com/?q={{selection}}

百度:
https://www.baidu.com/s?wd={{selection}}

必应翻译:
https://www.bing.com/translator?text={{selection}}

维基百科:
https://zh.wikipedia.org/wiki/{{selection}}

YouTube:
https://www.youtube.com/results?search_query={{selection}}

GitHub:
https://github.com/search?q={{selection}}

Stack Overflow:
https://stackoverflow.com/search?q={{selection}}
```
