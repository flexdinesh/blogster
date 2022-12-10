# Astro Markdoc Renderer

Markdoc renderer for Astro.

## Install

```bash
yarn add astro-markdoc-renderer
```

## Usage

```jsx
---
import { MarkdocRenderer } from "astro-markdoc-renderer";
import type { Content } from "astro-markdoc-renderer";
import HeadingOne from "./HeadingOne.astro";
import YouTubeEmbed from "./YouTubeEmbed.astro";

type Props = {
  content: Content;
};

const { content } = Astro.props;

const components = {
  // custom tag
  YouTubeEmbed: {
    Component: YouTubeEmbed,
    props: {},
  },
  // <h1> tag
  h1: {
    Component: HeadingOne,
    props: {},
  },
};
---

<MarkdocRenderer content={content} components={components} />
```

## License

MIT © [Dinesh Pandiyan](https://github.com/flexdinesh)
