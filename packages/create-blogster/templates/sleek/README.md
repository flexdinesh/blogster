# Blogster

Theme: **sleek**

Blogster is a collection of beautiful, accessible and performant blog templates built with [Astro](https://astro.build) and [Markdoc](https://markdoc.dev).

Check out the demo here - [Blogster sleek template](https://blogster-sleek.netlify.app).

## Sleek Template

A beautiful, performant and accessible theme built with [Tailwind](https://tailwindcss.com).

- **Fast**. Fast by default. Astro websites are engineered to be fast and load before you could blink, even when not cached.
- **Dark mode**. All themes have light/dark mode built-in.
- **Mobile first**. Responsive and loads fast in all devices.
- **Accessible**. A well thought out semantic and accessible content.
- **Perfect lighthouse score.** 100 across the board.
- **Easy content authoring**. Author content using markdown (`.md`) from your code editor or directly in GitHub.
- **Extended markdown with [Markdoc](https://markdoc.dev).** Type-safe custom components like YouTube embed, Twitter embed (or anything you want really) in your markdown (`.md`) files.
- **RSS feed**. Your blog has an RSS feed setup that can be accessed at `/rss.xml`.
- **SEO**. All pages are setup with all the SEO you might need.

## How do I add content?

All the content is written in markdown (.md) and grouped as `blog` or `projects` in the `content` directory. All the default markdown syntax will work. You also have a few example custom markdown elements like _YouTube embed_, _Twitter embed_, etc. You can create your own custom components too in two easy steps.

1. Add a markdoc config. Check out the markdoc config in [src/lib/markdoc/config.ts](src/lib/markdoc/config.ts) to learn how to add custom components.
2. Add a component to render your custom component. Check out the Renderer in [src/components/Renderer.astro](src/components/Renderer.astro).

## How do I make it my blog?

Easy.

- All content is static and everything is straight forward. Change whatever you need to change.
- Delete or update the content in `content/{content-group}`. `content-group` could be `blog`, `projects` or `anything`.
- (Optional) If you need more content types like _Notes_, just create a new dir in `content` and add a new frontmatter validator like [src/lib/markdoc/blog/frontmatter](src/lib/markdoc/blog/frontmatter).

## How do I deploy?

`yarn build` will generate a static website in `dist` dir. You can host it with any static hosting. If you need a recommendation, check out [Netlify](netlify.com).

## Credit

Thanks to other templates that inspired this theme.

- [Official Astro Blog template](https://github.com/withastro/astro/tree/main/examples/blog)

## License

MIT © [Dinesh Pandiyan](https://github.com/flexdinesh)
