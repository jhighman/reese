# Branching

Work on features without affecting the main code.

## Why Branch?

Imagine you're working on a new feature and it breaks everything. If you're on `main`, everyone sees the broken code. With branches:

- `main` stays stable
- You work on your own branch
- When it's ready, you merge it back

## Commands

### Create and Switch
```bash
# Create a new branch and switch to it
git checkout -b my-feature

# Or the newer way
git switch -c my-feature
```

### See Your Branches
```bash
git branch          # list local branches
git branch -a       # list all (including remote)
```

### Switch Between Branches
```bash
git checkout main        # go back to main
git checkout my-feature  # go to your feature
```

### Push Your Branch
```bash
# First time pushing a new branch
git push -u origin my-feature

# After that, just
git push
```

## The Flow

1. Start on `main`, pull latest: `git pull`
2. Create your branch: `git checkout -b add-color-picker`
3. Do your work, commit as you go
4. Push your branch: `git push -u origin add-color-picker`
5. Open a Pull Request on GitHub
6. After review, merge to `main`

## Naming Branches

Keep it descriptive but short:
- `add-login-form`
- `fix-animation-bug`
- `update-readme`

Avoid:
- `mybranch`
- `test`
- `asdf`

---

*Next: [issues.md](issues.md)*
