import { describe, test, expect } from "vitest";
import { validateBlogFrontmatter } from "../../../../src/lib/markdoc/blog/frontmatter";

describe("validateBlogFrontmatter", () => {
  test("Does not throw for expected frontmatter", () => {
    let unknownFrontmatter: Record<string, unknown> = {
      title: "hello",
      description: "world",
      date: "2022-10-10",
    };
    // we're making sure no errors are thrown
    expect(() =>
      validateBlogFrontmatter(unknownFrontmatter)
    ).not.toThrowError();
  });

  test("Throws for invalid frontmatter", () => {
    let unknownFrontmatter: Record<string, unknown> = {
      title: "hello",
    };
    // we're making sure errors are thrown
    expect(() => validateBlogFrontmatter(unknownFrontmatter)).toThrowError();
  });

  test("Throws for invalid date format", () => {
    // we're making sure errors are thrown
    expect(() =>
      validateBlogFrontmatter({
        title: "hello",
        description: "world",
        date: "2022-13-10",
      })
    ).toThrowError();
    expect(() =>
      validateBlogFrontmatter({
        title: "hello",
        description: "world",
        date: "2022-12-32",
      })
    ).toThrowError();
    expect(() =>
      validateBlogFrontmatter({
        title: "hello",
        description: "world",
        date: "22-12-32",
      })
    ).toThrowError();
    expect(() =>
      validateBlogFrontmatter({
        title: "hello",
        description: "world",
        date: "2022/12/22",
      })
    ).toThrowError();
  });

  test("ExternalPostFrontmatter - throws for missing keys", () => {
    // we're making sure errors are thrown
    expect(() =>
      validateBlogFrontmatter({
        title: "hello",
        date: "2022-10-10",
        isExternal: true,
      })
    ).toThrowError();
  });
});
