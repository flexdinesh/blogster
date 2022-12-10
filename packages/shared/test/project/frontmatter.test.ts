import { describe, test, expect } from "vitest";
import { validateProjectFrontmatter } from "../../src/markdoc/project/frontmatter";

describe("validateProjectFrontmatter", () => {
  test("Does not throw for expected frontmatter", () => {
    const unknownFrontmatter: Record<string, unknown> = {
      title: "hello",
      date: "2022-10-10",
      url: "http://linktoproject",
    };
    // we're making sure no errors are thrown
    expect(() =>
      validateProjectFrontmatter(unknownFrontmatter)
    ).not.toThrowError();
  });

  test("Throws for invalid frontmatter", () => {
    const unknownFrontmatter: Record<string, unknown> = {
      title: "hello",
      date: "2022-10-10",
    };
    // we're making sure errors are thrown
    expect(() => validateProjectFrontmatter(unknownFrontmatter)).toThrowError();
  });
});
