![Blogster - Beautiful, accessible and performant Astroblog templates.](/gh-assets/gh-cover.png)

<p align="center">
    <table>
        <tbody>
            <td align="center">
                <img width="2000" height="0" /><br>
                <p align="center">
                    <strong>Blogster<strong> is a collection of beautiful, accessible and performant blog templates built with <a href="https://astro.build">Astro</a> and <a href="https://markdoc.dev">Markdoc</a>.
                </p>
                <sub>
                    Blogster is in <b>alpha</b> preview. If you have any feedback, please open a discussion or issue.<br>
                    Follow me <a href="https://twitter.com/flexdinesh">@flexdinesh</a> on Twitter for updates.</sub><br>
                <img width="2000" height="0" />
            </td>
        </tbody>
    </table>
</p>

## Maintenance Status

Blogster was built before Astro released [content collections](https://docs.astro.build/en/guides/content-collections/). With content collections, Astro now has first party built in support for strongly typed content schema and Markdoc rendered content which is what Blogster was built for. So Blogster won't receive any updates in the future. I'm going to leave this as a reference for font load strategy, meta tags and a few other best practices for setting up a website.

## Demo

Check out the demo for each theme.

- [Demo: Sleek](https://blogster-sleek.netlify.app)
- [Demo: Newspaper](https://blogster-newspaper.netlify.app)
- [Demo: Bubblegum](https://blogster-bubblegum.netlify.app)
- [Demo: Minimal](https://blogster-minimal.netlify.app)

## Key Features

- **Fast.** Fast by default. Astro websites are engineered to be fast and load before you could blink, even when not cached.
- **Dark mode.** All themes have light/dark mode built-in.
- **Mobile first.** Responsive and loads fast in all devices.
- **Accessible.** A well thought out semantic and accessible content.
- **Perfect lighthouse score.** 100 across the board.
- **Easy content authoring** Author content using markdown (`.md`) from your code editor or directly in GitHub.
- **Extended markdown with [Markdoc](https://markdoc.dev).** Type-safe custom components like YouTube embed, Twitter embed (or anything you want really) in your markdown (`.md`) files.
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
- [Newspaper](#newspaper)
- [Bubblegum](#bubblegum)

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

### Newspaper

A beautiful, performant and accessible theme built with [Tailwind](https://tailwindcss.com).

Check it out here - [Blogster newspaper template](https://blogster-newspaper.netlify.com).

```bash
npx create-blogster@latest --theme newspaper
```

### Bubblegum

A beautiful, performant and accessible theme built with [Tailwind](https://tailwindcss.com).

Check it out here - [Blogster bubblegum template](https://blogster-bubblegum.netlify.com).

```bash
npx create-blogster@latest --theme bubblegum
```

<!-- ## Showcase

Collections of blogs built with Blogster.

1. [dineshpandiyan.com (sleek)](https://dineshpandiyan.com)

Create a PR to add yours to the list. -->

## FAQ

<details>
    <summary><strong>1. Why Markdoc or Why not MDX?</strong></summary>
    <p>
        MDX is great but when you use MDX, your MDX content is stored as code within your `.md` files. Markdoc lets you build and use your own custom components (Eg. YouTube embed, Twitter embed, Carousel, etc) within your markdown files with a special syntax. Your content is stored as text without having to leak code (imports or JSX) into your `.md` files. You can build validations, type-safety and all sorts of customisations for your custom components with Markdoc. If you're still not convinced, hear this, you can pass Markdoc content as string (just like any other string) throughout your application, store it in local storage or send it as params over the network. IMHO, Markdoc based content authoring gives you the full flexibility of markdown without the limits of the markdown syntax.
    </p>
</details>

## Contributing

- When you are using `cmd+shift+F` to search for references across the repo, remember to exclude `templates/` dir because templates are auto-generated using a script and only add noise in search results.
- Whatever you're changing, you will mostly only need to change in `themes/` or `packages/shared`. The themes in `templates/` dir is auto-synced using a script so you don't have to make any change in the `templates/` dir.

## License

MIT © [Dinesh Pandiyan](https://github.com/flexdinesh)
