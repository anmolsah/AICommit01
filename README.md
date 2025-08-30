
<div align="center">

# <img src="./icon.png" alt="Commit Genius Logo" width="80"/> <br/> Commit Genius

**🚀 Generate Professional AI-Powered Commit Messages in VS Code**

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/aicommit-publisher.commit-genius?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=aicommit-publisher.commit-genius)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/aicommit-publisher.commit-genius?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=aicommit-publisher.commit-genius)
[![GitHub Repo stars](https://img.shields.io/github/stars/anmolsah/AICommit01?style=for-the-badge&logo=github)](https://github.com/anmolsah/AICommit01)
[![License](https://img.shields.io/github/license/anmolsah/AICommit01?style=for-the-badge)](./LICENSE)

*Transform your Git workflow with AI-generated commit messages that follow conventional commit standards*

</div>

---

## 🎯 Why Commit Genius?

Tired of spending precious time crafting the perfect commit message? **Commit Genius** revolutionizes your Git workflow by generating professional, conventional commit messages using advanced AI models. Just stage your changes, click the sparkle button, and let AI do the heavy lifting!

### ✨ Key Benefits
- **⚡ Lightning Fast**: Generate commit messages in seconds
- **📏 Conventional Standards**: Follows industry-standard commit conventions
- **🆓 Free to Use**: Supports free AI models via OpenRouter.ai
- **🔒 Secure**: API keys stored safely in VS Code's encrypted storage
- **🎨 Seamless Integration**: Works directly within your VS Code Git workflow

---

## 🚀 Features

### 🤖 AI-Powered Generation
- Generate commit messages using state-of-the-art AI models
- Support for both **free** and **premium** AI models
- Intelligent analysis of your staged changes

### 📋 Conventional Commits
- Automatically formats messages with proper prefixes (`feat:`, `fix:`, `chore:`, etc.)
- Maintains consistent commit history
- Improves project maintainability and readability

### 🛠️ Developer Experience
- One-click generation via sparkle button in Source Control
- Seamless VS Code integration
- Edit generated messages before committing
- Secure API key management

### 🌐 Model Flexibility
- **Free Models**: DeepSeek, Qwen, Mistral, OpenAI GPT-OSS
- **Premium Models**: Claude Sonnet 4, Gemini 2.5 Pro, Grok Code Fast
- Easy model switching through VS Code settings

---

## 📹 Demo Videos

### ✨ Sparkle Button in Action

<div align="center">

![Sparkle Button Demo](sparkleButton.mp4)

*Click the sparkle button in Source Control to generate AI commit messages*

</div>

### 📝 Staging and Committing Workflow

<div align="center">

![Staging Demo](stagging.mp4)

*Staging changes for generating commit messages*

</div>

---

## 🛠️ Installation

### Method 1: VS Code Marketplace (Recommended)
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for **"Commit Genius"**
4. Click **Install**
---

## 🎯 Quick Start Guide

### Step 1: Get Your API Key
1. Visit [OpenRouter.ai](https://openrouter.ai/keys)
2. Sign in with GitHub or Google
3. Click **"Create Key"**
4. Copy your API key (starts with `sk-or-...`)

### Step 2: Configure Commit Genius
1. Make some changes in your Git repository
2. Stage your changes using the `+` button in Source Control
3. Click the **✨ sparkle button** in the Source Control panel
4. Paste your API key when prompted
5. Watch as your commit message is generated!

### Step 3: Customize (Optional)
- Go to **Settings** → **Extensions** → **Commit Genius**
- Choose your preferred AI model
- Adjust settings to match your workflow

---

## ⚙️ Configuration

### Available Models

#### 🆓 Free Models
| Model | Provider | Description |
|-------|----------|-------------|
| `deepseek/deepseek-chat-v3-0324:free` | DeepSeek | Advanced coding model (71B parameters) |
| `qwen/qwen3-coder:free` | Qwen | Specialized code understanding |
| `mistralai/mistral-small-3.2-24b-instruct:free` | Mistral | Balanced performance and speed |
| `openai/gpt-oss-120b:free` | OpenAI | Large context understanding |

#### 💎 Premium Models
| Model | Provider | Description |
|-------|----------|-------------|
| `anthropic/claude-sonnet-4` | Anthropic | Superior reasoning and code analysis |
| `google/gemini-2.5-pro` | Google | Advanced multimodal capabilities |
| `x-ai/grok-code-fast-1` | X.AI | Fast and efficient code generation |
| `deepseek/deepseek-chat-v3.1` | DeepSeek | Enhanced version with better accuracy |

### Settings Configuration
```json
{
  "commit-genius.model": "mistralai/mistral-small-3.2-24b-instruct:free"
}
```

---

## 💡 Usage Tips

### 🎯 Best Practices
- **Stage specific changes**: Stage only related changes for more accurate commit messages
- **Review before committing**: Always review the generated message and edit if needed
- **Use descriptive file names**: Better file names lead to better commit messages
- **Keep changes focused**: Smaller, focused commits generate better messages

### 🚨 Troubleshooting

#### Rate Limits
- Free models have usage limits
- If you hit a rate limit, wait a few minutes or switch to a premium model
- Consider upgrading to premium models for heavy usage

#### API Key Issues
- Ensure your API key starts with `sk-or-`
- Check that your OpenRouter account has sufficient credits if using paid model or continue with free models
- Re-enter your API key if authentication fails

#### Git Repository
- Ensure you're in a valid Git repository
- Make sure you have staged changes before generating commits
- Check that Git is properly installed and configured

---

## 📊 Example Output

### Input: Staged Changes
```diff
+ Added user authentication middleware
+ Updated package.json version
- Removed deprecated API endpoints
```

### Output: Generated Commit Message
```
feat: add user authentication middleware and update package version
```

### More Examples
| Change Type | Generated Message |
|-------------|-------------------|
| Bug fix | `fix: resolve null pointer exception in user service` |
| New feature | `feat: implement dark mode toggle functionality` |
| Documentation | `docs: update API documentation with new endpoints` |
| Refactoring | `refactor: optimize database query performance` |
| Dependencies | `chore: update dependencies to latest versions` |

---

## 🔒 Security & Privacy

### 🛡️ Data Protection
- **Local Storage**: API keys are stored securely in VS Code's encrypted secret storage
- **No Data Collection**: We don't collect or store your code or commit messages
- **Secure Transmission**: All API requests use HTTPS encryption
- **No Telemetry**: No usage data is sent to external servers

### 🔐 API Key Security
- Keys are never logged or exposed in plain text
- Stored using VS Code's built-in secret management
- Only transmitted to OpenRouter.ai for API requests
- Can be updated or removed at any time

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 📞 Support

### ⭐ Show Your Support
If you find Commit Genius helpful, please:
- ⭐ Star the repository on [GitHub](https://github.com/anmolsah/AICommit01)
- 📝 Leave a review on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=aicommit-publisher.commit-genius)
- 🐦 Share with your developer friends

---

<div align="center">

**Made with ❤️ by developers, for developers**

[🏠 Homepage](https://github.com/anmolsah/AICommit01) • [📦 Marketplace](https://marketplace.visualstudio.com/items?itemName=aicommit-publisher.commit-genius) 
</div>


