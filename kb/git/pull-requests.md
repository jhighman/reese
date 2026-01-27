# Pull Requests

The gateway from your branch to main.

## What's a Pull Request (PR)?

A PR says: "I've got changes on my branch. Please review them and merge to main."

It's where:
- Code gets reviewed
- Discussions happen
- Changes get approved (or revised)
- Work officially joins the project

## Creating a PR

After pushing your branch:

1. Go to GitHub
2. You'll see a prompt: "Compare & pull request" — click it
3. Or: go to **Pull requests** → **New pull request**
4. Select your branch
5. Write a title and description
6. Click **Create pull request**

### Good PR Titles
- `Add mouse trail effect`
- `Fix: animation stops on tab switch`

### Good Descriptions
- What does this change?
- Why?
- How can someone test it?
- Reference related issues: `Closes #4`

## The Review Process

Once you open a PR:

1. **Reviewers look at your code** — they can comment on specific lines
2. **You respond** — answer questions, explain decisions
3. **Make changes if needed** — just push more commits to the same branch
4. **Get approved** — reviewer approves the PR
5. **Merge** — click the merge button

## Responding to Feedback

Feedback isn't criticism — it's collaboration. When you get comments:

- Read carefully
- Ask if unclear
- Make changes or explain your reasoning
- Push new commits (they auto-add to the PR)

## Merging

Once approved:
1. Click **Merge pull request**
2. Confirm
3. Delete the branch (GitHub offers this — do it to keep things clean)

## After Merging

Back on your machine:
```bash
git checkout main
git pull
git branch -d my-feature  # delete local branch
```

---

*Next: [workflow.md](workflow.md)*
