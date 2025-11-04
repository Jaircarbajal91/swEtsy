#!/usr/bin/env python3
"""
Complete the cherry-pick by staging the resolved file and continuing
"""
import subprocess
import sys
import os

def run_command(cmd, check=True):
    """Run a git command"""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            check=check
        )
        return result.stdout.strip(), result.returncode == 0
    except subprocess.CalledProcessError as e:
        return e.stderr.strip(), False

def main():
    print("=== Completing Cherry-Pick ===\n")
    
    # Check if cherry-pick is in progress
    if not os.path.exists('.git/CHERRY_PICK_HEAD'):
        print("No cherry-pick in progress.")
        output, _ = run_command('git status', check=False)
        print(output)
        return
    
    cherry_pick_commit = open('.git/CHERRY_PICK_HEAD').read().strip()
    print(f"Cherry-picking commit: {cherry_pick_commit[:8]}...\n")
    
    # Stage the resolved file
    print("1. Staging resolved file...")
    output, success = run_command('git add app/api/product_routes.py', check=False)
    if success:
        print("   ✓ File staged")
    else:
        print(f"   ⚠ Warning: {output}")
    
    # Check status
    print("\n2. Checking status...")
    output, _ = run_command('git status --short', check=False)
    if output:
        print(output)
    else:
        print("   No changes to stage")
    
    # Continue cherry-pick
    print("\n3. Completing cherry-pick...")
    output, success = run_command('git cherry-pick --continue', check=False)
    
    if success:
        print("\n✓ SUCCESS! Cherry-pick completed!\n")
        print("Recovered commit:")
        log_output, _ = run_command('git log --oneline -1', check=False)
        print(log_output)
        print("\nRecent commits:")
        log_output, _ = run_command('git log --oneline -5', check=False)
        print(log_output)
        print("\nNext steps:")
        print("  - Review changes: git show HEAD")
        print("  - See what was recovered: git diff HEAD~1 HEAD")
        print("  - If everything looks good, push: git push origin main")
    else:
        print(f"\n⚠ Error: {output}")
        print("\nYou may need to resolve this manually or abort:")
        print("  git cherry-pick --abort")

if __name__ == '__main__':
    main()

