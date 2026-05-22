# Add GHA deploy workflow

## Acceptance criteria

```
Given a push to main
When the workflow completes
Then it runs lint + tests + build on Node LTS
And only deploys to GitHub Pages if all checks pass
```

## Notes

- Requires switching GH Pages source from "main root" to "GitHub Actions" in repo settings
