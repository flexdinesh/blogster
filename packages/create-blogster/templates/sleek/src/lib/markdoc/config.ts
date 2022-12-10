import Markdoc from '@markdoc/markdoc';
import type { Config } from '@markdoc/markdoc';

const { nodes, Tag } = Markdoc;

/* Markdoc config goes here. https://markdoc.dev/docs/config */
export const config: Config = {
  tags: {
    details: {
      render: 'details',
      children: nodes.document.children,
    },
    summary: {
      render: 'summary',
      children: nodes.document.children,
    },
    sup: {
      render: 'sup',
      children: nodes.strong.children,
    },
    sub: {
      render: 'sub',
      children: nodes.strong.children,
    },
    abbr: {
      render: 'abbr',
      attributes: {
        title: { type: String },
      },
      children: nodes.strong.children,
    },
    kbd: {
      render: 'kbd',
      children: nodes.strong.children,
    },
    mark: {
      render: 'mark',
      children: nodes.strong.children,
    },
    youtube: {
      render: 'YouTubeEmbed',
      attributes: {
        url: { type: String, required: true },
        label: { type: String, required: true },
      },
      selfClosing: true,
    },
  },
  nodes: {
    fence: {
      render: 'CodeBlock',
      attributes: {
        content: { type: String, render: false, required: true },
        language: { type: String, default: 'typescript' },
        // process determines whether or not markdoc processes tags inside the content of the code block
        process: { type: Boolean, render: false, default: false },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        if (children.some(child => typeof child !== 'string')) {
          throw new Error(
            `unexpected non-string child of code block from ${
              node.location?.file ?? '(unknown file)'
            }:${node.location?.start.line ?? '(unknown line)'}`
          );
        }
        return new Tag(
          this.render,
          { ...attributes, content: children.join('') },
          []
        );
      },
    },
  },
};
