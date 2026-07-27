# Vertex Global — Git Workflow

## Daily update commands

```bash
# 1. Check what changed
git status

# 2. Stage all changes
git add .

# 3. Commit with a clear message
git commit -m "type: description"

# Commit types:
# feat:     new feature or section
# fix:      bug fix
# content:  text or copy update
# style:    design change
# perf:     performance improvement

# 4. Push → triggers auto-deploy on Vercel
git push

# Your site updates in ~45 seconds ✓
```

## Useful commands

```bash
# See commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See what's different
git diff

# Create a branch for big changes
git checkout -b feature/new-section
git push origin feature/new-section
```
