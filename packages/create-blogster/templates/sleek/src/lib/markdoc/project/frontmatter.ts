import datefns from 'date-fns';

const { isMatch, format, parse } = datefns;
const dateFormat = 'yyyy-MM-dd';

// projects are just links to external websites (GitHub, etc)
type ProjectFrontmatter = {
  title: string;
  date: Date;
  url: string;
};

export function validateProjectFrontmatter(
  frontmatter: Record<string, unknown>
): ProjectFrontmatter {
  if (Object.keys(frontmatter).length < 1) {
    throw new Error('Frontmatter should be an object with keys');
  }

  // frontmatter.title
  if (typeof frontmatter.title !== 'string') {
    throw new Error('Frontmatter.title is missing. String expected.');
  }

  // frontmatter.date
  if (
    typeof frontmatter.date !== 'string' &&
    !((frontmatter.date as unknown) instanceof Date)
  ) {
    throw new Error(
      'Frontmatter.date is missing. Date expected in format yyyy-MM-dd.'
    );
  } else {
    if (typeof frontmatter.date === 'string') {
      frontmatter.date = parse(frontmatter.date, dateFormat, new Date());
      const formattedDate = format(frontmatter.date as Date, dateFormat);
      if (!isMatch(formattedDate, dateFormat)) {
        throw new Error(
          'Frontmatter.date is not a valid date string. Date expected in format yyyy-MM-dd.'
        );
      }
    } else if ((frontmatter.date as unknown) instanceof Date) {
      const formattedDate = format(frontmatter.date as Date, dateFormat);
      if (!isMatch(formattedDate, dateFormat)) {
        throw new Error(
          'Frontmatter.date is not a valid date string. Date expected in format yyyy-MM-dd.'
        );
      }
    }
  }

  // frontmatter.url (external links)
  if (typeof frontmatter.url !== 'string') {
    throw new Error('Frontmatter.url is missing. String expected.');
  }

  return {
    ...frontmatter,
  } as ProjectFrontmatter;
}
