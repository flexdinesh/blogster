import { describe, test, expect } from "vitest";
import { blog, project } from "../../src/markdoc/frontmatter.schema";

describe("validate blog frontmatter", () => {
  test("Does not throw for expected frontmatter", () => {
    const unknownFrontmatter: Record<string, unknown> = {
      external: false,
      title: "hello",
      description: "world",
      date: new Date("2022-10-10"),
    };
    // we're making sure no errors are thrown
    expect(() => blog.parse(unknownFrontmatter)).not.toThrowError();
  });

  test("Throws for invalid frontmatter", () => {
    const unknownFrontmatter: Record<string, unknown> = {
      title: "hello",
    };
    // we're making sure errors are thrown
    expect(() => blog.parse(unknownFrontmatter)).toThrowError();
  });

  test("Throws for invalid date format", () => {
    // we're making sure errors are thrown
    expect(() =>
      blog.parse({
        title: "hello",
        description: "world",
        date: "2022-13-10",
      })
    ).toThrowError();
  });

  test("External post - throws for missing keys", () => {
    // we're making sure errors are thrown
    expect(() =>
      blog.parse({
        external: true,
        title: "hello",
        date: "2022-10-10",
      })
    ).toThrowError();
  });
});

describe("validate project frontmatter", () => {
  test("Does not throw for expected frontmatter", () => {
    const unknownFrontmatter: Record<string, unknown> = {
      draft: false,
      title: "hello",
      date: new Date("2022-10-10"),
      url: "https://yo",
    };
    // we're making sure no errors are thrown
    expect(() => project.parse(unknownFrontmatter)).not.toThrowError();
  });

  test("Throws for invalid frontmatter", () => {
    const unknownFrontmatter: Record<string, unknown> = {
      title: "hello",
    };
    // we're making sure errors are thrown
    expect(() => project.parse(unknownFrontmatter)).toThrowError();
  });

  test("Throws for invalid date format", () => {
    // we're making sure errors are thrown
    expect(() =>
      project.parse({
        title: "hello",
        url: "https://yo",
        date: "2022-13-10",
      })
    ).toThrowError();
  });
});
