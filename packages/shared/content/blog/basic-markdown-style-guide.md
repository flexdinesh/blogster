---
external: false
title: "Basic markdown style guide"
description: "You can author content using the familiar markdown syntax you already know. All basic markdown syntax is supported."
date: 2022-11-02
---

Markdown is powered by [Markdoc](https://markdoc.dev/). This is an example post to demonstrate all the basic markdown syntax. You can author content using the familiar markdown syntax you already know.

## Inline formatting

Bold: **This text is bold**.

Italics: _This text is italics_.

Strikethrough: You can ~~strikethrough~~ text.

Inline code: You can add inline code like this `const hello = "world"`.

## Headings

The following HTML `<h2>`—`<h6>` elements represent five levels of section headings. `<h1>` is also available but not recommended since the post title is already a `<h1>` element it is not a good practice to have more than one `<h1>` elements in a page.

## H2: Heading Two

### H3: Heading Three

#### H4: Heading Four

##### H5: Heading Five

###### H6: Heading Six

## Paragraph

A standalone single paragraph of text.

Paragraphs can be multiline too when they constitute words that make up more than one line, i.e they wrap to the next line. Wow! I am really smart to write two lines of text that makes zero sense.

## Blockquotes

> This is a blockquote. And it's pretty long too. Long enough to wrap to next line. Surely it will wrap.

> You can use other Markdown syntax like `inline code` within a blockquote.

## Tables

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## List Types

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- List item
- Another item
- And another item

### Nested list

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## Code Blocks

Syntax highlighting is done using [Prism.js](https://github.com/PrismJS/prism). You can customise to whichever theme you want from the [plenty available prism themes](https://github.com/PrismJS/prism-themes).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

## Images

![Blogster](/images/blogster.png)
