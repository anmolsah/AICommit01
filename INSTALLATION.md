# Commit Genius - Installation & Usage Guide

## 🚀 Quick Installation

### Method 1: Install from VSIX (Recommended)

```bash
# Install the extension
code --install-extension commit-genius-2.5.0.vsix

# Reload VS Code
# Press Ctrl+Shift+P and run "Developer: Reload Window"
```

### Method 2: Development Installation

```bash
# Copy extension to VS Code extensions folder
# Windows: %USERPROFILE%\.vscode\extensions\
# macOS: ~/.vscode/extensions/
# Linux: ~/.vscode/extensions/

cp -r . ~/.vscode/extensions/commit-genius-2.5.0/
```

## ⚙️ Setup

### 1. Get OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/keys)
2. Sign in with GitHub or Google
3. Click "Create Key"
4. Copy your API key (starts with `sk-or-...`)

### 2. Configure Commit Genius

1. Open VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Commit Genius: Set OpenRouter API Key"
4. Paste your API key
5. Click Enter

### 3. Choose AI Model (Optional)

1. Go to Settings (`Ctrl+,`)
2. Search for "Commit Genius"
3. Select your preferred model:
   - **Free Models**: DeepSeek, Qwen, Mistral, etc.
   - **Premium Models**: Claude, GPT-4, Gemini, etc.

## 🎯 How to Use

### Basic Usage

1. **Make changes** in your Git repository
2. **Click the ✨ sparkle button** in Source Control panel
3. **Review** the generated commit message
4. **Edit if needed** and commit!

### Advanced Usage

- **Command Palette**: `Ctrl+Shift+P` → "Commit Genius: Generate AI Commit Message"
- **Keyboard Shortcut**: You can assign a custom shortcut in VS Code settings
- **Batch Processing**: Works with multiple file changes automatically

## 🔧 Troubleshooting

### Common Issues

#### ❌ "No Git repository found"

**Solution**: Open a folder that contains a `.git` directory

#### ❌ "API key not set"

**Solution**: Run "Commit Genius: Set OpenRouter API Key" command

#### ❌ "Rate limit exceeded"

**Solutions**:

- Wait a few minutes and try again
- Switch to a different free model
- Upgrade to a premium model

#### ❌ "Network error"

**Solutions**:

- Check your internet connection
- Verify firewall settings
- Try again in a few moments

#### ❌ Extension not appearing

**Solutions**:

- Reload VS Code window (`Ctrl+Shift+P` → "Developer: Reload Window")
- Check if extension is enabled in Extensions panel
- Reinstall the extension

### Debug Mode

1. Open VS Code Developer Console (`Help` → `Toggle Developer Tools`)
2. Look for "Commit Genius" logs in Console tab
3. Report issues with console output

## 🎨 Customization

### Model Selection

Choose from these models in settings:

**Free Models** (No cost):

- `deepseek/deepseek-chat-v3-0324:free` - Best for code analysis
- `mistralai/mistral-small-3.2-24b-instruct:free` - Balanced performance
- `qwen/qwen3-coder:free` - Specialized for coding

**Premium Models** (Paid):

- `anthropic/claude-sonnet-4` - Superior reasoning
- `google/gemini-2.5-pro` - Advanced capabilities
- `x-ai/grok-code-fast-1` - Fast generation

### Settings Configuration

Add to your VS Code `settings.json`:

```json
{
  "commit-genius.model": "mistralai/mistral-small-3.2-24b-instruct:free"
}
```

## 📊 Features Verification

### ✅ What Works

- [x] AI-powered commit message generation
- [x] Conventional commit format (feat:, fix:, chore:, etc.)
- [x] Automatic file staging
- [x] Secure API key storage
- [x] Multiple AI model support
- [x] Error handling and user feedback
- [x] Source Control panel integration

### 🔄 Workflow

1. **Edit files** → 2. **Click ✨** → 3. **AI analyzes** → 4. **Message generated** → 5. **Review & commit**

## 🆘 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Look at VS Code Developer Console for errors
3. Try with a different AI model
4. Verify your API key is valid
5. Report issues on GitHub

## 🎉 Success

You should now see:

- ✨ Sparkle button in Source Control panel
- AI-generated commit messages
- Automatic file staging
- Professional conventional commit format

Happy committing! 🚀
