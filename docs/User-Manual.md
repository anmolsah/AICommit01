# User Manual

> **Complete guide to using Commit Genius for AI-powered commit messages**

This manual covers everything you need to know about using Commit Genius effectively in your daily development workflow.

---

## 📚 Table of Contents

1. [Getting Started](#-getting-started)
2. [Basic Usage](#-basic-usage)
3. [Advanced Features](#-advanced-features)
4. [AI Models](#-ai-models)
5. [Best Practices](#-best-practices)
6. [Workflow Integration](#-workflow-integration)
7. [Customization](#-customization)
8. [Tips & Tricks](#-tips--tricks)

---

## 🚀 Getting Started

### Prerequisites

Before using Commit Genius, ensure you have:
- ✅ Commit Genius installed ([Installation Guide](./Installation-Guide.md))
- ✅ OpenRouter API key configured
- ✅ Git repository open in VS Code
- ✅ Some changes ready to commit

### First Commit Message

Let's generate your first AI-powered commit message:

1. **Make Changes**: Edit some files in your repository
2. **Stage Changes**: Click the `+` button next to changed files
3. **Generate Message**: Click the ✨ sparkle button in Source Control
4. **Review & Commit**: Edit if needed, then commit

---

## 💡 Basic Usage

### The Commit Workflow

#### Step 1: Prepare Your Changes

**Make Focused Changes**
- Work on related changes together
- Avoid mixing different types of changes
- Keep changes logical and atomic

**Example Good Changes**:
```diff
+ Added user authentication middleware
+ Updated login form validation
+ Added password strength requirements
```

**Example Poor Changes** (avoid):
```diff
+ Added user authentication
+ Fixed typo in README
+ Updated package dependencies
+ Refactored database queries
```

#### Step 2: Stage Your Changes

**Individual Files**:
1. Open Source Control panel (`Ctrl/Cmd + Shift + G`)
2. Review changed files in "Changes" section
3. Click `+` button next to files you want to include
4. Files move to "Staged Changes" section

**Stage All Changes**:
- Click `+` button next to "Changes" header
- All modified files will be staged

**Partial Staging**:
1. Click on a file in "Changes" section
2. Review the diff in the editor
3. Click `+` next to specific lines to stage only those changes

#### Step 3: Generate Commit Message

**Using the Sparkle Button**:
1. Ensure you have staged changes
2. Click the **✨ sparkle button** in Source Control toolbar
3. Wait for AI to analyze your changes (usually 2-5 seconds)
4. Generated message appears in commit input box

**Using Command Palette**:
1. Press `Ctrl/Cmd + Shift + P`
2. Type "Commit Genius: Generate AI Commit Message"
3. Select the command
4. Message generates automatically

#### Step 4: Review and Edit

**Review the Generated Message**:
- Check if it accurately describes your changes
- Verify it follows conventional commit format
- Ensure it's clear and concise

**Edit if Needed**:
- Click in the commit message box
- Modify the message as needed
- Add additional context if necessary

**Common Edits**:
- Add issue numbers: `feat: add user auth (fixes #123)`
- Add breaking change info: `feat!: change API response format`
- Clarify scope: `feat(auth): add JWT token validation`

#### Step 5: Commit Your Changes

1. Review your staged changes one final time
2. Ensure commit message is satisfactory
3. Click **"Commit"** button or press `Ctrl/Cmd + Enter`
4. Changes are committed to your local repository

---

## 🔧 Advanced Features

### Working with Different Change Types

#### New Features
**What Commit Genius Detects**:
- New files added
- New functions or classes
- New configuration options
- New dependencies

**Generated Message Examples**:
```
feat: add user profile management system
feat(api): implement JWT authentication middleware
feat: add dark mode toggle to settings page
```

#### Bug Fixes
**What Commit Genius Detects**:
- Error handling improvements
- Conditional logic changes
- Exception fixes
- Validation corrections

**Generated Message Examples**:
```
fix: resolve null pointer exception in user service
fix(auth): handle expired token edge case
fix: correct email validation regex pattern
```

#### Refactoring
**What Commit Genius Detects**:
- Code reorganization
- Function renaming
- Structure improvements
- Performance optimizations

**Generated Message Examples**:
```
refactor: extract user validation into separate service
refactor(db): optimize query performance for large datasets
refactor: simplify authentication flow logic
```

#### Documentation
**What Commit Genius Detects**:
- README updates
- Comment additions
- Documentation files
- Code documentation

**Generated Message Examples**:
```
docs: update API documentation with new endpoints
docs: add installation instructions for Windows
docs(readme): fix broken links and typos
```

#### Dependencies & Configuration
**What Commit Genius Detects**:
- package.json changes
- Configuration file updates
- Dependency additions/removals
- Build script modifications

**Generated Message Examples**:
```
chore: update dependencies to latest versions
chore(config): add production environment settings
chore: configure ESLint rules for TypeScript
```

### Multi-File Commits

**Best Practices for Complex Changes**:

1. **Related Files Only**: Stage files that are logically related
2. **Clear Scope**: Ensure all changes serve the same purpose
3. **Descriptive Diffs**: Make sure changes are self-explanatory

**Example Multi-File Commit**:
```
Staged Files:
- src/auth/middleware.js (new file)
- src/routes/auth.js (modified)
- package.json (modified)
- README.md (modified)

Generated Message:
feat: implement JWT authentication system with middleware
```

### Working with Branches

**Feature Branches**:
```bash
git checkout -b feature/user-authentication
# Make changes
# Use Commit Genius for commits
git push origin feature/user-authentication
```

**Hotfix Branches**:
```bash
git checkout -b hotfix/login-bug
# Fix the issue
# Use Commit Genius: likely generates "fix: ..."
git push origin hotfix/login-bug
```

---

## 🤖 AI Models

### Understanding Model Differences

#### Free Models

**DeepSeek Chat (deepseek/deepseek-chat-v3-0324:free)**
- **Best for**: Complex code analysis
- **Strengths**: Understanding context, technical accuracy
- **Rate Limit**: ~20 requests/hour
- **Response Time**: 3-5 seconds

**Qwen Coder (qwen/qwen3-coder:free)**
- **Best for**: Code-specific changes
- **Strengths**: Programming language detection, syntax understanding
- **Rate Limit**: ~15 requests/hour
- **Response Time**: 2-4 seconds

**Mistral Small (mistralai/mistral-small-3.2-24b-instruct:free)**
- **Best for**: General purpose, balanced performance
- **Strengths**: Fast responses, good accuracy
- **Rate Limit**: ~25 requests/hour
- **Response Time**: 2-3 seconds

**OpenAI GPT-OSS (openai/gpt-oss-120b:free)**
- **Best for**: Large context understanding
- **Strengths**: Handling complex diffs, detailed analysis
- **Rate Limit**: ~10 requests/hour
- **Response Time**: 4-6 seconds

#### Premium Models

**Claude Sonnet 4 (anthropic/claude-sonnet-4)**
- **Cost**: ~$0.01 per request
- **Best for**: Highest quality analysis
- **Strengths**: Superior reasoning, context understanding
- **No rate limits** (based on credits)

**Gemini 2.5 Pro (google/gemini-2.5-pro)**
- **Cost**: ~$0.008 per request
- **Best for**: Multimodal understanding
- **Strengths**: Advanced capabilities, fast processing
- **No rate limits** (based on credits)

### Choosing the Right Model

**For Daily Development** (Recommended):
- Start with **Mistral Small** (free) - good balance
- Switch to **DeepSeek** for complex changes
- Use **Claude Sonnet 4** for critical commits

**For Heavy Usage**:
- Consider premium models to avoid rate limits
- **Gemini 2.5 Pro** offers good value for money
- **Claude Sonnet 4** for highest quality

**For Specific Scenarios**:
- **Large diffs**: OpenAI GPT-OSS or Claude Sonnet 4
- **Code refactoring**: Qwen Coder or DeepSeek
- **Documentation**: Any model works well
- **Quick fixes**: Mistral Small for speed

### Switching Models

**Via Settings**:
1. Go to **File** → **Preferences** → **Settings**
2. Search "Commit Genius"
3. Change **"Commit-genius: Model"** dropdown
4. New model takes effect immediately

**Via Command Palette**:
1. Press `Ctrl/Cmd + Shift + P`
2. Type "Preferences: Open Settings"
3. Search for "commit-genius.model"
4. Select new model from dropdown

---

## 🎯 Best Practices

### Staging Strategy

**Atomic Commits**:
```bash
# Good: Single feature
git add src/auth/
git add tests/auth/
# Generate: "feat: add user authentication system"

# Bad: Mixed changes
git add src/auth/ src/ui/ package.json README.md
# Generates: Confusing or generic message
```

**Logical Grouping**:
```bash
# Group 1: Core feature
git add src/payment/processor.js
git add src/payment/validator.js
# Generate: "feat: implement payment processing system"

# Group 2: Tests for feature
git add tests/payment/
# Generate: "test: add payment processor unit tests"

# Group 3: Documentation
git add docs/payment-api.md
# Generate: "docs: add payment API documentation"
```

### Message Quality

**Review Generated Messages**:
- ✅ **Good**: `feat: add user authentication with JWT tokens`
- ❌ **Poor**: `update files` (too generic)
- ✅ **Good**: `fix: resolve memory leak in image processing`
- ❌ **Poor**: `fix stuff` (not descriptive)

**Enhance When Needed**:
```
# Generated:
feat: add user profile management

# Enhanced:
feat(user): add profile management with avatar upload

# With issue reference:
feat(user): add profile management with avatar upload (closes #45)
```

### Workflow Integration

**Pre-commit Hooks**:
```bash
# .git/hooks/pre-commit
#!/bin/sh
echo "Remember to use Commit Genius for consistent messages!"
```

**Branch Naming**:
```bash
# Feature branches
feature/user-authentication
feature/payment-integration

# Bug fix branches
fix/login-validation
hotfix/security-patch

# Commit messages will align with branch purpose
```

---

## ⚙️ Customization

### Workspace Settings

**Project-Specific Model**:
```json
// .vscode/settings.json
{
  "commit-genius.model": "anthropic/claude-sonnet-4",
  "git.inputValidation": "always"
}
```

**Team Settings**:
```json
// Shared team settings
{
  "commit-genius.model": "mistralai/mistral-small-3.2-24b-instruct:free",
  "git.inputValidationLength": 72,
  "git.inputValidationSubjectLength": 50
}
```

### User Settings

**Global Preferences**:
1. Go to **File** → **Preferences** → **Settings**
2. Click **"Open Settings (JSON)"** in top-right
3. Add Commit Genius settings:

```json
{
  "commit-genius.model": "deepseek/deepseek-chat-v3-0324:free",
  "git.enableSmartCommit": true,
  "git.confirmSync": false
}
```

---

## 💡 Tips & Tricks

### Maximizing AI Accuracy

**Provide Context in Code**:
```javascript
// Good: Descriptive function names
function validateUserEmailAddress(email) {
  // AI understands this is email validation
}

// Poor: Generic names
function check(input) {
  // AI can't determine purpose
}
```

**Use Meaningful File Names**:
```
✅ Good:
src/auth/jwt-middleware.js
src/user/profile-service.js
tests/auth/login.test.js

❌ Poor:
src/utils.js
src/helpers.js
src/stuff.js
```

### Handling Edge Cases

**Large Diffs**:
- Break into smaller commits
- Use premium models for better analysis
- Add manual context if needed

**Mixed Languages**:
- AI handles multiple programming languages
- Specify language in comments if unclear
- Consider separate commits per language

**Generated Files**:
- Exclude from commits when possible
- Use `.gitignore` for build artifacts
- Commit only source files

### Keyboard Shortcuts

**Custom Shortcuts**:
1. Go to **File** → **Preferences** → **Keyboard Shortcuts**
2. Search "Commit Genius"
3. Add custom keybinding:

```json
{
  "key": "ctrl+shift+c",
  "command": "commit-genius.generateAICommitMessage",
  "when": "scmProvider == 'git'"
}
```

### Performance Optimization

**Reduce API Calls**:
- Stage changes thoughtfully
- Review before generating
- Use faster models for simple changes

**Manage Rate Limits**:
- Monitor usage with free models
- Switch to premium for heavy usage
- Plan commits during development

---

## 🔄 Workflow Examples

### Daily Development

```bash
# Morning: Start feature
git checkout -b feature/user-dashboard

# Work session 1: Core functionality
# Edit: src/dashboard/controller.js, src/dashboard/view.js
git add src/dashboard/
# Commit Genius: "feat: add user dashboard with activity overview"

# Work session 2: Styling
# Edit: src/dashboard/styles.css, src/dashboard/components/
git add src/dashboard/styles.css src/dashboard/components/
# Commit Genius: "style: implement responsive design for dashboard"

# Work session 3: Tests
# Edit: tests/dashboard/
git add tests/dashboard/
# Commit Genius: "test: add comprehensive dashboard component tests"

# End of day: Documentation
# Edit: docs/dashboard.md
git add docs/dashboard.md
# Commit Genius: "docs: add dashboard usage guide and API reference"
```

### Bug Fix Workflow

```bash
# Hotfix branch
git checkout -b hotfix/login-timeout

# Investigation and fix
# Edit: src/auth/session.js
git add src/auth/session.js
# Commit Genius: "fix: increase session timeout to prevent premature logout"

# Add test to prevent regression
# Edit: tests/auth/session.test.js
git add tests/auth/session.test.js
# Commit Genius: "test: add session timeout validation test"

# Update documentation
# Edit: docs/authentication.md
git add docs/authentication.md
# Commit Genius: "docs: update session management documentation"
```

### Release Preparation

```bash
# Version bump
# Edit: package.json, CHANGELOG.md
git add package.json CHANGELOG.md
# Commit Genius: "chore: bump version to 2.1.0 and update changelog"

# Final documentation
# Edit: README.md, docs/
git add README.md docs/
# Commit Genius: "docs: update documentation for v2.1.0 release"

# Tag release
git tag v2.1.0
git push origin v2.1.0
```

---

## 📞 Getting Help

### Resources

- 📖 **Installation**: [Installation Guide](./Installation-Guide.md)
- ❓ **Common Issues**: [FAQ](./FAQ.md)
- 🔧 **Problems**: [Troubleshooting Guide](./Troubleshooting-Guide.md)
- 👨‍💻 **Development**: [API Documentation](./API-Documentation.md)

### Support Channels

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/anmolsah/AICommit01/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/anmolsah/AICommit01/discussions)
- 📧 **Contact**: Create issue with "question" label

---

*User Manual last updated: 2024*
*For the latest features, visit our [GitHub repository](https://github.com/anmolsah/AICommit01)*