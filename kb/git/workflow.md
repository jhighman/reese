# The Complete Workflow

Putting it all together — from idea to merged code.

## The Loop

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1. Pick an Issue  ──►  2. Create Branch  ──►  3. Code    │
│         ▲                                          │        │
│         │                                          ▼        │
│   6. Merge & Clean  ◄──  5. Review  ◄──  4. Open PR        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Step by Step

### 1. Pick an Issue
- Look at the Issues tab
- Find one you want to work on
- Comment "I'll take this" (optional, but nice)

### 2. Create a Branch
```bash
git checkout main
git pull                           # get latest
git checkout -b fix-color-bug      # name it after the work
```

### 3. Do the Work
```bash
# edit files...
git add .
git commit -m "Fix color picker resetting on click"
# repeat as needed
```

### 4. Open a Pull Request
```bash
git push -u origin fix-color-bug
```
Then on GitHub: create the PR, reference the issue.

### 5. Code Review
- Wait for feedback
- Respond to comments
- Push fixes if needed
- Get approval

### 6. Merge & Clean Up
On GitHub:
- Merge the PR
- Delete the remote branch

Locally:
```bash
git checkout main
git pull
git branch -d fix-color-bug
```

## Tips

- **Small PRs** are easier to review than huge ones
- **Commit often** — small, logical chunks
- **Pull main regularly** — avoid big merge conflicts
- **Ask questions** — unclear feedback is worth clarifying

## Practice

The best way to learn:
1. Create an issue for something small
2. Do the full loop
3. Repeat until it's muscle memory

---

*You've got the whole workflow. Now go build something.*
