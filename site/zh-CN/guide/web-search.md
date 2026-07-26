# 网页搜索

自定义网页搜索动作可使用选中文本在指定搜索引擎或网站中发起查询。

## 功能概述

网页搜索动作可以：

- 指定搜索引擎或目标网站
- 使用默认浏览器或指定浏览器

## 创建搜索动作

### 步骤 1：进入搜索配置

1. 打开“设置”>“网页搜索”
2. 点击“+”按钮添加搜索动作

### 步骤 2：基本信息

**搜索名称**（必填）

- 标识搜索动作
- 建议使用搜索引擎或网站的名称

**搜索图标**（可选）

- 从内置图标库中选择图标
- 也可以上传自定义 SVG 图标

### 步骤 3：配置浏览器

**浏览器选择**（可选）

指定打开搜索结果的浏览器；留空则使用系统默认浏览器。

### 步骤 4：配置搜索 URL

**URL 模板**（必填）

使用 {&#123;selection&#125;} 作为选中文本的占位符。TextGO 会先去除选中文本首尾的空白并完成 URL 编码，再替换模板中的所有同名占位符。

![TextGO 网页搜索动作编辑窗口](/screenshots/zh-CN/web-search-editor.png)

## 使用搜索动作

创建搜索动作后，将其添加到快捷键规则：

1. 打开“全局快捷键”
2. 添加一条新规则
3. 在“执行动作”中选择创建的搜索动作
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
