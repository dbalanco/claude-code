# Claude Code Status Line Guide

This guide explains the custom status line configuration for this project.

## Overview

The status line provides real-time information about your development environment, including your location in the file system, git repository status, and current time.

## Status Line Components

### Time Display
**`[20:32:42]`**
- Current time in HH:MM:SS format (24-hour)
- Updates each time a new prompt appears
- Color: Cyan with dim brackets

### User and System Information
**`darrynbalanco@Darryns-iMac`**
- Format: `username@hostname`
- `darrynbalanco` = your username
- `Darryns-iMac` = your computer's name
- Colors: Username (cyan), Hostname (green)

### Current Directory
**`~/Desktop/GitHub/projects/deal-engine-user-guide`**
- Shows your current working directory
- `~` represents your home directory
- Full path displayed for easy navigation
- Color: Blue

## Git Repository Information

When working in a git repository, additional information appears:

### Branch Name
**`main`** or **`feature-branch`**
- Shows your current git branch
- Color: Magenta/Purple

### Status Indicators

#### Clean/Dirty Status
- **✓** (green) = Clean working directory
  - No uncommitted changes
  - All changes are committed

- **✗** (red) = Uncommitted changes present
  - Modified files
  - Staged but uncommitted changes
  - Untracked files that need attention

#### Tracking Information

Shows how your local branch compares to the remote:

- **↑N** (green) = Ahead by N commits
  - You have local commits not yet pushed to remote
  - Example: `↑3` means 3 commits ahead

- **↓N** (yellow) = Behind by N commits
  - Remote has commits you don't have locally
  - Example: `↓2` means 2 commits behind
  - Time to pull updates!

- **↑N↓M** (yellow) = Diverged
  - Your branch and remote have different commits
  - Example: `↑2↓1` means 2 ahead, 1 behind
  - May need to merge or rebase

### GitHub Branding
**`⚡ GitHub`**
- Always appears on the far right side
- Indicates GitHub-integrated environment
- Color: Bright white

## Color Reference

| Element | Color | Purpose |
|---------|-------|---------|
| Time | Cyan | Timestamp visibility |
| Username | Cyan | User identification |
| Hostname | Green | System identification |
| Directory | Blue | Path clarity |
| Git Branch | Magenta | Branch visibility |
| Clean Status (✓) | Green | Positive indicator |
| Dirty Status (✗) | Red | Attention needed |
| Ahead Commits (↑) | Green | Ready to push |
| Behind Commits (↓) | Yellow | Need to pull |
| Diverged (↑↓) | Yellow | Action required |
| GitHub Brand | Bright White | Brand visibility |

## Example Status Lines

### Non-Git Directory
```
[20:32:42] darrynbalanco@Darryns-iMac:~/Documents/notes                    ⚡ GitHub
```

### Clean Git Repository
```
[20:32:42] darrynbalanco@Darryns-iMac:~/projects/my-app on main ✓         ⚡ GitHub
```

### Uncommitted Changes
```
[20:32:42] darrynbalanco@Darryns-iMac:~/projects/my-app on main ✗         ⚡ GitHub
```

### Ahead of Remote
```
[20:32:42] darrynbalanco@Darryns-iMac:~/projects/my-app on main ✓ ↑3      ⚡ GitHub
```

### Behind Remote
```
[20:32:42] darrynbalanco@Darryns-iMac:~/projects/my-app on main ✓ ↓2      ⚡ GitHub
```

### Diverged Branch
```
[20:32:42] darrynbalanco@Darryns-iMac:~/projects/my-app on main ✓ ↑2↓1    ⚡ GitHub
```

## Configuration

The status line is configured in:
- **Settings file**: `/Users/darrynbalanco/.claude/settings.json`
- **Script file**: `/Users/darrynbalanco/.claude/statusline-command.sh`

### How It Works

1. Claude Code calls the bash script on each prompt
2. Script detects terminal width and current location
3. Git information is gathered (if in a repository)
4. Components are formatted with ANSI color codes
5. Padding is calculated to right-align GitHub branding
6. Final formatted line is displayed

## Benefits

- **At-a-glance information** - No need to run `pwd`, `git status`, or `date`
- **Git awareness** - Immediate visibility of repository state
- **Visual clarity** - Color coding makes information easy to scan
- **Professional appearance** - Clean, organized display

## Troubleshooting

### GitHub text wrapping to next line
- Terminal width setting may need adjustment
- Edit `cols=130` in the statusline script
- Reduce value if wrapping occurs

### Colors not displaying
- Check terminal supports ANSI colors
- Verify script has proper ANSI escape sequences

### Git info not showing
- Ensure you're in a git repository
- Run `git status` to verify repository is valid

### Status line not updating
- Restart Claude Code
- Check settings.json configuration
- Verify script has execute permissions

---

*This status line configuration enhances the Claude Code development experience by providing comprehensive context at every prompt.*