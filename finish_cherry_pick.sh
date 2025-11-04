#!/bin/bash

# Complete the cherry-pick after conflict resolution
# Run this from your WSL terminal: bash finish_cherry_pick.sh

set -e

echo "=== Completing Cherry-Pick Recovery ==="
echo ""

# Check if cherry-pick is in progress
if [ -f .git/CHERRY_PICK_HEAD ]; then
    echo "Cherry-pick in progress for commit: $(cat .git/CHERRY_PICK_HEAD)"
    echo ""
    
    # Stage the resolved file
    echo "Staging resolved files..."
    git add app/api/product_routes.py
    
    # Check if there are any other unmerged files
    if git diff --cached --quiet; then
        echo "⚠ No files staged. Checking for other conflicts..."
    else
        echo "✓ Files staged"
    fi
    
    # Continue the cherry-pick
    echo ""
    echo "Completing cherry-pick..."
    if git cherry-pick --continue; then
        echo ""
        echo "✓ SUCCESS! Cherry-pick completed!"
        echo ""
        echo "Recovered commit:"
        git log --oneline -1
        echo ""
        echo "Recent commits:"
        git log --oneline -5
        echo ""
        echo "Next steps:"
        echo "  - Review changes: git show HEAD"
        echo "  - If everything looks good, push: git push origin main"
        echo "  - If you want to see what was recovered: git diff HEAD~1 HEAD"
    else
        echo ""
        echo "⚠ Error completing cherry-pick. Check the output above."
        echo ""
        echo "If you need to abort:"
        echo "  git cherry-pick --abort"
    fi
else
    echo "No cherry-pick in progress."
    echo "Current status:"
    git status
fi

