#!/bin/bash

# Recovery script to cherry-pick the missing commit
# Run this from your WSL terminal: bash recover_commit.sh

set -e  # Exit on error

echo "=== Recovering missing commit a7a735d ==="
echo ""

# Ensure we're on main branch
echo "1. Checking out main branch..."
git checkout main

# Verify backup exists
echo "2. Verifying backup branch exists..."
if git show-ref --verify --quiet refs/heads/backup-main; then
    echo "   ✓ Backup branch 'backup-main' exists"
else
    echo "   Creating backup branch..."
    git branch backup-main
fi

# Attempt cherry-pick
echo "3. Cherry-picking commit a7a735d..."
if git cherry-pick a7a735d; then
    echo ""
    echo "✓ SUCCESS! Commit has been recovered."
    echo ""
    echo "Current status:"
    git log --oneline -5
    echo ""
    echo "Next steps:"
    echo "  - Review the changes: git show HEAD"
    echo "  - If everything looks good, push: git push origin main"
    echo "  - If there are issues, reset: git reset --hard backup-main"
else
    echo ""
    echo "⚠ CONFLICTS detected!"
    echo ""
    echo "Please resolve conflicts manually:"
    echo "  1. Check conflicted files: git status"
    echo "  2. Resolve conflicts in the files"
    echo "  3. Stage resolved files: git add <file>"
    echo "  4. Complete cherry-pick: git cherry-pick --continue"
    echo ""
    echo "Or abort: git cherry-pick --abort"
fi

