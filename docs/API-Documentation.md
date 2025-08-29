# API Documentation

> **Technical documentation for developers and contributors**

This document provides detailed technical information about Commit Genius's architecture, APIs, and extension points for developers who want to understand, extend, or contribute to the project.

---

## 📚 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [Extension Structure](#-extension-structure)
- [Core APIs](#-core-apis)
- [OpenRouter Integration](#-openrouter-integration)
- [VS Code Extension API Usage](#-vs-code-extension-api-usage)
- [Configuration Schema](#-configuration-schema)
- [Command Definitions](#-command-definitions)
- [Error Handling](#-error-handling)
- [Development Setup](#-development-setup)
- [Testing Framework](#-testing-framework)
- [Contributing Guidelines](#-contributing-guidelines)

---

## 🏗️ Architecture Overview

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   VS Code UI    │    │  Commit Genius   │    │   OpenRouter    │
│                 │    │   Extension      │    │      API        │
│ ┌─────────────┐ │    │                  │    │                 │
│ │ Source      │ │◄──►│ ┌──────────────┐ │◄──►│ ┌─────────────┐ │
│ │ Control     │ │    │ │ Main Logic   │ │    │ │ AI Models   │ │
│ │ Panel       │ │    │ │              │ │    │ │             │ │
│ └─────────────┘ │    │ └──────────────┘ │    │ └─────────────┘ │
│                 │    │                  │    │                 │
│ ┌─────────────┐ │    │ ┌──────────────┐ │    │                 │
│ │ Sparkle     │ │    │ │ Git          │ │    │                 │
│ │ Button      │ │    │ │ Integration  │ │    │                 │
│ └─────────────┘ │    │ └──────────────┘ │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Component Responsibilities

**VS Code UI Layer**:
- Source Control panel integration
- Sparkle button rendering
- Command palette commands
- Settings UI

**Extension Core**:
- Git diff analysis
- API communication
- Message generation logic
- Error handling and user feedback

**External Services**:
- OpenRouter API for AI model access
- Git for repository operations

---

## 📁 Extension Structure

### File Organization

```
commit-genius/
├── src/
│   ├── extension.js          # Main extension entry point
│   ├── git/
│   │   ├── diff-analyzer.js  # Git diff processing
│   │   └── repository.js     # Git repository operations
│   ├── api/
│   │   ├── openrouter.js     # OpenRouter API client
│   │   └── models.js         # AI model definitions
│   ├── ui/
│   │   ├── commands.js       # VS Code commands
│   │   └── providers.js      # UI providers
│   └── utils/
│       ├── config.js         # Configuration management
│       ├── logger.js         # Logging utilities
│       └── validation.js     # Input validation
├── package.json              # Extension manifest
├── README.md                 # User documentation
├── CHANGELOG.md              # Version history
└── docs/                     # Additional documentation
```

### Key Files

**`extension.js`** - Main entry point
```javascript
// Extension activation and deactivation
exports.activate = function(context) { ... }
exports.deactivate = function() { ... }
```

**`package.json`** - Extension manifest
```json
{
  "name": "commit-genius",
  "displayName": "Commit Genius",
  "description": "AI-powered commit message generator",
  "version": "1.0.0",
  "engines": {
    "vscode": "^1.60.0"
  }
}
```

---

## 🔧 Core APIs

### Main Extension API

#### `activate(context: ExtensionContext)`

**Purpose**: Extension activation entry point

**Parameters**:
- `context`: VS Code extension context

**Returns**: `void`

**Implementation**:
```javascript
function activate(context) {
    // Register commands
    const generateCommand = vscode.commands.registerCommand(
        'commit-genius.generateAICommitMessage',
        generateCommitMessage
    );
    
    // Register UI providers
    const scmProvider = new CommitGenius();
    
    // Add to context subscriptions
    context.subscriptions.push(generateCommand, scmProvider);
}
```

#### `generateCommitMessage()`

**Purpose**: Core function to generate AI commit messages

**Returns**: `Promise<void>`

**Flow**:
1. Validate prerequisites (Git repo, staged changes, API key)
2. Extract git diff from staged changes
3. Send diff to OpenRouter API
4. Process AI response
5. Update VS Code commit message input

**Implementation**:
```javascript
async function generateCommitMessage() {
    try {
        // Validation
        const apiKey = getApiKey();
        if (!apiKey) {
            throw new Error('API key not configured');
        }
        
        // Get git diff
        const diff = await getGitDiff();
        if (!diff) {
            throw new Error('No staged changes found');
        }
        
        // Generate message
        const message = await callOpenRouterAPI(diff, apiKey);
        
        // Update UI
        await updateCommitMessage(message);
        
    } catch (error) {
        handleError(error);
    }
}
```

### Git Integration API

#### `getGitDiff()`

**Purpose**: Extract staged changes from Git repository

**Returns**: `Promise<string>` - Git diff content

**Implementation**:
```javascript
async function getGitDiff() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        throw new Error('No workspace folder found');
    }
    
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    try {
        const { stdout } = await execAsync('git diff --cached', {
            cwd: workspaceFolder.uri.fsPath
        });
        return stdout;
    } catch (error) {
        throw new Error(`Git diff failed: ${error.message}`);
    }
}
```

#### `validateGitRepository()`

**Purpose**: Check if current workspace is a Git repository

**Returns**: `Promise<boolean>`

**Implementation**:
```javascript
async function validateGitRepository() {
    try {
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);
        
        await execAsync('git rev-parse --git-dir');
        return true;
    } catch {
        return false;
    }
}
```

### Configuration API

#### `getApiKey()`

**Purpose**: Retrieve OpenRouter API key from VS Code settings

**Returns**: `string | undefined`

**Implementation**:
```javascript
function getApiKey() {
    const config = vscode.workspace.getConfiguration('commit-genius');
    return config.get('openRouterApiKey');
}
```

#### `getSelectedModel()`

**Purpose**: Get currently selected AI model

**Returns**: `string`

**Implementation**:
```javascript
function getSelectedModel() {
    const config = vscode.workspace.getConfiguration('commit-genius');
    return config.get('model', 'mistralai/mistral-small-3.2-24b-instruct:free');
}
```

---

## 🌐 OpenRouter Integration

### API Client

#### `callOpenRouterAPI(diff, apiKey, model)`

**Purpose**: Send diff to OpenRouter API and get AI-generated commit message

**Parameters**:
- `diff`: `string` - Git diff content
- `apiKey`: `string` - OpenRouter API key
- `model`: `string` - AI model identifier

**Returns**: `Promise<string>` - Generated commit message

**Implementation**:
```javascript
async function callOpenRouterAPI(diff, apiKey, model) {
    const axios = require('axios');
    
    const prompt = `Generate a conventional commit message for these changes:\n\n${diff}`;
    
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: model,
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant that generates conventional commit messages.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        max_tokens: 100,
        temperature: 0.3
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://github.com/anmolsah/AICommit01',
            'X-Title': 'Commit Genius'
        }
    });
    
    return response.data.choices[0].message.content.trim();
}
```

### Model Definitions

#### Available Models

```javascript
const AVAILABLE_MODELS = {
    // Free Models
    'deepseek/deepseek-chat-v3-0324:free': {
        name: 'DeepSeek Chat (Free)',
        provider: 'DeepSeek',
        tier: 'free',
        contextLength: 32768,
        costPer1kTokens: 0
    },
    'qwen/qwen3-coder:free': {
        name: 'Qwen Coder (Free)',
        provider: 'Qwen',
        tier: 'free',
        contextLength: 8192,
        costPer1kTokens: 0
    },
    'mistralai/mistral-small-3.2-24b-instruct:free': {
        name: 'Mistral Small (Free)',
        provider: 'Mistral AI',
        tier: 'free',
        contextLength: 32768,
        costPer1kTokens: 0
    },
    
    // Premium Models
    'anthropic/claude-sonnet-4': {
        name: 'Claude Sonnet 4',
        provider: 'Anthropic',
        tier: 'premium',
        contextLength: 200000,
        costPer1kTokens: 0.015
    },
    'google/gemini-2.5-pro': {
        name: 'Gemini 2.5 Pro',
        provider: 'Google',
        tier: 'premium',
        contextLength: 1000000,
        costPer1kTokens: 0.0125
    }
};
```

### Error Handling

#### API Error Types

```javascript
class OpenRouterError extends Error {
    constructor(message, statusCode, errorType) {
        super(message);
        this.name = 'OpenRouterError';
        this.statusCode = statusCode;
        this.errorType = errorType;
    }
}

// Error type constants
const ERROR_TYPES = {
    AUTHENTICATION: 'authentication',
    RATE_LIMIT: 'rate_limit',
    INSUFFICIENT_CREDITS: 'insufficient_credits',
    MODEL_UNAVAILABLE: 'model_unavailable',
    NETWORK: 'network',
    TIMEOUT: 'timeout'
};
```

---

## 🎨 VS Code Extension API Usage

### Commands Registration

#### Command Definition

```javascript
// In package.json
{
    "contributes": {
        "commands": [
            {
                "command": "commit-genius.generateAICommitMessage",
                "title": "Generate AI Commit Message",
                "category": "Commit Genius",
                "icon": "$(sparkle)"
            }
        ]
    }
}
```

#### Command Implementation

```javascript
// Register command in activate()
const disposable = vscode.commands.registerCommand(
    'commit-genius.generateAICommitMessage',
    async () => {
        await generateCommitMessage();
    }
);

context.subscriptions.push(disposable);
```

### UI Integration

#### Source Control Menu Integration

```javascript
// In package.json
{
    "contributes": {
        "menus": {
            "scm/title": [
                {
                    "command": "commit-genius.generateAICommitMessage",
                    "when": "scmProvider == git",
                    "group": "navigation"
                }
            ]
        }
    }
}
```

#### Settings Configuration

```javascript
// In package.json
{
    "contributes": {
        "configuration": {
            "title": "Commit Genius",
            "properties": {
                "commit-genius.openRouterApiKey": {
                    "type": "string",
                    "default": "",
                    "description": "OpenRouter API key for AI model access",
                    "scope": "application"
                },
                "commit-genius.model": {
                    "type": "string",
                    "enum": [
                        "mistralai/mistral-small-3.2-24b-instruct:free",
                        "deepseek/deepseek-chat-v3-0324:free",
                        "anthropic/claude-sonnet-4"
                    ],
                    "default": "mistralai/mistral-small-3.2-24b-instruct:free",
                    "description": "AI model to use for generating commit messages"
                }
            }
        }
    }
}
```

### SCM Integration

#### Accessing Source Control

```javascript
function updateCommitMessage(message) {
    const scm = vscode.scm.createSourceControl('git', 'Git');
    const repository = scm.inputBox;
    
    if (repository) {
        repository.value = message;
    } else {
        // Fallback: try to find existing Git SCM provider
        const gitExtension = vscode.extensions.getExtension('vscode.git');
        if (gitExtension) {
            const git = gitExtension.exports.getAPI(1);
            const repo = git.repositories[0];
            if (repo) {
                repo.inputBox.value = message;
            }
        }
    }
}
```

---

## ⚙️ Configuration Schema

### Extension Settings

#### Complete Configuration Schema

```json
{
    "commit-genius.openRouterApiKey": {
        "type": "string",
        "default": "",
        "description": "Your OpenRouter API key (get from https://openrouter.ai)",
        "scope": "application",
        "pattern": "^sk-or-v1-[a-zA-Z0-9]{40,}$",
        "patternErrorMessage": "API key must start with 'sk-or-v1-' followed by at least 40 characters"
    },
    "commit-genius.model": {
        "type": "string",
        "enum": [
            "mistralai/mistral-small-3.2-24b-instruct:free",
            "deepseek/deepseek-chat-v3-0324:free",
            "qwen/qwen3-coder:free",
            "openai/gpt-oss-120b:free",
            "anthropic/claude-sonnet-4",
            "google/gemini-2.5-pro",
            "openai/gpt-4-turbo",
            "x-ai/grok-beta"
        ],
        "enumDescriptions": [
            "Mistral Small - Fast and reliable (Free)",
            "DeepSeek Chat - Good for complex code analysis (Free)",
            "Qwen Coder - Optimized for programming (Free)",
            "OpenAI GPT-OSS - Large context window (Free)",
            "Claude Sonnet 4 - Highest quality (Premium)",
            "Gemini 2.5 Pro - Advanced capabilities (Premium)",
            "GPT-4 Turbo - Fast and accurate (Premium)",
            "Grok Beta - X-AI's model (Premium)"
        ],
        "default": "mistralai/mistral-small-3.2-24b-instruct:free",
        "description": "AI model to use for generating commit messages"
    },
    "commit-genius.maxDiffSize": {
        "type": "number",
        "default": 10000,
        "minimum": 1000,
        "maximum": 100000,
        "description": "Maximum size of git diff to send to AI (in characters)"
    },
    "commit-genius.timeout": {
        "type": "number",
        "default": 30000,
        "minimum": 5000,
        "maximum": 120000,
        "description": "API request timeout in milliseconds"
    }
}
```

#### Configuration Access

```javascript
class ConfigManager {
    static getConfig() {
        return vscode.workspace.getConfiguration('commit-genius');
    }
    
    static getApiKey() {
        return this.getConfig().get('openRouterApiKey', '');
    }
    
    static getModel() {
        return this.getConfig().get('model', 'mistralai/mistral-small-3.2-24b-instruct:free');
    }
    
    static getMaxDiffSize() {
        return this.getConfig().get('maxDiffSize', 10000);
    }
    
    static getTimeout() {
        return this.getConfig().get('timeout', 30000);
    }
    
    static async updateConfig(key, value) {
        const config = this.getConfig();
        await config.update(key, value, vscode.ConfigurationTarget.Global);
    }
}
```

---

## 📋 Command Definitions

### Available Commands

#### Primary Commands

```javascript
const COMMANDS = {
    GENERATE_COMMIT_MESSAGE: 'commit-genius.generateAICommitMessage',
    SET_API_KEY: 'commit-genius.setApiKey',
    CHANGE_MODEL: 'commit-genius.changeModel',
    SHOW_HELP: 'commit-genius.showHelp'
};
```

#### Command Implementations

```javascript
// Generate commit message command
vscode.commands.registerCommand(COMMANDS.GENERATE_COMMIT_MESSAGE, async () => {
    try {
        await generateCommitMessage();
        vscode.window.showInformationMessage('Commit message generated successfully!');
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to generate commit message: ${error.message}`);
    }
});

// Set API key command
vscode.commands.registerCommand(COMMANDS.SET_API_KEY, async () => {
    const apiKey = await vscode.window.showInputBox({
        prompt: 'Enter your OpenRouter API key',
        password: true,
        validateInput: (value) => {
            if (!value) return 'API key is required';
            if (!value.startsWith('sk-or-v1-')) return 'API key must start with sk-or-v1-';
            if (value.length < 50) return 'API key appears to be too short';
            return null;
        }
    });
    
    if (apiKey) {
        await ConfigManager.updateConfig('openRouterApiKey', apiKey);
        vscode.window.showInformationMessage('API key saved successfully!');
    }
});

// Change model command
vscode.commands.registerCommand(COMMANDS.CHANGE_MODEL, async () => {
    const models = Object.keys(AVAILABLE_MODELS);
    const selectedModel = await vscode.window.showQuickPick(models, {
        placeHolder: 'Select an AI model'
    });
    
    if (selectedModel) {
        await ConfigManager.updateConfig('model', selectedModel);
        vscode.window.showInformationMessage(`Model changed to ${selectedModel}`);
    }
});
```

### Command Context

#### When Clauses

```json
{
    "contributes": {
        "menus": {
            "scm/title": [
                {
                    "command": "commit-genius.generateAICommitMessage",
                    "when": "scmProvider == git && gitOpenRepositoryCount > 0",
                    "group": "navigation@1"
                }
            ],
            "commandPalette": [
                {
                    "command": "commit-genius.generateAICommitMessage",
                    "when": "gitOpenRepositoryCount > 0"
                }
            ]
        }
    }
}
```

---

## 🚨 Error Handling

### Error Types

#### Custom Error Classes

```javascript
class CommitGeniusError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.name = 'CommitGeniusError';
        this.code = code;
        this.details = details;
    }
}

class ValidationError extends CommitGeniusError {
    constructor(message, field) {
        super(message, 'VALIDATION_ERROR', { field });
        this.name = 'ValidationError';
    }
}

class APIError extends CommitGeniusError {
    constructor(message, statusCode, response) {
        super(message, 'API_ERROR', { statusCode, response });
        this.name = 'APIError';
    }
}

class GitError extends CommitGeniusError {
    constructor(message, gitCommand) {
        super(message, 'GIT_ERROR', { gitCommand });
        this.name = 'GitError';
    }
}
```

#### Error Handler

```javascript
class ErrorHandler {
    static handle(error) {
        console.error('Commit Genius Error:', error);
        
        let userMessage = 'An unexpected error occurred.';
        let showDetails = false;
        
        switch (error.name) {
            case 'ValidationError':
                userMessage = `Validation failed: ${error.message}`;
                break;
                
            case 'APIError':
                if (error.details.statusCode === 401) {
                    userMessage = 'Invalid API key. Please check your OpenRouter API key.';
                } else if (error.details.statusCode === 429) {
                    userMessage = 'Rate limit exceeded. Please try again later or upgrade to a premium model.';
                } else {
                    userMessage = `API request failed: ${error.message}`;
                    showDetails = true;
                }
                break;
                
            case 'GitError':
                userMessage = `Git operation failed: ${error.message}`;
                showDetails = true;
                break;
                
            default:
                userMessage = error.message || 'An unexpected error occurred.';
                showDetails = true;
        }
        
        if (showDetails) {
            vscode.window.showErrorMessage(userMessage, 'Show Details').then(selection => {
                if (selection === 'Show Details') {
                    this.showErrorDetails(error);
                }
            });
        } else {
            vscode.window.showErrorMessage(userMessage);
        }
    }
    
    static showErrorDetails(error) {
        const details = {
            message: error.message,
            code: error.code,
            stack: error.stack,
            details: error.details
        };
        
        vscode.workspace.openTextDocument({
            content: JSON.stringify(details, null, 2),
            language: 'json'
        }).then(doc => {
            vscode.window.showTextDocument(doc);
        });
    }
}
```

### Validation

#### Input Validation

```javascript
class Validator {
    static validateApiKey(apiKey) {
        if (!apiKey) {
            throw new ValidationError('API key is required', 'apiKey');
        }
        
        if (!apiKey.startsWith('sk-or-v1-')) {
            throw new ValidationError('API key must start with sk-or-v1-', 'apiKey');
        }
        
        if (apiKey.length < 50) {
            throw new ValidationError('API key appears to be invalid (too short)', 'apiKey');
        }
    }
    
    static validateDiff(diff) {
        if (!diff || diff.trim().length === 0) {
            throw new ValidationError('No staged changes found', 'diff');
        }
        
        const maxSize = ConfigManager.getMaxDiffSize();
        if (diff.length > maxSize) {
            throw new ValidationError(
                `Diff too large (${diff.length} chars, max ${maxSize})`,
                'diff'
            );
        }
    }
    
    static validateModel(model) {
        if (!AVAILABLE_MODELS[model]) {
            throw new ValidationError(`Unknown model: ${model}`, 'model');
        }
    }
}
```

---

## 🛠️ Development Setup

### Prerequisites

```json
{
    "engines": {
        "node": ">=14.0.0",
        "vscode": "^1.60.0"
    },
    "devDependencies": {
        "@types/vscode": "^1.60.0",
        "@types/node": "14.x",
        "eslint": "^8.0.0",
        "typescript": "^4.4.0",
        "@vscode/test-electron": "^2.1.0"
    },
    "dependencies": {
        "axios": "^1.0.0"
    }
}
```

### Build Scripts

```json
{
    "scripts": {
        "vscode:prepublish": "npm run compile",
        "compile": "tsc -p ./",
        "watch": "tsc -watch -p ./",
        "pretest": "npm run compile && npm run lint",
        "lint": "eslint src --ext ts",
        "test": "node ./out/test/runTest.js",
        "package": "vsce package",
        "publish": "vsce publish"
    }
}
```

### TypeScript Configuration

```json
// tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        "outDir": "out",
        "lib": ["es6"],
        "sourceMap": true,
        "rootDir": "src",
        "strict": true
    },
    "exclude": ["node_modules", ".vscode-test"]
}
```

---

## 🧪 Testing Framework

### Test Structure

```
tests/
├── unit/
│   ├── git.test.js
│   ├── api.test.js
│   └── validation.test.js
├── integration/
│   ├── extension.test.js
│   └── commands.test.js
└── fixtures/
    ├── sample-diffs/
    └── mock-responses/
```

### Unit Tests

```javascript
// tests/unit/validation.test.js
const assert = require('assert');
const { Validator } = require('../../src/utils/validation');

suite('Validation Tests', () => {
    test('Valid API key passes validation', () => {
        const validKey = 'sk-or-v1-' + 'a'.repeat(40);
        assert.doesNotThrow(() => {
            Validator.validateApiKey(validKey);
        });
    });
    
    test('Invalid API key throws ValidationError', () => {
        assert.throws(() => {
            Validator.validateApiKey('invalid-key');
        }, /API key must start with sk-or-v1-/);
    });
    
    test('Empty diff throws ValidationError', () => {
        assert.throws(() => {
            Validator.validateDiff('');
        }, /No staged changes found/);
    });
});
```

### Integration Tests

```javascript
// tests/integration/extension.test.js
const vscode = require('vscode');
const assert = require('assert');

suite('Extension Integration Tests', () => {
    test('Extension activates successfully', async () => {
        const extension = vscode.extensions.getExtension('commit-genius');
        assert.ok(extension);
        
        await extension.activate();
        assert.ok(extension.isActive);
    });
    
    test('Commands are registered', async () => {
        const commands = await vscode.commands.getCommands();
        assert.ok(commands.includes('commit-genius.generateAICommitMessage'));
    });
});
```

### Mock Setup

```javascript
// tests/mocks/openrouter.js
class MockOpenRouter {
    static mockResponse = {
        choices: [{
            message: {
                content: 'feat: add user authentication system'
            }
        }]
    };
    
    static async post(url, data, config) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Validate request
        if (!config.headers.Authorization) {
            throw new Error('Missing authorization header');
        }
        
        return { data: this.mockResponse };
    }
}

module.exports = MockOpenRouter;
```

---

## 🤝 Contributing Guidelines

### Development Workflow

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/your-username/AICommit01.git
   cd AICommit01
   npm install
   ```

2. **Development**:
   ```bash
   # Start development mode
   npm run watch
   
   # Open in VS Code
   code .
   
   # Press F5 to launch Extension Development Host
   ```

3. **Testing**:
   ```bash
   # Run all tests
   npm test
   
   # Run specific test suite
   npm test -- --grep "Validation"
   
   # Run with coverage
   npm run test:coverage
   ```

4. **Linting**:
   ```bash
   # Check code style
   npm run lint
   
   # Fix auto-fixable issues
   npm run lint:fix
   ```

### Code Style

#### ESLint Configuration

```json
{
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "env": {
        "node": true,
        "es6": true
    },
    "rules": {
        "indent": ["error", 4],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-console": "warn",
        "no-unused-vars": "error"
    }
}
```

### Pull Request Guidelines

1. **Branch Naming**:
   - `feature/description` - New features
   - `fix/description` - Bug fixes
   - `docs/description` - Documentation updates
   - `refactor/description` - Code refactoring

2. **Commit Messages**:
   - Use Conventional Commits format
   - Be descriptive and specific
   - Reference issues when applicable

3. **PR Requirements**:
   - All tests must pass
   - Code coverage should not decrease
   - Include documentation updates
   - Add tests for new functionality

### Release Process

```bash
# 1. Update version
npm version patch|minor|major

# 2. Update CHANGELOG.md
# Add new version section with changes

# 3. Build and test
npm run compile
npm test

# 4. Package extension
npm run package

# 5. Publish to marketplace
npm run publish

# 6. Create GitHub release
git tag v1.2.3
git push origin v1.2.3
```

---

## 📚 Additional Resources

### VS Code Extension API
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

### OpenRouter API
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Model Pricing](https://openrouter.ai/models)
- [API Reference](https://openrouter.ai/docs/api)

### Git Integration
- [Git SCM Provider](https://code.visualstudio.com/api/extension-guides/scm-provider)
- [Source Control API](https://code.visualstudio.com/api/references/vscode-api#scm)

---

*API Documentation last updated: 2024*
*For the latest technical information, visit our [GitHub repository](https://github.com/anmolsah/AICommit01)*