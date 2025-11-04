#!/bin/bash

# Complete the cherry-pick after resolving conflict
# Run this from your WSL terminal: bash complete_cherry_pick.sh

set -e

echo "=== Completing Cherry-Pick ==="
echo ""

# Check if there's a conflict
if git status | grep -q "Unmerged paths"; then
    echo "Conflict detected in app/api/product_routes.py"
    echo "Resolving by keeping the HEAD version (with product_details initialization)..."
    
    # Accept our version (HEAD) which has product_details = []
    git checkout --ours app/api/product_routes.py
    
    # Remove conflict markers if any still exist
    sed -i '/^<<<<<<< HEAD$/,/^>>>>>>> a7a735d/d' app/api/product_routes.py || true
    # Ensure product_details is initialized
    if ! grep -q "product_details = \[\]" app/api/product_routes.py; then
        # Find the line and add it
        sed -i '/\.order_by(func\.random())\.all()/a\    product_details = []' app/api/product_routes.py
    fi
    
    echo "✓ Conflict resolved"
    echo ""
fi

# Stage the resolved file
echo "Staging resolved file..."
git add app/api/product_routes.py

# Continue the cherry-pick
echo "Continuing cherry-pick..."
if git cherry-pick --continue; then
    echo ""
    echo "✓ SUCCESS! Cherry-pick completed."
    echo ""
    git log --oneline -3
    echo ""
    echo "Next steps:"
    echo "  - Review the changes: git show HEAD"
    echo "  - If everything looks good, push: git push origin main"
else
    echo ""
    echo "⚠ Error continuing cherry-pick. Check the output above."
fi

