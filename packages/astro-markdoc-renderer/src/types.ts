import type { RenderableTreeNodes } from "@markdoc/markdoc";

export type Content = RenderableTreeNodes;
export type Components = Record<
  string,
  {
    Component: any; // ASTRO component
    props: Record<string, string | number>;
  }
>;
