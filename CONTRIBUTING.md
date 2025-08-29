# Contributing to Commit Genius

🎉 **Thank you for your interest in contributing to Commit Genius!** 🎉

We welcome contributions from developers of all skill levels. Whether you're fixing a bug, adding a feature, improving documentation, or suggesting enhancements, your contributions help make Commit Genius better for everyone.

## 🚀 Before You Start

### ⚡ Try the Extension First!

**IMPORTANT**: Before contributing to Commit Genius, we strongly encourage you to:

1. **Install and use the extension** in your daily workflow for at least a few days
2. **Test different scenarios** (various commit types, different repositories, multiple AI models)
3. **Experience the user journey** from installation to generating commit messages
4. **Identify pain points** or areas for improvement through actual usage

This hands-on experience will help you:
- Understand the extension's current capabilities and limitations
- Identify real user needs and pain points
- Contribute more meaningful improvements
- Write better bug reports and feature requests

### 📋 Quick Setup for Testing
1. Install Commit Genius from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=aicommit-publisher.commit-genius)
2. Get a free API key from [OpenRouter.ai](https://openrouter.ai/keys)
3. Test the extension with various types of code changes
4. Try different AI models (free and premium if available)

---

## 🛠️ Development Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **VS Code** (latest version)
- **Git**

### Local Development

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AICommit01.git
   cd AICommit01
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Open in VS Code**
   ```bash
   code .
   ```

4. **Run the Extension**
   - Press `F5` to open a new Extension Development Host window
   - Test your changes in the new window

5. **Make Changes**
   - Edit the code in `extension.js`
   - Update `package.json` for configuration changes
   - Reload the Extension Development Host (`Ctrl+R` or `Cmd+R`) to see changes

---

## 📝 Types of Contributions

### 🐛 Bug Reports
**Found a bug?** Help us fix it!

**Before submitting:**
- Search [existing issues](https://github.com/anmolsah/AICommit01/issues) to avoid duplicates
- Test with the latest version of the extension
- Try with different AI models to isolate the issue

**When reporting:**
- Use our [Bug Report Template](https://github.com/anmolsah/AICommit01/issues/new?template=bug_report.md)
- Include your VS Code version, extension version, and operating system
- Provide steps to reproduce the issue
- Include relevant error messages or screenshots
- Mention which AI model you were using

### ✨ Feature Requests
**Have an idea?** We'd love to hear it!

- Use our [Feature Request Template](https://github.com/anmolsah/AICommit01/issues/new?template=feature_request.md)
- Describe the problem you're trying to solve
- Explain your proposed solution
- Consider how it fits with existing functionality
- Think about potential edge cases

### 🔧 Code Contributions

#### Small Fixes
- Typos, small bug fixes, or minor improvements
- Can be submitted directly as a Pull Request

#### Major Changes
- New features, significant refactoring, or architectural changes
- **Please open an issue first** to discuss the approach
- This helps avoid duplicate work and ensures alignment with project goals

---

## 🔄 Pull Request Process

### 1. Preparation
- Ensure you've tested the extension thoroughly
- Create a new branch for your changes:
  ```bash
  git checkout -b feature/your-feature-name
  # or
  git checkout -b fix/issue-description
  ```

### 2. Development Guidelines

#### Code Style
- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and small

#### Testing
- Test your changes with multiple AI models
- Test with different types of Git repositories
- Verify error handling works correctly
- Test edge cases (empty repos, no staged changes, API failures)

#### Documentation
- Update README.md if you're adding new features
- Add JSDoc comments for new functions
- Update configuration documentation for new settings

### 3. Commit Messages
**Practice what we preach!** Use conventional commit format:

```
feat: add support for custom commit message templates
fix: resolve API timeout issues with large diffs
docs: update installation instructions
chore: update dependencies to latest versions
```

### 4. Pull Request Submission

- **Title**: Use a clear, descriptive title
- **Description**: Use our [Pull Request Template](https://github.com/anmolsah/AICommit01/pull/new)
- **Link Issues**: Reference related issues using `Fixes #123` or `Closes #456`
- **Screenshots**: Include screenshots for UI changes
- **Testing**: Describe how you tested your changes

### 5. Review Process

- Maintainers will review your PR within a few days
- Address feedback promptly and professionally
- Be open to suggestions and improvements
- Update your branch if requested:
  ```bash
  git add .
  git commit -m "address review feedback"
  git push origin your-branch-name
  ```

---

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Extension installs without errors
- [ ] API key setup works correctly
- [ ] Sparkle button appears in Source Control
- [ ] Commit messages generate successfully
- [ ] Error handling works (invalid API key, network issues, etc.)
- [ ] Settings can be changed and persist
- [ ] Works with different repository types
- [ ] Multiple AI models function correctly

### Test Scenarios
1. **Fresh Installation**: Test the complete onboarding flow
2. **Different Change Types**: Test with various Git diff scenarios
3. **Error Conditions**: Test API failures, network issues, invalid keys
4. **Model Switching**: Test switching between free and premium models
5. **Large Repositories**: Test performance with large codebases

---

## 📚 Resources

### Documentation
- [VS Code Extension API](https://code.visualstudio.com/api)
- [OpenRouter API Documentation](https://openrouter.ai/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Documentation](https://git-scm.com/doc)

### Project Structure
```
AICommit01/
├── extension.js          # Main extension logic
├── package.json          # Extension manifest and configuration
├── README.md            # User documentation
├── CONTRIBUTING.md      # This file
├── LICENSE              # Project license
├── icon.png            # Extension icon
├── example.png         # Screenshot for documentation
├── sparkleButton.mp4   # Demo video
└── stagging.mp4        # Demo video
```

### Key Files
- **`extension.js`**: Contains all extension logic (activation, commands, API calls)
- **`package.json`**: Defines extension metadata, commands, configuration, and dependencies
- **`README.md`**: User-facing documentation and installation guide

---

## 🤝 Community Guidelines

### Code of Conduct
We are committed to providing a welcoming and inclusive environment. Please:

- **Be respectful** and considerate in all interactions
- **Be collaborative** and help others learn and grow
- **Be patient** with newcomers and different skill levels
- **Be constructive** when providing feedback
- **Focus on the code**, not the person

### Communication
- Use [GitHub Issues](https://github.com/anmolsah/AICommit01/issues) for bug reports and feature requests
- Use [GitHub Discussions](https://github.com/anmolsah/AICommit01/discussions) for questions and general discussion
- Be clear and specific in your communication
- Provide context and examples when possible

---

## 🏆 Recognition

We value all contributions! Contributors will be:
- Listed in our README.md acknowledgments
- Mentioned in release notes for significant contributions
- Invited to join our contributor community

---

## ❓ Questions?

Need help getting started? Have questions about contributing?

- 💬 Start a [Discussion](https://github.com/anmolsah/AICommit01/discussions)
- 📧 Open an [Issue](https://github.com/anmolsah/AICommit01/issues) with the "question" label
- 📖 Check our [Documentation](https://github.com/anmolsah/AICommit01/wiki)

---

## 🙏 Thank You!

Every contribution, no matter how small, makes Commit Genius better for the entire developer community. We appreciate your time, effort, and dedication to improving this project.

**Happy coding!** 🚀

---

*This contributing guide is a living document. If you have suggestions for improvements, please let us know!*