// @ts-nocheck
import type { RenderableTreeNodes } from "@markdoc/markdoc";
import Markdoc from "@markdoc/markdoc";
import MarkdownIt from "markdown-it";

const { Tag: MarkdocTag } = Markdoc;
type ComponentsType = Record<
  string,
  {
    Component: any; // ASTRO component
    props: Record<string, string | number>;
  }
>;

const { escapeHtml } = MarkdownIt().utils;

export class Node {
  private node: RenderableTreeNodes;
  tag: string;
  props: Record<string, string | number>;
  children: Array | string;
  components: any | null | undefined;

  constructor(n: RenderableTreeNodes, components?: ComponentsType) {
    if (!n) {
      throw new Error("Missing arg: n");
    }
    // if (!components) {
    //   throw new Error("Missing arg: components");
    // }
    this.node = n;
    this.components = components;
    let children = this.node?.children;
    if (typeof this.node === "string" || typeof this.node === "number") {
      // should render this in <Fragment set:html={children}></Fragment>
      children = escapeHtml(String(this.node));
      // children = String(this.node);
    } else if (
      this.node === null ||
      typeof this.node !== "object" ||
      !MarkdocTag.isTag(this.node)
    ) {
      children = "";
    }
    this.children = children;

    let tag = this.node?.name;
    let props = this.node?.attributes;
    if (
      typeof this.node?.name === "string" &&
      typeof components === "object" &&
      Object.hasOwn(components, this.node?.name)
    ) {
      tag = components[this.node?.name].Component;
      props = {
        ...props,
        ...components[this.node?.name].props,
        children: this.children,
      };
    } else if (typeof this.node?.name === "string") {
      tag = this.node?.name;
      props = { ...this.node?.attributes };
    }
    this.tag = tag;
    this.props = props;
  }

  validateElement() {
    if (
      typeof this.node?.name === "string" &&
      // custom elements start with Uppercase
      this.node.name.charAt(0).toLowerCase() !== this.node.name.charAt(0) &&
      // TODO: this condition could be improved
      typeof components === "object" &&
      // component for the custom element not found
      !Object.hasOwn(this.components, this.node.name)
    ) {
      throw new Error(`No renderer provided for element: ${this.node.name}`);
    }
  }

  hasChildren() {
    return Array.isArray(this.node?.children);
  }

  shouldRenderChildren() {
    return (
      !Array.isArray(this.node) &&
      (typeof this.node === "string" ||
        typeof this.node === "number" ||
        this.node === null ||
        typeof this.node !== "object" ||
        !MarkdocTag.isTag(this.node))
    );
  }

  shouldRenderSelf() {
    return Array.isArray(this.node);
  }

  shouldRenderTag() {
    return !!this.tag;
  }
}

// const Tag = content?.name;
// HTML elements that do not have a matching close tag
// Defined in the HTML standard: https://html.spec.whatwg.org/#void-elements
// const voidElements = new Set([
//   "area",
//   "base",
//   "br",
//   "col",
//   "embed",
//   "hr",
//   "img",
//   "input",
//   "link",
//   "meta",
//   "param",
//   "source",
//   "track",
//   "wbr",
// ]);

// function render(node: RenderableTreeNodes): string {
//   if (typeof node === "string" || typeof node === "number")
//     return escapeHtml(String(node));

//   if (Array.isArray(node)) return node.map(render).join("");

//   if (node === null || typeof node !== "object" || !Tag.isTag(node)) return "";

//   let { name, attributes, children = [] } = node;
//   let TagName = name;

//   if (customRenderers[name]) {
//     TagName = customRenderers[name].Component;
//     attributes = { ...attributes, ...customRenderers[name].props };
//   }

//   if (!name) return render(children);

//   let output = `<${name}`;
//   for (const [k, v] of Object.entries(attributes ?? {}))
//     output += ` ${k}="${escapeHtml(String(v))}"`;
//   output += ">";

//   if (voidElements.has(name)) return output;

//   if (Array.isArray(children) && children.length) output += render(children);
//   output += `</${name}>`;

//   return output;
// }
