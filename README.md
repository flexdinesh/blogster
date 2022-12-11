# Blogster

Blogster is a collection of beautiful, accessible and performant blog templates built with [Astro](https://astro.build) and [Markdoc](https://markdoc.dev).

Check out the demo templates:

- [Blogster sleek template](https://blogster-sleek.netlify.app)
- [Blogster minimal template](https://blogster-minimal.netlify.app)

## Key Features

- **Fast.** Fast by default. Astro websites are engineered to be fast and load before you could blink, even when not cached.
- **Dark mode.** All themes have light/dark mode built-in.
- **Mobile first.** Responsive and loads fast in all devices.
- **Accessible.** A well thought out semantic and accessible content.
- **Perfect lighthouse score.** 100 across the board.
- **Easy content authoring** Author content using markdown (`.md`) from your code editor or directly in GitHub.
- **Extended markdown with [Markdoc](https://markdoc.dev).** Type-safe custom components like YouTube embed, CodePen embed (or anything you want really) in your markdown (`.md`) files.
- Built in **RSS** feed for you blog, excellent **SEO** and more.

## Get Started

Get started with one simple command.

```bash
npx create-blogster@latest --theme sleek
```

## Themes

Blogster comes in a variety of themes. You can easily find one that suits and goes well with your personality. All themes are performant, accessible, SEO friendly, built with the best practices out there and have a lighthouse score of 100 across the board.

- [Minimal](#minimal)
- [Sleek](#sleek)

### Minimal

A light weight theme built with plain old HTML and CSS. No external fonts or icons. Zero JavaScript. You get a full functional nice looking blog that loads super fast.

Check it out here - [Blogster minimal template](https://blogster-minimal.netlify.com).

```bash
npx create-blogster@latest --theme minimal
```

### Sleek

A beautiful, performant and accessible theme built with [Tailwind](https://tailwindcss.com).

Check it out here - [Blogster sleek template](https://blogster-sleek.netlify.com).

```bash
npx create-blogster@latest --theme sleek
```

## FAQ

**1. Why Markdoc or Why not MDX?**

MDX is great but when you use MDX, your MDX content is stored as code within your `.md` files. Markdoc lets you build and use your own custom components (Eg. YouTube embed, CodePen embed, Carousel, etc) within your markdown files with a special syntax. Your content is stored as content without having to leak your code into your `.md` files. You can build validations, type-safety and all sorts of customisations for your custom components with Markdoc. If you're still not convinced, hear this, you can pass Markdoc content as string (just like any other string) throughout your application, store it in local storage or send it as params over the network. IMHO, with Markdoc based content authoring gives you the full flexibility of markdown without the limits of the markdown syntax.

## License

MIT © [Dinesh Pandiyan](https://github.com/flexdinesh)
