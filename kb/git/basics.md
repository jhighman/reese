# Git Basics

The foundation — getting code, making changes, sharing them.

## Core Concepts

**Repository (repo):** A folder tracked by git. Contains your code and its entire history.

**Commit:** A snapshot of your code at a point in time. Like a save point in a game.

**Remote:** A copy of your repo somewhere else (usually GitHub). Called `origin` by default.

## Essential Commands

### Getting Started
```bash
# Clone a repo (download it)
git clone https://github.com/username/repo-name.git

# Check what's changed
git status
```

### Making Changes
```bash
# Stage files for commit (add to the snapshot)
git add filename.js
git add .              # add everything

# Commit (save the snapshot)
git commit -m "Add new feature"

# Push to GitHub
git push
```

### Staying Updated
```bash
# Pull changes from GitHub
git pull
```

## Good Commit Messages

**Do:**
- `Add mouse interaction to sketch`
- `Fix animation speed bug`
- `Update README with setup instructions`

**Don't:**
- `stuff`
- `fixed it`
- `asdfasdf`

A good commit message explains *what* changed and *why*.

## Try It

1. Make a small change to any file
2. Run `git status` to see it
3. Run `git add .` then `git commit -m "your message"`
4. Run `git push` to share it

---

*Next: [branching.md](branching.md)*
