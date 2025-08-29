# Frequently Asked Questions (FAQ)

> **Quick answers to common questions about Commit Genius**

Find answers to the most frequently asked questions about installation, usage, troubleshooting, and features.

---

## 📚 Table of Contents

- [General Questions](#-general-questions)
- [Installation & Setup](#-installation--setup)
- [Usage & Features](#-usage--features)
- [AI Models & API](#-ai-models--api)
- [Troubleshooting](#-troubleshooting)
- [Performance & Limits](#-performance--limits)
- [Security & Privacy](#-security--privacy)
- [Contributing & Support](#-contributing--support)

---

## 🤔 General Questions

### What is Commit Genius?

Commit Genius is a VS Code extension that uses AI to automatically generate meaningful, conventional commit messages based on your staged changes. It analyzes your code diffs and creates descriptive commit messages following best practices.

### How does it work?

Commit Genius:
1. Reads your staged git changes (diffs)
2. Sends the diff to an AI model via OpenRouter API
3. Receives an AI-generated commit message
4. Populates the commit message box in VS Code's Source Control panel

### Is it free to use?

**Yes!** Commit Genius offers several free AI models:
- DeepSeek Chat (free tier)
- Qwen Coder (free tier)
- Mistral Small (free tier)
- OpenAI GPT-OSS (free tier)

Premium models are also available for enhanced performance.

### What makes it different from other commit message generators?

- **Multiple AI Models**: Choose from 10+ different AI models
- **Conventional Commits**: Follows industry-standard commit formats
- **Context Awareness**: Analyzes actual code changes, not just file names
- **VS Code Integration**: Seamless workflow within your IDE
- **Free Options**: Multiple free models available

---

## 🔧 Installation & Setup

### How do I install Commit Genius?

**Method 1: VS Code Marketplace**
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search "Commit Genius"
4. Click "Install"

**Method 2: Command Line**
```bash
code --install-extension commit-genius
```

See our [Installation Guide](./Installation-Guide.md) for detailed instructions.

### Do I need an OpenRouter account?

**Yes**, you need a free OpenRouter account to use the AI models:

1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Generate an API key
4. Add the key to VS Code settings

### How do I get an OpenRouter API key?

1. Go to [OpenRouter.ai](https://openrouter.ai)
2. Sign up or log in
3. Navigate to "API Keys" in your dashboard
4. Click "Create API Key"
5. Copy the key (starts with `sk-or-v1-...`)
6. Add to VS Code: **Settings** → **Extensions** → **Commit Genius** → **API Key**

### Where do I enter my API key?

**Via Settings UI**:
1. **File** → **Preferences** → **Settings**
2. Search "Commit Genius"
3. Enter key in **"OpenRouter API Key"** field

**Via Command Palette**:
1. `Ctrl+Shift+P`
2. Type "Commit Genius: Set OpenRouter API Key"
3. Enter your API key

### Can I use it without an API key?

**No**, an OpenRouter API key is required. However:
- OpenRouter accounts are **free**
- Several AI models have **free tiers**
- No credit card required for free models

---

## 💡 Usage & Features

### How do I generate a commit message?

1. **Stage your changes** (click `+` next to files)
2. **Click the ✨ sparkle button** in Source Control toolbar
3. **Wait 2-5 seconds** for AI generation
4. **Review and edit** the generated message if needed
5. **Commit** your changes

### Where is the sparkle button?

The ✨ sparkle button is located in the **Source Control panel toolbar**, next to the commit message input box. If you don't see it:
- Ensure Commit Genius is installed and enabled
- Check that you have staged changes
- Restart VS Code if needed

### Can I customize the commit message format?

Commit Genius follows **Conventional Commits** format by default:
```
type(scope): description

Examples:
feat: add user authentication
fix(auth): resolve login timeout issue
docs: update API documentation
```

The AI automatically determines the appropriate type and scope based on your changes.

### What if I don't like the generated message?

**You can always edit it!**
- Click in the commit message box
- Modify the text as needed
- Add additional context
- Change the commit type if necessary

### Does it work with all programming languages?

**Yes!** Commit Genius works with any programming language that Git can track:
- JavaScript/TypeScript
- Python
- Java
- C#/.NET
- Go
- Rust
- PHP
- Ruby
- And many more...

### Can I use it for non-code files?

**Absolutely!** It works great for:
- Documentation (Markdown, text files)
- Configuration files (JSON, YAML, XML)
- Images and assets
- Database migrations
- Build scripts

---

## 🤖 AI Models & API

### Which AI model should I choose?

**For beginners**: Start with **Mistral Small** (free)
- Good balance of speed and accuracy
- Generous rate limits
- Works well for most use cases

**For complex projects**: **DeepSeek Chat** (free)
- Better at understanding complex code
- More detailed analysis
- Slower but more accurate

**For heavy usage**: **Claude Sonnet 4** (premium)
- Highest quality results
- No rate limits
- Best for professional development

### What's the difference between free and premium models?

**Free Models**:
- ✅ No cost to use
- ⚠️ Rate limits (10-25 requests/hour)
- ⚠️ Slower response times
- ✅ Good quality for most use cases

**Premium Models**:
- 💰 Small cost per request (~$0.005-0.01)
- ✅ No rate limits
- ✅ Faster response times
- ✅ Higher quality analysis
- ✅ Advanced capabilities

### How do I change AI models?

1. **File** → **Preferences** → **Settings**
2. Search "Commit Genius"
3. Change **"Model"** dropdown
4. New model takes effect immediately

### What are the rate limits for free models?

| Model | Requests/Hour | Response Time |
|-------|---------------|---------------|
| Mistral Small | ~25 | 2-3 seconds |
| DeepSeek Chat | ~20 | 3-5 seconds |
| Qwen Coder | ~15 | 2-4 seconds |
| OpenAI GPT-OSS | ~10 | 4-6 seconds |

*Limits may vary based on OpenRouter's current policies*

### How much do premium models cost?

| Model | Cost per Request | Best For |
|-------|------------------|----------|
| Claude Sonnet 4 | ~$0.01 | Highest quality |
| Gemini 2.5 Pro | ~$0.008 | Good value |
| GPT-4 Turbo | ~$0.012 | Complex analysis |
| Grok Beta | ~$0.006 | Fast processing |

*Costs are approximate and may change*

---

## 🔍 Troubleshooting

### The sparkle button doesn't appear

**Check these items**:
1. ✅ Commit Genius is installed and enabled
2. ✅ You're in a Git repository
3. ✅ You have staged changes
4. ✅ Source Control panel is open
5. 🔄 Try restarting VS Code

### "API key not configured" error

**Solution**:
1. Get an OpenRouter API key from [OpenRouter.ai](https://openrouter.ai)
2. Add it to VS Code settings:
   - **Settings** → **Extensions** → **Commit Genius** → **API Key**
3. Ensure the key starts with `sk-or-v1-`

### "No staged changes found" message

**You need to stage changes first**:
1. Make changes to files
2. Open Source Control panel (`Ctrl+Shift+G`)
3. Click `+` next to files to stage them
4. Files should appear in "Staged Changes" section
5. Now try generating a commit message

### Generated message is generic or unhelpful

**Try these solutions**:
1. **Stage fewer files** - focus on related changes
2. **Use a different AI model** - try DeepSeek or Claude
3. **Make more descriptive changes** - add comments, use clear function names
4. **Break up large changes** - commit smaller, focused changes

### "Rate limit exceeded" error

**You've hit the free tier limit**:
1. **Wait an hour** for limits to reset
2. **Switch to a different free model**
3. **Upgrade to a premium model** for no limits
4. **Reduce usage** - generate fewer messages per hour

### Extension not working after VS Code update

1. **Update Commit Genius** to the latest version
2. **Restart VS Code** completely
3. **Check extension is enabled** in Extensions panel
4. **Reinstall if needed** - uninstall and reinstall

---

## ⚡ Performance & Limits

### How fast is message generation?

**Response times vary by model**:
- **Fastest**: Mistral Small (2-3 seconds)
- **Medium**: Qwen Coder (2-4 seconds)
- **Slower**: DeepSeek Chat (3-5 seconds)
- **Premium**: Claude Sonnet 4 (1-2 seconds)

### Can I generate multiple messages quickly?

**With free models**: Limited by rate limits (10-25/hour)
**With premium models**: No limits, generate as many as needed

### What's the maximum diff size it can handle?

**Technical limits**:
- **Small changes**: < 1KB (instant)
- **Medium changes**: 1-10KB (normal speed)
- **Large changes**: 10-100KB (slower, may timeout)
- **Very large**: > 100KB (not recommended)

**Best practice**: Keep commits focused and under 10KB of changes.

### Does it work offline?

**No**, Commit Genius requires an internet connection to:
- Connect to OpenRouter API
- Send diffs to AI models
- Receive generated messages

---

## 🔒 Security & Privacy

### Is my code sent to third parties?

**Yes**, but with important protections:
- Only **staged changes** (diffs) are sent, not entire files
- Sent to **OpenRouter** and chosen **AI model provider**
- **No code is stored** permanently
- **Encrypted in transit** (HTTPS)

### What data is shared?

**Sent to AI**:
- ✅ Git diff of staged changes
- ✅ File paths and names
- ✅ Change types (additions, deletions, modifications)

**NOT sent**:
- ❌ Entire codebase
- ❌ Unstaged changes
- ❌ Git history
- ❌ Personal information
- ❌ API keys or secrets

### Can I use it with proprietary code?

**Consider your organization's policies**:
- Review OpenRouter and AI provider terms
- Check if your company allows cloud AI services
- Consider using self-hosted alternatives if available
- Use only for non-sensitive changes if unsure

### How is my API key stored?

**Securely in VS Code**:
- Stored in VS Code's secure settings
- Encrypted by VS Code
- Not shared with other extensions
- Only used for OpenRouter API calls

---

## 🤝 Contributing & Support

### How can I contribute to Commit Genius?

See our [Contributing Guide](../CONTRIBUTING.md) for:
- 🐛 Bug reports
- 💡 Feature requests
- 🔧 Code contributions
- 📖 Documentation improvements

**Please try the extension first** before contributing!

### Where can I report bugs?

**GitHub Issues**: [Create a bug report](https://github.com/anmolsah/AICommit01/issues/new)

**Include this information**:
- VS Code version
- Commit Genius version
- Operating system
- Steps to reproduce
- Error messages
- Screenshots if helpful

### How can I request new features?

1. **Check existing issues** first
2. **Create a feature request** on GitHub
3. **Describe the use case** and benefits
4. **Provide examples** if possible

### Where can I get help?

**Resources**:
- 📖 [User Manual](./User-Manual.md)
- 🔧 [Troubleshooting Guide](./Troubleshooting-Guide.md)
- 💬 [GitHub Discussions](https://github.com/anmolsah/AICommit01/discussions)
- 🐛 [GitHub Issues](https://github.com/anmolsah/AICommit01/issues)

### Is there a community?

**Join the discussion**:
- 💬 [GitHub Discussions](https://github.com/anmolsah/AICommit01/discussions)
- ⭐ [Star the repository](https://github.com/anmolsah/AICommit01)
- 🐦 Share your experience on social media

---

## 🆘 Still Need Help?

If you can't find the answer to your question:

1. **Check our documentation**:
   - [Installation Guide](./Installation-Guide.md)
   - [User Manual](./User-Manual.md)
   - [Troubleshooting Guide](./Troubleshooting-Guide.md)

2. **Search existing issues**: [GitHub Issues](https://github.com/anmolsah/AICommit01/issues)

3. **Ask the community**: [GitHub Discussions](https://github.com/anmolsah/AICommit01/discussions)

4. **Create a new issue**: [New Issue](https://github.com/anmolsah/AICommit01/issues/new)

---

*FAQ last updated: 2024*
*For the latest information, visit our [GitHub repository](https://github.com/anmolsah/AICommit01)*