# Add GHA deploy workflow

## Acceptance criteria

```
Given a push to main
When the workflow completes
Then it runs lint + tests + build on Node LTS
And only deploys to GitHub Pages if all checks pass
```

## Notes

- Requires switching GH Pages source from 'main root' to 'GitHub Actions' in repo settings
- Updated deploy-pages and upload-pages-artifact to v5 for Node 24 compat
- Set Vite base path to `/carto/` for correct asset URLs under project Pages

## Workflow notes

- First deploy failed because Vite base path wasn't set for `/carto/` subpath
- Tried creating a subagent (BA) for task card prep. Failed — too much context loaded, clunky to invoke, added complexity for little gain. Reverted to single-agent with skills.
