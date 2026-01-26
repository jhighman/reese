# Git Workflow

## Remotes

| Remote | Repository | Purpose |
|--------|------------|---------|
| `origin` | jhighman/reese | Your fork - push changes here |
| `upstream` | devcoband-ai/reese | Original repo - pull updates from here |

## Push Your Changes

```bash
git add <files>
git commit -m "Your message"
git push origin main
```

This triggers automatic Netlify deployment.

## Pull Updates from DevCo

```bash
git pull upstream main
```

Or step-by-step:

```bash
git fetch upstream
git merge upstream/main
```

## If You Have Conflicts

```bash
git fetch upstream
git rebase upstream/main
# Fix conflicts, then:
git rebase --continue
```

## Contribute Back to DevCo

1. Push to your fork: `git push origin main`
2. Go to GitHub and open a Pull Request from `jhighman/reese` → `devcoband-ai/reese`

## Check Remote Setup

```bash
git remote -v
```

Expected output:
```
origin    https://github.com/jhighman/reese.git (fetch)
origin    https://github.com/jhighman/reese.git (push)
upstream  https://github.com/devcoband-ai/reese.git (fetch)
upstream  https://github.com/devcoband-ai/reese.git (push)
```
