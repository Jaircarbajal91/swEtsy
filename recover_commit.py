#!/usr/bin/env python3
"""
Recovery script to cherry-pick the missing commit a7a735d
Run this from your terminal: python3 recover_commit.py
"""

import subprocess
import sys

def run_git_command(cmd, check=True):
    """Run a git command and return the result"""
    try:
        result = subprocess.run(
            ['git'] + cmd,
            capture_output=True,
            text=True,
            check=check
        )
        return result.stdout.strip(), result.returncode == 0
    except subprocess.CalledProcessError as e:
        return e.stderr.strip(), False

def main():
    print("=== Recovering missing commit a7a735d ===\n")
    
    # Ensure we're on main branch
    print("1. Checking out main branch...")
    output, success = run_git_command(['checkout', 'main'])
    if not success:
        print(f"   Error: {output}")
        sys.exit(1)
    print("   ✓ On main branch")
    
    # Verify backup exists
    print("2. Verifying backup branch exists...")
    output, exists = run_git_command(['show-ref', '--verify', '--quiet', 'refs/heads/backup-main'], check=False)
    if not exists:
        print("   Creating backup branch...")
        output, success = run_git_command(['branch', 'backup-main'])
        if not success:
            print(f"   Error creating backup: {output}")
            sys.exit(1)
        print("   ✓ Backup branch created")
    else:
        print("   ✓ Backup branch 'backup-main' exists")
    
    # Attempt cherry-pick
    print("3. Cherry-picking commit a7a735d...")
    output, success = run_git_command(['cherry-pick', 'a7a735d'], check=False)
    
    if success:
        print("\n✓ SUCCESS! Commit has been recovered.\n")
        print("Current status:")
        log_output, _ = run_git_command(['log', '--oneline', '-5'])
        print(log_output)
        print("\nNext steps:")
        print("  - Review the changes: git show HEAD")
        print("  - If everything looks good, push: git push origin main")
        print("  - If there are issues, reset: git reset --hard backup-main")
    else:
        print("\n⚠ CONFLICTS detected!\n")
        print("Please resolve conflicts manually:")
        print("  1. Check conflicted files: git status")
        print("  2. Resolve conflicts in the files")
        print("  3. Stage resolved files: git add <file>")
        print("  4. Complete cherry-pick: git cherry-pick --continue")
        print("\nOr abort: git cherry-pick --abort")
        print(f"\nGit output: {output}")

if __name__ == '__main__':
    main()

