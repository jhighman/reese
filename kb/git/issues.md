# GitHub Issues

Track work, bugs, and ideas.

## What Are Issues?

Issues are GitHub's way of tracking:
- **Bugs** — something's broken
- **Features** — something to add
- **Tasks** — something to do
- **Questions** — something to discuss

Think of them as a to-do list that lives with your code.

## Creating an Issue

On GitHub:
1. Go to your repo
2. Click the **Issues** tab
3. Click **New issue**
4. Give it a clear title and description
5. Submit

### Good Issue Titles
- `Add dark mode toggle`
- `Fix: circles disappear on resize`
- `Question: how should colors work?`

### Good Descriptions
- What should happen (or what's broken)
- Steps to reproduce (for bugs)
- Any relevant details

## Referencing Issues in Commits

Every issue has a number (#1, #2, etc.). Reference them:

```bash
git commit -m "Add dark mode toggle (#3)"
```

This links your commit to the issue.

## Closing Issues Automatically

Use magic words in your commit:
```bash
git commit -m "Fix resize bug, closes #5"
```

When this merges to main, issue #5 closes automatically.

Magic words: `closes`, `fixes`, `resolves`

## Labels

Add labels to categorize:
- `bug` — something's broken
- `enhancement` — new feature
- `good first issue` — easy tasks for beginners
- `help wanted` — need input

## The Workflow

1. See a task → Create an issue
2. Pick an issue to work on
3. Create a branch for it
4. Reference the issue in commits
5. Close it via PR or manually

---

*Next: [pull-requests.md](pull-requests.md)*
