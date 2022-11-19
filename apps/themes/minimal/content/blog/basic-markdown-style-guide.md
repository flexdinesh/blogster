---
title: "Basic markdown style guide"
description: "You can author content using the familiar markdown syntax you already know. All basic markdown syntax is supported."
date: 2022-11-02
heroImage: "/placeholder-hero.jpg"
---

Markdown is powered by [Markdoc](https://markdoc.dev/). This post is an example to showcase the support of all basic markdown syntax. You can author content using the familiar markdown syntax you already know.

## Inline formatting

You can use all sorts of inline formatting in markdown. You can write something in **bold**. And _italics_ too. How about ~~strikethrough~~? You got it. Don't forget about inline code, you got that too. `Hello world!`.

## Headings

The following HTML `<h2>`—`<h6>` elements represent five levels of section headings. `<h1>` is also available but not recommended since the post title is already a `<h1>` element.

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Images

![This is a placeholder image description](/placeholder-social.jpg)

## Blockquotes

The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.

#### Blockquote

> This is a blockquote. And it's pretty long too. Long enough to wrap to next line.

> You can use Markdown syntax like **bold** within a blockquote.

## Tables

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## Code Blocks

Syntax highlighting is done using [Prism.js](https://github.com/PrismJS/prism) with the default [nord theme](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-nord.css). You can customise to whichever theme you want from the [plenty available prism themes](https://github.com/PrismJS/prism-themes).

### HTML

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

### JSX

```jsx
const Greet = () => {
  const message = `Hello World!`;
  return <div>{message}</div>;
};
```

### CSS

```css
.layout {
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr) 4rem;
}
```

## List Types

#### Ordered List

1. First item
2. Second item
3. Third item

#### Unordered List

- List item
- Another item
- And another item

#### Nested list

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## Other Elements — abbr, sub, sup, kbd, mark

{% abbr title="Graphics Interchange Format" %}GIF{% /abbr %} is a bitmap image format.

H{% sub %}2{% /sub %}O

X{% sup %}n{% /sup %} + Y{% sup %}n{% /sup %} = Z{% sup %}n{% /sup %}

Press {% kbd %}{% kbd %}CTRL{% /kbd %}+{% kbd %}ALT{% /kbd %}+{% kbd %}Delete{% /kbd %}{% /kbd %} to end the session.

Most {% mark %}salamanders{% /mark %} are nocturnal, and hunt for insects, worms, and other small creatures.
