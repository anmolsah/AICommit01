const vscode = require("vscode");
const axios = require("axios");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  console.log('Commit Genius is now active!');

  // Register command to set API key
  const setApiKeyCommand = vscode.commands.registerCommand(
    "commit-genius.setApiKey",
    async () => {
      try {
        const apiKey = await vscode.window.showInputBox({
          prompt: "Enter your OpenRouter.ai API Key",
          password: true,
          ignoreFocusOut: true,
          placeHolder: "sk-or-...",
          validateInput: (value) => {
            if (!value) return "API key is required";
            if (!value.startsWith("sk-or-")) return "API key should start with 'sk-or-'";
            return null;
          }
        });

        if (apiKey) {
          await context.secrets.store("openRouterApiKey", apiKey);
          vscode.window.showInformationMessage("✅ OpenRouter API Key stored successfully!");
        } else {
          vscode.window.showWarningMessage("❌ API Key was not entered.");
        }
      } catch (error) {
        vscode.window.showErrorMessage(`Failed to store API key: ${error.message}`);
      }
    }
  );

  // Register main command to generate commit message
  const generateCommitMessageCommand = vscode.commands.registerCommand(
    "commit-genius.generateAICommitMessage",
    async () => {
      try {
        await generateCommitMessage(context);
      } catch (error) {
        console.error("Commit Genius Error:", error);
        vscode.window.showErrorMessage(`Commit Genius failed: ${error.message}`);
      }
    }
  );

  // Listen for configuration changes
  const configChangeListener = vscode.workspace.onDidChangeConfiguration(
    async (event) => {
      if (event.affectsConfiguration("commit-genius.apiKey")) {
        const config = vscode.workspace.getConfiguration("commit-genius");
        const apiKey = config.get("apiKey");

        if (apiKey) {
          await context.secrets.store("openRouterApiKey", apiKey);
          vscode.window.showInformationMessage("✅ API Key updated and stored securely.");
          // Clear from settings for security
          await config.update("apiKey", "", vscode.ConfigurationTarget.Global);
        }
      }
    }
  );

  context.subscriptions.push(
    setApiKeyCommand,
    generateCommitMessageCommand,
    configChangeListener
  );
}

/**
 * Main function to generate commit message
 */
async function generateCommitMessage(context) {
  // Get Git API
  const gitExtension = vscode.extensions.getExtension("vscode.git")?.exports;
  const gitApi = gitExtension?.getAPI(1);

  if (!gitApi) {
    throw new Error("Git extension not found. Please ensure Git is installed and the Git extension is enabled.");
  }

  // Get active repository
  const repo = gitApi.repositories[0];
  if (!repo) {
    throw new Error("No Git repository found. Please open a folder with a Git repository.");
  }

  // Check for changes
  const workingTreeChanges = repo.state.workingTreeChanges;
  const indexChanges = repo.state.indexChanges;

  let changesToAnalyze = [];
  let shouldStage = false;

  if (workingTreeChanges.length > 0) {
    // We have unstaged changes, we'll stage them
    changesToAnalyze = workingTreeChanges;
    shouldStage = true;
  } else if (indexChanges.length > 0) {
    // We have staged changes, use them
    changesToAnalyze = indexChanges;
    shouldStage = false;
  } else {
    vscode.window.showInformationMessage("ℹ️ No changes found to commit.");
    return;
  }

  // Get diff content
  let diffContent = "";
  try {
    if (shouldStage) {
      // Get diff for unstaged changes and stage them
      const diffPromises = changesToAnalyze.map(async (change) => {
        try {
          return await repo.diffWithHEAD(change.uri.fsPath);
        } catch (error) {
          console.warn(`Could not get diff for ${change.uri.fsPath}:`, error);
          return `Modified: ${change.uri.fsPath}`;
        }
      });

      const diffs = await Promise.all(diffPromises);
      diffContent = diffs.filter(diff => diff).join("\n");

      // Stage the files
      const filePaths = changesToAnalyze.map(change => change.uri.fsPath);
      await repo.add(filePaths);

      vscode.window.showInformationMessage(`📁 Staged ${filePaths.length} file(s)`);
    } else {
      // Get diff for already staged changes
      const diffPromises = changesToAnalyze.map(async (change) => {
        try {
          return await repo.diffIndexWithHEAD(change.uri.fsPath);
        } catch (error) {
          console.warn(`Could not get staged diff for ${change.uri.fsPath}:`, error);
          return `Staged: ${change.uri.fsPath}`;
        }
      });

      const diffs = await Promise.all(diffPromises);
      diffContent = diffs.filter(diff => diff).join("\n");
    }
  } catch (error) {
    console.warn("Error getting diff content:", error);
    // Fallback to file names
    diffContent = changesToAnalyze.map(change =>
      `${change.status === 1 ? 'Modified' : change.status === 2 ? 'Added' : 'Deleted'}: ${change.uri.fsPath}`
    ).join("\n");
  }

  if (!diffContent.trim()) {
    throw new Error("Could not analyze changes. Please ensure you have valid Git changes.");
  }

  // Generate commit message using AI
  await generateMessageFromDiff(diffContent, context, repo);
}

/**
 * Generate commit message from diff using AI
 */
async function generateMessageFromDiff(diff, context, repo) {
  // Check for API key
  const apiKey = await context.secrets.get("openRouterApiKey");
  if (!apiKey) {
    const action = await vscode.window.showWarningMessage(
      "🔑 OpenRouter API key not set. Please set it to use Commit Genius.",
      "Set API Key"
    );
    if (action === "Set API Key") {
      await vscode.commands.executeCommand("commit-genius.setApiKey");
    }
    return;
  }

  // Get model configuration
  const config = vscode.workspace.getConfiguration("commit-genius");
  const model = config.get("model") || "mistralai/mistral-small-3.2-24b-instruct:free";

  // Create prompt
  const prompt = `Based on the following git diff, generate a concise and professional commit message following conventional commit standards.

Rules:
- Single line, maximum 72 characters
- Start with type: feat, fix, chore, docs, style, refactor, test, etc.
- Format: "type: brief description"
- Be specific and descriptive
- No quotes, explanations, or extra text

Git diff:
${diff}

Commit message:`;

  // Show progress and make API call
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "🤖 Generating commit message...",
      cancellable: false,
    },
    async () => {
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: model,
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
            temperature: 0.3
          },
          {
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "https://github.com/anmolsah/AICommit01",
              "X-Title": "Commit Genius VS Code Extension"
            },
            timeout: 30000 // 30 second timeout
          }
        );

        if (!response.data?.choices?.[0]?.message?.content) {
          throw new Error("Invalid response from AI service");
        }

        let commitMessage = response.data.choices[0].message.content
          .trim()
          .replace(/^["'`]|["'`]$/g, "") // Remove quotes
          .replace(/\n.*$/s, ""); // Take only first line

        // Ensure it's not too long
        if (commitMessage.length > 72) {
          commitMessage = commitMessage.substring(0, 69) + "...";
        }

        // Set the commit message in the input box
        if (repo && repo.inputBox) {
          repo.inputBox.value = commitMessage;
          vscode.window.showInformationMessage(`✨ Generated: "${commitMessage}"`);
        } else {
          vscode.window.showErrorMessage("Could not access Git input box");
        }

      } catch (error) {
        console.error("API Error:", error);

        let errorMessage = "Failed to generate commit message";

        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;

          if (status === 429) {
            errorMessage = "⏱️ Rate limit exceeded. Please wait a moment and try again.";
          } else if (status === 401) {
            errorMessage = "🔑 Invalid API key. Please check your OpenRouter API key.";
          } else if (status === 402) {
            errorMessage = "💳 Insufficient credits. Please add credits to your OpenRouter account.";
          } else {
            const apiError = data?.error?.message || JSON.stringify(data);
            errorMessage = `API Error (${status}): ${apiError}`;
          }
        } else if (error.request) {
          errorMessage = "🌐 Network error. Please check your internet connection.";
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = "⏰ Request timeout. Please try again.";
        } else {
          errorMessage = error.message;
        }

        vscode.window.showErrorMessage(`Commit Genius: ${errorMessage}`);
      }
    }
  );
}

function deactivate() {
  console.log('Commit Genius deactivated');
}

module.exports = {
  activate,
  deactivate,
};