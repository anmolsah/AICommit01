# Installation Guide

> **Complete step-by-step guide to install and set up Commit Genius**

This guide will walk you through installing Commit Genius and getting it ready for use in your development workflow.

---

## 📋 Prerequisites

Before installing Commit Genius, ensure you have:

### Required
- **Visual Studio Code** (version 1.80.0 or higher)
- **Git** installed and configured on your system
- **Active internet connection** for API requests

### Recommended
- **GitHub or Google account** (for OpenRouter.ai registration)
- **Basic familiarity** with VS Code Source Control panel
- **Git repository** to test the extension

---

## 🚀 Installation Methods

### Method 1: VS Code Marketplace (Recommended)

**This is the easiest and most common way to install Commit Genius.**

#### Step 1: Open Extensions Panel
- **Windows/Linux**: Press `Ctrl + Shift + X`
- **macOS**: Press `Cmd + Shift + X`
- **Alternative**: Click the Extensions icon in the Activity Bar

#### Step 2: Search for Extension
1. Type **"Commit Genius"** in the search box
2. Look for the extension by **aicommit-publisher**
3. Verify it's the correct extension by checking:
   - Publisher: `aicommit-publisher`
   - Icon: Sparkle/star icon
   - Description mentions AI-powered commit messages

#### Step 3: Install
1. Click the **"Install"** button
2. Wait for installation to complete (usually takes 10-30 seconds)
3. You'll see "Installed" status when complete

#### Step 4: Verify Installation
1. Open a Git repository in VS Code
2. Go to Source Control panel (`Ctrl/Cmd + Shift + G`)
3. Look for the **✨ sparkle button** in the Source Control toolbar

---

### Method 2: Command Line Installation

**Perfect for automated setups or if you prefer command line.**

#### Prerequisites
- VS Code CLI tools installed
- Terminal/Command Prompt access

#### Installation Command
```bash
code --install-extension aicommit-publisher.commit-genius
```

#### Verification
```bash
code --list-extensions | grep commit-genius
```

You should see: `aicommit-publisher.commit-genius`

---

### Method 3: Manual Installation (VSIX)

**Use this method if you have a specific version or offline installation needs.**

#### Step 1: Download VSIX File
1. Go to [GitHub Releases](https://github.com/anmolsah/AICommit01/releases)
2. Download the latest `.vsix` file
3. Save it to a memorable location

#### Step 2: Install from VSIX
1. Open VS Code
2. Press `Ctrl/Cmd + Shift + P` to open Command Palette
3. Type: **"Extensions: Install from VSIX..."**
4. Select the command from the dropdown
5. Browse and select your downloaded `.vsix` file
6. Click **"Install"**

#### Step 3: Restart VS Code
- Close and reopen VS Code to ensure proper activation

---

## 🔑 Initial Setup

### Step 1: Get OpenRouter API Key

#### Create Account
1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Click **"Sign In"** or **"Get Started"**
3. Choose sign-in method:
   - **GitHub** (recommended for developers)
   - **Google**
   - **Email** (create new account)

#### Generate API Key
1. After signing in, go to [API Keys page](https://openrouter.ai/keys)
2. Click **"Create Key"**
3. Give your key a descriptive name (e.g., "VS Code Commit Genius")
4. Copy the generated key (starts with `sk-or-`)
5. **Important**: Store this key safely - you won't see it again!

### Step 2: Configure Commit Genius

#### First-Time Setup
1. Open a Git repository in VS Code
2. Make some changes to files
3. Stage changes using the `+` button in Source Control
4. Click the **✨ sparkle button** in Source Control toolbar
5. When prompted, paste your OpenRouter API key
6. Click **"OK"** or press Enter

#### Manual API Key Setup
1. Press `Ctrl/Cmd + Shift + P`
2. Type: **"Commit Genius: Set OpenRouter API Key"**
3. Select the command
4. Paste your API key
5. Press Enter

---

## ⚙️ Configuration Options

### AI Model Selection

#### Access Settings
1. Go to **File** → **Preferences** → **Settings**
2. Search for **"Commit Genius"**
3. Find **"Commit-genius: Model"** setting

#### Available Models

**Free Models** (No additional cost):
- `deepseek/deepseek-chat-v3-0324:free` - Advanced coding model
- `qwen/qwen3-coder:free` - Specialized for code
- `mistralai/mistral-small-3.2-24b-instruct:free` - Balanced performance
- `openai/gpt-oss-120b:free` - Large context understanding

**Premium Models** (Requires credits):
- `anthropic/claude-sonnet-4` - Superior reasoning
- `google/gemini-2.5-pro` - Advanced capabilities
- `x-ai/grok-code-fast-1` - Fast generation
- `deepseek/deepseek-chat-v3.1` - Enhanced accuracy

#### Change Model
1. Click dropdown next to current model
2. Select your preferred model
3. Changes take effect immediately

### Workspace Settings

Create `.vscode/settings.json` in your project:

```json
{
  "commit-genius.model": "mistralai/mistral-small-3.2-24b-instruct:free"
}
```

---

## ✅ Verification & Testing

### Quick Test

1. **Create Test Repository**
   ```bash
   mkdir test-commit-genius
   cd test-commit-genius
   git init
   echo "# Test" > README.md
   git add README.md
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Test Extension**
   - Go to Source Control panel
   - Verify sparkle button is visible
   - Click sparkle button
   - Should generate commit message

### Verification Checklist

- [ ] Extension appears in Extensions list
- [ ] Sparkle button visible in Source Control
- [ ] API key setup works without errors
- [ ] Commit message generates successfully
- [ ] Generated message appears in commit input box
- [ ] Can edit generated message before committing
- [ ] Settings can be accessed and modified

---

## 🔄 Updating the Extension

### Automatic Updates (Default)
- VS Code automatically updates extensions
- Updates happen in background
- Restart VS Code to apply updates

### Manual Update Check
1. Go to Extensions panel
2. Search for "Commit Genius"
3. If update available, click **"Update"**

### Disable Auto-Updates
1. Right-click extension in Extensions panel
2. Select **"Disable Auto Update"**

---

## 🗑️ Uninstallation

### Remove Extension
1. Go to Extensions panel (`Ctrl/Cmd + Shift + X`)
2. Search for "Commit Genius"
3. Click gear icon next to extension
4. Select **"Uninstall"**
5. Restart VS Code

### Clean Up Data
- API keys are automatically removed
- No additional cleanup needed
- Settings are removed with extension

---

## 🆘 Installation Troubleshooting

### Common Issues

#### Extension Not Appearing
**Problem**: Can't find Commit Genius in marketplace

**Solutions**:
- Check spelling: "Commit Genius"
- Verify VS Code version (need 1.80.0+)
- Try searching for publisher: "aicommit-publisher"
- Restart VS Code and try again

#### Installation Fails
**Problem**: Installation stops or shows error

**Solutions**:
- Check internet connection
- Restart VS Code as administrator
- Clear VS Code extension cache
- Try manual VSIX installation

#### Sparkle Button Missing
**Problem**: Button doesn't appear in Source Control

**Solutions**:
- Ensure you're in a Git repository
- Restart VS Code
- Check if extension is enabled
- Verify Git is installed and working

#### API Key Issues
**Problem**: Can't set or API key not working

**Solutions**:
- Verify key starts with `sk-or-`
- Check OpenRouter account has credits
- Try re-entering the key
- Ensure internet connection is stable

### Getting Help

If you're still having issues:

1. **Check our [Troubleshooting Guide](./Troubleshooting-Guide.md)**
2. **Search [GitHub Issues](https://github.com/anmolsah/AICommit01/issues)**
3. **Create new issue** with:
   - VS Code version
   - Operating system
   - Error messages
   - Steps to reproduce

---

## 🎯 Next Steps

After successful installation:

1. **Read the [User Manual](./User-Manual.md)** for detailed usage instructions
2. **Check [FAQ](./FAQ.md)** for common questions
3. **Explore different AI models** to find your preference
4. **Integrate into your daily workflow**

---

## 📞 Support

- 📖 **Documentation**: [User Manual](./User-Manual.md)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/anmolsah/AICommit01/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/anmolsah/AICommit01/discussions)
- 📧 **Contact**: Create an issue with "question" label

---

*Installation guide last updated: 2025*
*For the latest version, visit our [GitHub repository](https://github.com/anmolsah/AICommit01)*