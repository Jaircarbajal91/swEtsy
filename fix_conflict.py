#!/usr/bin/env python3
"""
Fix the merge conflict in app/api/product_routes.py
"""

import re

# Read the file
with open('app/api/product_routes.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the conflict
pattern = r'\.order_by\(func\.random\(\)\)\.all\(\)\n<<<<<<< HEAD\n    product_details = \[\]\n=======\n>>>>>>> a7a735d \(publishing to deploy\)\n    if products'

# Replace with resolved version
replacement = r'.order_by(func.random()).all()\n    product_details = []\n    if products'

# Check if conflict exists
if '<<<<<<< HEAD' in content:
    print("Conflict found. Resolving...")
    # Replace the conflict
    new_content = re.sub(pattern, replacement, content)
    
    # Also handle any remaining conflict markers
    new_content = re.sub(r'<<<<<<< HEAD\n.*?\n=======\n.*?\n>>>>>>> a7a735d \(publishing to deploy\)\n', '', new_content, flags=re.DOTALL)
    
    # Write back
    with open('app/api/product_routes.py', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("✓ Conflict resolved")
else:
    print("No conflict markers found. File may already be resolved.")

