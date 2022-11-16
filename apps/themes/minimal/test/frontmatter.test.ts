import { describe, test, expect } from "vitest";
import {
  validateBlogFrontmatter,
  validateProjectFrontmatter,
  validateNotesFrontmatter,
} from "../src/util/content/frontmatter";

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

  test("MarkdownPostFrontmatter - returns correct frontmatter.type", () => {
    const frontmatter = validateBlogFrontmatter({
      title: "hello",
      description: "world",
      date: "2022-10-10",
    });
    expect(frontmatter).toMatchObject({
      title: "hello",
      description: "world",
      type: "blog",
      isExternal: false,
    });
    expect(frontmatter.date instanceof Date).toBeTruthy();
  });

  test("ExternalPostFrontmatter - returns correct frontmatter.type", () => {
    const frontmatter = validateBlogFrontmatter({
      title: "hello",
      date: "2022-10-10",
      isExternal: true,
      url: "http://abcd",
    });
    expect(validateBlogFrontmatter(frontmatter)).toMatchObject({
      title: "hello",
      url: "http://abcd",
      type: "blog",
      isExternal: true,
    });
    expect(frontmatter.date instanceof Date).toBeTruthy();
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

describe("validateProjectFrontmatter", () => {
  test("Does not throw for expected frontmatter", () => {
    let unknownFrontmatter: Record<string, unknown> = {
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
    let unknownFrontmatter: Record<string, unknown> = {
      title: "hello",
      date: "2022-10-10",
    };
    // we're making sure errors are thrown
    expect(() => validateProjectFrontmatter(unknownFrontmatter)).toThrowError();
  });

  test("Returns correct frontmatter.type", () => {
    const frontmatter = validateBlogFrontmatter({
      title: "hello",
      date: "2022-10-10",
      url: "http://linktoproject",
    });
    expect(validateProjectFrontmatter(frontmatter)).toMatchObject({
      title: "hello",
      url: "http://linktoproject",
      type: "project",
    });
    expect(frontmatter.date instanceof Date).toBeTruthy();
  });
});

describe("validateNotesFrontmatter", () => {
  test("Does not throw for expected frontmatter", () => {
    let unknownFrontmatter: Record<string, unknown> = {
      title: "hello",
      date: "2022-10-10",
    };
    // we're making sure no errors are thrown
    expect(() =>
      validateNotesFrontmatter(unknownFrontmatter)
    ).not.toThrowError();
  });

  test("Throws for invalid frontmatter", () => {
    let unknownFrontmatter: Record<string, unknown> = {
      title: "hello",
    };
    // we're making sure errors are thrown
    expect(() => validateNotesFrontmatter(unknownFrontmatter)).toThrowError();
  });

  test("Returns correct frontmatter.type", () => {
    const frontmatter = validateBlogFrontmatter({
      title: "hello",
      date: "2022-10-10",
    });
    expect(validateNotesFrontmatter(frontmatter)).toMatchObject({
      title: "hello",
      type: "notes",
    });
    expect(frontmatter.date instanceof Date).toBeTruthy();
  });
});
