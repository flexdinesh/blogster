import { load } from "js-yaml";
import fs from "fs/promises";
import Markdoc, { nodes, Tag, functions } from "@markdoc/markdoc";
import type { Config, ConfigFunction } from "@markdoc/markdoc";

const config: Config = {
  tags: {
    details: {
      render: "details",
      children: nodes.document.children,
    },
    summary: {
      render: "summary",
      children: nodes.document.children,
    },
    sup: {
      render: "sup",
      children: nodes.strong.children,
    },
    sub: {
      render: "sub",
      children: nodes.strong.children,
    },
    abbr: {
      render: "abbr",
      attributes: {
        title: { type: String },
      },
      children: nodes.strong.children,
    },
    kbd: {
      render: "kbd",
      children: nodes.strong.children,
    },
    mark: {
      render: "mark",
      children: nodes.strong.children,
    },
    youtube: {
      render: "YouTubeEmbed",
      attributes: {
        url: { type: String, required: true },
        label: { type: String, required: true },
      },
      selfClosing: true,
    },
  },
  nodes: {
    fence: {
      render: "CodeBlock",
      attributes: {
        content: { type: String, render: false, required: true },
        language: { type: String, default: "typescript" },
        // process determines whether or not markdoc processes tags inside the content of the code block
        process: { type: Boolean, render: false, default: false },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        if (children.some((child) => typeof child !== "string")) {
          throw new Error(
            `unexpected non-string child of code block from ${
              node.location?.file ?? "(unknown file)"
            }:${node.location?.start.line ?? "(unknown line)"}`
          );
        }
        return new Tag(
          this.render,
          { ...attributes, content: children.join("") },
          []
        );
      },
    },
  },
};

function extractFrontmatter(content: string) {
  const frontMatterPattern = /^---[\s]+([\s\S]*?)[\s]+---/;
  const match = frontMatterPattern.exec(content);
  if (!match) {
    throw new Error(
      "Expected post to contain frontmatter with a title, description and publishDate"
    );
  }
  const frontmatter = match[1];
  let parsed;
  try {
    parsed = load(frontmatter);
  } catch (err) {
    throw new Error(`Failed to parse frontmatter as yaml: ${err}`);
  }
  if (typeof parsed !== "object" || parsed === null) {
    throw new Error(
      `Expected frontmatter yaml to be an object but found:\n${JSON.stringify(
        parsed
      )}`
    );
  }
  let obj = parsed as Record<string, unknown>;

  return obj;
}

export async function parseAndTransform({
  markdownFileAbsolutePath,
}: {
  markdownFileAbsolutePath: string;
}) {
  const rawMd = await fs.readFile(markdownFileAbsolutePath, "utf8");
  const ast = Markdoc.parse(rawMd);

  const errors = Markdoc.validate(ast, config);
  if (errors.length) {
    console.error(errors);
    throw new Error("Markdoc validation error");
  }
  const transformedContent = Markdoc.transform(ast, config);
  const html = Markdoc.renderers.html(transformedContent);
  const frontmatter = extractFrontmatter(rawMd);
  return {
    frontmatter: frontmatter,
    content: transformedContent,
  };
}
