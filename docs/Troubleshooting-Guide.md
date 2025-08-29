# Troubleshooting Guide

> **Solutions to common issues and problems with Commit Genius**

This guide helps you diagnose and resolve common issues you might encounter while using Commit Genius.

---

## 📚 Table of Contents

- [Quick Diagnostics](#-quick-diagnostics)
- [Installation Issues](#-installation-issues)
- [API & Authentication](#-api--authentication)
- [UI & Interface Problems](#-ui--interface-problems)
- [Generation Issues](#-generation-issues)
- [Performance Problems](#-performance-problems)
- [Git Integration Issues](#-git-integration-issues)
- [Model & API Errors](#-model--api-errors)
- [Advanced Troubleshooting](#-advanced-troubleshooting)
- [Getting Additional Help](#-getting-additional-help)

---

## 🔍 Quick Diagnostics

### Before You Start

Run through this quick checklist to identify common issues:

**✅ Basic Requirements**
- [ ] VS Code is updated to latest version
- [ ] Commit Genius extension is installed and enabled
- [ ] You're working in a Git repository
- [ ] You have an OpenRouter API key configured
- [ ] You have staged changes in Git

**✅ Quick Tests**
1. **Extension Status**: Check Extensions panel - Commit Genius should be enabled
2. **Git Repository**: Run `git status` in terminal - should show repository info
3. **API Key**: Settings → Extensions → Commit Genius - API key field should be filled
4. **Staged Changes**: Source Control panel should show "Staged Changes" section

### Diagnostic Commands

**Check VS Code Version**:
```bash
code --version
```

**Check Git Status**:
```bash
git status
git diff --cached  # Shows staged changes
```

**Check Extension Status**:
1. `Ctrl+Shift+P` → "Extensions: Show Installed Extensions"
2. Search "Commit Genius"
3. Should show as "Enabled"

---

## 🔧 Installation Issues

### Extension Not Found in Marketplace

**Problem**: Can't find Commit Genius in VS Code Extensions

**Solutions**:
1. **Search Variations**:
   - Try "Commit Genius"
   - Try "AI Commit"
   - Try "commit message generator"

2. **Manual Installation**:
   ```bash
   code --install-extension commit-genius
   ```

3. **Check VS Code Version**:
   - Ensure VS Code is version 1.60.0 or higher
   - Update VS Code if needed

4. **Network Issues**:
   - Check internet connection
   - Try disabling VPN/proxy temporarily
   - Check corporate firewall settings

### Extension Installed But Not Working

**Problem**: Extension appears installed but features don't work

**Solutions**:
1. **Restart VS Code**:
   - Close VS Code completely
   - Reopen your project
   - Check if sparkle button appears

2. **Enable Extension**:
   - Go to Extensions panel (`Ctrl+Shift+X`)
   - Find Commit Genius
   - Click "Enable" if it shows "Disabled"

3. **Reload Window**:
   - `Ctrl+Shift+P` → "Developer: Reload Window"
   - This refreshes the extension host

4. **Reinstall Extension**:
   - Uninstall Commit Genius
   - Restart VS Code
   - Reinstall from marketplace

### Permission Issues (Windows/Mac/Linux)

**Problem**: Installation fails due to permissions

**Windows Solutions**:
```powershell
# Run VS Code as Administrator
Start-Process code -Verb RunAs

# Or install via PowerShell as Admin
code --install-extension commit-genius
```

**Mac/Linux Solutions**:
```bash
# Check VS Code permissions
ls -la ~/.vscode/extensions/

# Fix permissions if needed
chmod -R 755 ~/.vscode/extensions/

# Install with proper permissions
sudo code --install-extension commit-genius --user-data-dir
```

---

## 🔑 API & Authentication

### "API Key Not Configured" Error

**Problem**: Extension shows "Please configure your OpenRouter API key"

**Step-by-Step Solution**:

1. **Get OpenRouter API Key**:
   - Visit [OpenRouter.ai](https://openrouter.ai)
   - Sign up for free account
   - Go to "API Keys" section
   - Click "Create API Key"
   - Copy the key (starts with `sk-or-v1-`)

2. **Add Key to VS Code**:
   - **Method 1**: Settings UI
     - `File` → `Preferences` → `Settings`
     - Search "Commit Genius"
     - Paste key in "OpenRouter API Key" field
   
   - **Method 2**: Command Palette
     - `Ctrl+Shift+P`
     - "Commit Genius: Set OpenRouter API Key"
     - Paste your API key

3. **Verify Configuration**:
   - Settings should show key as `sk-or-v1-****...****`
   - Try generating a commit message

### "Invalid API Key" Error

**Problem**: API key is rejected by OpenRouter

**Solutions**:
1. **Check Key Format**:
   - Must start with `sk-or-v1-`
   - Should be ~50+ characters long
   - No extra spaces or characters

2. **Regenerate Key**:
   - Go to OpenRouter dashboard
   - Delete old API key
   - Create new API key
   - Update in VS Code settings

3. **Account Issues**:
   - Verify OpenRouter account is active
   - Check if account has been suspended
   - Ensure you're using the correct account

### "Authentication Failed" Error

**Problem**: API calls fail with authentication errors

**Solutions**:
1. **Network Issues**:
   ```bash
   # Test OpenRouter connectivity
   curl -H "Authorization: Bearer YOUR_API_KEY" https://openrouter.ai/api/v1/models
   ```

2. **Proxy/Firewall**:
   - Check corporate firewall settings
   - Whitelist `openrouter.ai` domain
   - Configure proxy settings in VS Code if needed

3. **API Key Permissions**:
   - Ensure API key has proper permissions
   - Some keys may be restricted to specific models

---

## 🎨 UI & Interface Problems

### Sparkle Button Missing

**Problem**: Can't find the ✨ sparkle button in Source Control

**Solutions**:
1. **Check Prerequisites**:
   - Open Source Control panel (`Ctrl+Shift+G`)
   - Ensure you're in a Git repository
   - Must have staged changes
   - Extension must be enabled

2. **Toolbar Location**:
   - Look in Source Control toolbar (top of panel)
   - Should be next to commit message input
   - May be hidden if window is too narrow

3. **Reset UI Layout**:
   - `View` → `Command Palette`
   - "View: Reset View Locations"
   - Restart VS Code

4. **Extension Conflicts**:
   - Disable other Git-related extensions temporarily
   - Check if sparkle button appears
   - Re-enable extensions one by one

### Source Control Panel Issues

**Problem**: Source Control panel not showing properly

**Solutions**:
1. **Open Source Control**:
   - `Ctrl+Shift+G` (Windows/Linux)
   - `Cmd+Shift+G` (Mac)
   - Or `View` → `Source Control`

2. **Git Repository Detection**:
   ```bash
   # Initialize Git if needed
   git init
   
   # Check Git status
   git status
   ```

3. **Refresh Source Control**:
   - Click refresh button in Source Control panel
   - Or `Ctrl+Shift+P` → "Git: Refresh"

### Commit Message Box Not Responding

**Problem**: Can't type in commit message input box

**Solutions**:
1. **Focus Issues**:
   - Click directly in the message box
   - Press `Tab` to cycle through UI elements
   - Try `Ctrl+Shift+G` to refocus panel

2. **Extension Conflicts**:
   - Disable other extensions that modify Git UI
   - Common conflicts: GitLens, Git Graph, etc.
   - Test with extensions disabled

3. **VS Code Reset**:
   - `Ctrl+Shift+P` → "Developer: Reload Window"
   - If that fails, restart VS Code completely

---

## 🤖 Generation Issues

### "No Staged Changes Found" Message

**Problem**: Extension says no staged changes when you have changes

**Solutions**:
1. **Stage Changes Properly**:
   - Open Source Control panel
   - Click `+` next to individual files
   - Or click `+` next to "Changes" header for all files
   - Files should move to "Staged Changes" section

2. **Check Git Status**:
   ```bash
   git status
   # Should show "Changes to be committed:"
   
   git diff --cached
   # Should show actual diff content
   ```

3. **File Permissions**:
   - Ensure files are not locked by other processes
   - Check file permissions allow Git access
   - Try staging from command line: `git add filename`

### Generated Messages Are Generic

**Problem**: AI generates unhelpful messages like "update files"

**Solutions**:
1. **Improve Change Quality**:
   - Stage related changes together
   - Use descriptive function/variable names
   - Add meaningful comments to code
   - Avoid staging generated/build files

2. **Try Different Models**:
   - Switch to DeepSeek Chat for better analysis
   - Try Claude Sonnet 4 for premium quality
   - Qwen Coder works well for code-heavy changes

3. **Optimize Staging Strategy**:
   ```bash
   # Good: Related changes
   git add src/auth/login.js src/auth/middleware.js
   
   # Bad: Unrelated changes
   git add src/ docs/ package.json README.md
   ```

### Messages in Wrong Language

**Problem**: Generated messages are not in English (or desired language)

**Solutions**:
1. **Model Selection**:
   - Some models default to other languages
   - Try Mistral Small or OpenAI models for English
   - Claude models generally produce English output

2. **Code Context**:
   - Use English comments in your code
   - Use English function/variable names
   - This helps AI understand language preference

3. **Manual Editing**:
   - Always review and edit generated messages
   - Translate if needed
   - Set up custom templates if required

---

## ⚡ Performance Problems

### Slow Message Generation

**Problem**: Takes too long to generate commit messages

**Solutions**:
1. **Model Selection**:
   - **Fastest**: Mistral Small (2-3 seconds)
   - **Medium**: Qwen Coder (2-4 seconds)
   - **Slower**: DeepSeek Chat (3-5 seconds)
   - **Premium Fast**: Claude Sonnet 4 (1-2 seconds)

2. **Reduce Diff Size**:
   - Stage fewer files at once
   - Break large changes into smaller commits
   - Avoid staging large generated files

3. **Network Optimization**:
   - Check internet connection speed
   - Use wired connection instead of WiFi
   - Disable VPN if causing slowdowns

### "Request Timeout" Errors

**Problem**: API requests time out before completion

**Solutions**:
1. **Reduce Change Size**:
   ```bash
   # Check diff size
   git diff --cached --stat
   
   # If too large, stage fewer files
   git reset HEAD  # Unstage all
   git add specific-file.js  # Stage one file
   ```

2. **Network Issues**:
   - Test with smaller changes first
   - Check if issue persists across different times
   - Try different network connection

3. **Model Selection**:
   - Switch to faster models (Mistral Small)
   - Avoid slower models for large diffs
   - Consider premium models for better performance

### High Memory Usage

**Problem**: VS Code becomes slow or unresponsive

**Solutions**:
1. **Restart VS Code**:
   - Close and reopen VS Code
   - This clears extension memory usage

2. **Reduce Workspace Size**:
   - Close unnecessary files/tabs
   - Exclude large directories from VS Code workspace
   - Use `.gitignore` to exclude build artifacts

3. **Extension Management**:
   - Disable unused extensions
   - Update all extensions to latest versions
   - Consider using VS Code profiles for different projects

---

## 📁 Git Integration Issues

### "Not a Git Repository" Error

**Problem**: Extension can't detect Git repository

**Solutions**:
1. **Initialize Git**:
   ```bash
   # In your project directory
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Open Correct Directory**:
   - Ensure VS Code is opened in the Git repository root
   - Look for `.git` folder in workspace
   - Use `File` → `Open Folder` to open correct directory

3. **Git Installation**:
   ```bash
   # Check Git is installed
   git --version
   
   # Install Git if missing (Windows)
   winget install Git.Git
   
   # Install Git if missing (Mac)
   brew install git
   
   # Install Git if missing (Ubuntu/Debian)
   sudo apt install git
   ```

### Git Commands Failing

**Problem**: Extension can't execute Git commands

**Solutions**:
1. **Git Path Configuration**:
   - `File` → `Preferences` → `Settings`
   - Search "git.path"
   - Set to full Git executable path if needed
   - Windows: `C:\Program Files\Git\bin\git.exe`

2. **Permissions**:
   ```bash
   # Check Git permissions
   git config --list
   
   # Set user if not configured
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **Repository Corruption**:
   ```bash
   # Check repository integrity
   git fsck
   
   # Reset if corrupted
   git reset --hard HEAD
   ```

### Staging Issues

**Problem**: Can't stage files or staging doesn't work

**Solutions**:
1. **File Status Check**:
   ```bash
   # Check what Git sees
   git status --porcelain
   
   # Check for ignored files
   git check-ignore filename
   ```

2. **Manual Staging**:
   ```bash
   # Stage specific file
   git add path/to/file.js
   
   # Stage all changes
   git add .
   
   # Force stage if needed
   git add -f filename
   ```

3. **Reset and Retry**:
   ```bash
   # Unstage everything
   git reset HEAD
   
   # Re-stage selectively
   git add specific-files
   ```

---

## 🌐 Model & API Errors

### "Rate Limit Exceeded" Error

**Problem**: Hit API rate limits for free models

**Solutions**:
1. **Wait for Reset**:
   - Free models reset limits hourly
   - Check OpenRouter dashboard for exact limits
   - Plan commits around rate limits

2. **Switch Models**:
   - Try different free models
   - Each model has separate rate limits
   - Rotate between models if needed

3. **Upgrade to Premium**:
   - Premium models have no rate limits
   - Cost is typically $0.005-0.01 per request
   - Good for heavy development work

### "Model Not Available" Error

**Problem**: Selected AI model is not accessible

**Solutions**:
1. **Check Model Status**:
   - Visit [OpenRouter Models](https://openrouter.ai/models)
   - Verify model is still available
   - Some models may be temporarily down

2. **Switch Models**:
   - Go to Settings → Extensions → Commit Genius
   - Select different model from dropdown
   - Try a reliable model like Mistral Small

3. **Account Permissions**:
   - Some models require special access
   - Check OpenRouter account status
   - Verify API key has model permissions

### "Insufficient Credits" Error

**Problem**: Not enough credits for premium models

**Solutions**:
1. **Add Credits**:
   - Go to OpenRouter dashboard
   - Add credits to your account
   - Minimum usually $5-10

2. **Use Free Models**:
   - Switch to free tier models
   - DeepSeek, Qwen, Mistral have free options
   - No credits required

3. **Monitor Usage**:
   - Check credit usage in OpenRouter dashboard
   - Set up usage alerts
   - Budget for development needs

### API Connection Errors

**Problem**: Can't connect to OpenRouter API

**Solutions**:
1. **Network Connectivity**:
   ```bash
   # Test basic connectivity
   ping openrouter.ai
   
   # Test HTTPS access
   curl -I https://openrouter.ai
   ```

2. **Firewall/Proxy Issues**:
   - Whitelist `openrouter.ai` in firewall
   - Configure proxy settings if needed
   - Check corporate network restrictions

3. **DNS Issues**:
   ```bash
   # Flush DNS cache (Windows)
   ipconfig /flushdns
   
   # Flush DNS cache (Mac)
   sudo dscacheutil -flushcache
   
   # Try different DNS servers
   # Google: 8.8.8.8, 8.8.4.4
   # Cloudflare: 1.1.1.1, 1.0.0.1
   ```

---

## 🔬 Advanced Troubleshooting

### Enable Debug Logging

**For detailed error information**:

1. **VS Code Developer Tools**:
   - `Help` → `Toggle Developer Tools`
   - Go to "Console" tab
   - Look for Commit Genius errors

2. **Extension Logs**:
   - `Ctrl+Shift+P` → "Developer: Show Logs"
   - Select "Extension Host"
   - Look for Commit Genius entries

3. **Network Debugging**:
   - Developer Tools → "Network" tab
   - Try generating commit message
   - Check for failed API requests

### Reset Extension Settings

**To start fresh with default settings**:

1. **Via Settings UI**:
   - `File` → `Preferences` → `Settings`
   - Search "Commit Genius"
   - Click gear icon → "Reset Setting" for each option

2. **Via Settings JSON**:
   ```json
   // Remove these lines from settings.json
   {
     "commit-genius.openRouterApiKey": "...",
     "commit-genius.model": "..."
   }
   ```

3. **Complete Reset**:
   - Uninstall Commit Genius
   - Restart VS Code
   - Reinstall extension
   - Reconfigure from scratch

### Check Extension Dependencies

**Verify required components**:

1. **Node.js Version**:
   ```bash
   node --version  # Should be 14.x or higher
   ```

2. **VS Code API Compatibility**:
   - Check extension details in marketplace
   - Ensure VS Code version meets requirements
   - Update VS Code if needed

3. **System Requirements**:
   - **OS**: Windows 10+, macOS 10.15+, Linux (recent)
   - **Memory**: 4GB+ RAM recommended
   - **Network**: Stable internet connection

### Performance Profiling

**If extension is causing VS Code slowdowns**:

1. **Extension Performance**:
   - `Ctrl+Shift+P` → "Developer: Show Running Extensions"
   - Look for high CPU/memory usage
   - Disable problematic extensions

2. **Startup Performance**:
   - `Ctrl+Shift+P` → "Developer: Startup Performance"
   - Check extension activation times
   - Report if Commit Genius is unusually slow

---

## 📞 Getting Additional Help

### Before Asking for Help

**Gather this information**:

1. **System Information**:
   - VS Code version (`Help` → `About`)
   - Operating system and version
   - Commit Genius extension version

2. **Error Details**:
   - Exact error messages
   - Steps to reproduce the issue
   - Screenshots if helpful

3. **Configuration**:
   - Which AI model you're using
   - Whether you're using free or premium models
   - Any custom settings you've configured

### Support Channels

**1. Documentation First**:
- 📖 [User Manual](./User-Manual.md)
- ❓ [FAQ](./FAQ.md)
- 🔧 [Installation Guide](./Installation-Guide.md)

**2. Community Support**:
- 💬 [GitHub Discussions](https://github.com/anmolsah/AICommit01/discussions)
- 🔍 Search existing discussions first
- 📝 Create new discussion for questions

**3. Bug Reports**:
- 🐛 [GitHub Issues](https://github.com/anmolsah/AICommit01/issues)
- 🔍 Search existing issues first
- 📝 Create detailed bug report

**4. Feature Requests**:
- 💡 [GitHub Issues](https://github.com/anmolsah/AICommit01/issues/new)
- 🏷️ Use "enhancement" label
- 📋 Describe use case and benefits

### Creating Effective Bug Reports

**Include this information**:

```markdown
## Bug Report

**Environment:**
- VS Code Version: 1.85.0
- Commit Genius Version: 1.2.3
- OS: Windows 11 / macOS 14 / Ubuntu 22.04
- Git Version: 2.40.0

**Expected Behavior:**
Describe what should happen

**Actual Behavior:**
Describe what actually happens

**Steps to Reproduce:**
1. Open VS Code in Git repository
2. Stage some changes
3. Click sparkle button
4. Error occurs

**Error Messages:**
```
Paste exact error messages here
```

**Screenshots:**
Attach screenshots if helpful

**Additional Context:**
- AI model being used
- Size of changes being committed
- Any other relevant information
```

---

## 🎯 Prevention Tips

### Best Practices to Avoid Issues

1. **Keep Everything Updated**:
   - Update VS Code regularly
   - Update Commit Genius when new versions release
   - Keep Git updated

2. **Maintain Clean Repositories**:
   - Use proper `.gitignore` files
   - Don't commit large binary files
   - Keep commits focused and atomic

3. **Monitor API Usage**:
   - Check OpenRouter dashboard regularly
   - Set up usage alerts
   - Plan commits around rate limits

4. **Regular Maintenance**:
   - Restart VS Code periodically
   - Clear extension cache if issues persist
   - Review and clean up settings occasionally

### Early Warning Signs

**Watch for these indicators**:
- ⚠️ Slower than usual message generation
- ⚠️ Generic or poor quality messages
- ⚠️ Intermittent connection errors
- ⚠️ VS Code becoming sluggish
- ⚠️ Unusual error messages

**Take action early** to prevent bigger problems!

---

*Troubleshooting Guide last updated: 2024*
*For the latest solutions, visit our [GitHub repository](https://github.com/anmolsah/AICommit01)*