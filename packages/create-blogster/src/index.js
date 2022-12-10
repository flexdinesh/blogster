/* 
  CLI approach heavily inspired by create-keystone-app
  https://github.com/keystonejs/create-keystone-app
*/

'use strict';

const { createBlogster } = require('./create');

class UserError extends Error {}

(async () => {
  await createBlogster();
})().catch(err => {
  if (err instanceof UserError) {
    console.error(err.message);
  } else {
    console.error(err);
  }
  process.exit(1);
});
