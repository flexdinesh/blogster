import { describe, test, expect } from "vitest";
import {
  validateBlogFrontmatter,
  validateProjectFrontmatter,
  validateNotesFrontmatter,
} from "../src/frontmatter";

// Edit an assertion and save to see HMR in action

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
    expect(
      validateBlogFrontmatter({
        title: "hello",
        description: "world",
        date: "2022-10-10",
      })
    ).toMatchObject({
      title: "hello",
      description: "world",
      date: "2022-10-10",
      type: "blog",
      isExternal: false,
    });
  });

  test("ExternalPostFrontmatter - returns correct frontmatter.type", () => {
    expect(
      validateBlogFrontmatter({
        title: "hello",
        date: "2022-10-10",
        isExternal: true,
        url: "http://abcd",
      })
    ).toMatchObject({
      title: "hello",
      date: "2022-10-10",
      url: "http://abcd",
      type: "blog",
      isExternal: true,
    });
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
    expect(
      validateProjectFrontmatter({
        title: "hello",
        date: "2022-10-10",
        url: "http://linktoproject",
      })
    ).toMatchObject({
      title: "hello",
      date: "2022-10-10",
      url: "http://linktoproject",
      type: "project",
    });
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
    expect(
      validateNotesFrontmatter({
        title: "hello",
        date: "2022-10-10",
      })
    ).toMatchObject({
      title: "hello",
      date: "2022-10-10",
      type: "notes",
    });
  });
});
