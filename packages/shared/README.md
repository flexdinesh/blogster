# @local/shared package

This shared package contains code and content that's reused across all themes. Instead of having to make a change in every single theme when something in the shared logic changes, all the shared logic is grouped into this internal package.

- Every single file is exported individually using multiple entry points
- In the CLI, these files are copied to individual theme templates locally
