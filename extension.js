const vscode = require("vscode");
const { exec } = require("child_process");
const axios = require("axios");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  // Command to set the API key
  let setApiKeyCommand = vscode.commands.registerCommand(
    "commit-genius.setApiKey",
    async function () {
      const apiKey = await vscode.window.showInputBox({
        prompt: "Enter your OpenRouter.ai API Key",
        password: true,
        ignoreFocusOut: true,
        placeHolder: "sk-or-...",
      });

      if (apiKey) {
        await context.secrets.store("openRouterApiKey", apiKey);
        vscode.window.showInformationMessage(
          "OpenRouter API Key stored successfully."
        );
      } else {
        vscode.window.showWarningMessage("API Key was not entered.");
      }
    }
  );

  // Command to generate the commit message
  let generateCommitMessageCommand = vscode.commands.registerCommand(
    "commit-genius.generateAICommitMessage",
    async function () {
      try {
        // Step 1: Get the official VS Code Git API
        const gitExtension =
          vscode.extensions.getExtension("vscode.git")?.exports;
        const api = gitExtension?.getAPI(1);

        if (!api) {
          vscode.window.showErrorMessage(
            "Could not access the VS Code Git extension. Please ensure it is enabled."
          );
          return;
        }

        // Step 2: Find the active repository
        const repo = api.repositories[0];
        if (!repo) {
          vscode.window.showErrorMessage("No active Git repository found.");
          return;
        }

        // Step 3: Get all unstaged changes using the API
        // The `workingTreeChanges` property gives us all files that have been modified but not staged.
        const unstagedChanges = repo.state.workingTreeChanges;

        if (unstagedChanges.length > 0) {
          // Step 4: Stage all changes using the API's `add` command. This is robust and bypasses hooks.
          const fileUris = unstagedChanges.map((change) => change.uri);
          await repo.add(fileUris);
        }

        // Step 5: Get the staged diff using a simple git command.
        // This is safer than `git add` and is the most reliable way to get the diff string.
        const stagedDiff = await runGitDiffCommand(repo.rootUri.fsPath);

        // Step 6: If there's no diff, it means there were no changes to begin with.
        if (!stagedDiff) {
          vscode.window.showInformationMessage("No changes found to commit.");
          return;
        }

        // Step 7: Proceed with generating the message from the staged diff.
        await generateMessageFromDiff(stagedDiff, context);
      } catch (error) {
        vscode.window.showErrorMessage(
          `Commit Genius failed: ${error.message}`
        );
        console.error("Commit Genius command failed:", error);
      }
    }
  );

  context.subscriptions.push(setApiKeyCommand, generateCommitMessageCommand);
}

/**
 * Takes a git diff, gets commit suggestions, and populates the SCM input box.
 * @param {string} diff The git diff string.
 * @param {vscode.ExtensionContext} context The extension context.
 */
async function generateMessageFromDiff(diff, context) {
  const apiKey = await context.secrets.get("openRouterApiKey");
  if (!apiKey) {
    const action = await vscode.window.showWarningMessage(
      "OpenRouter API key not set. Please set it to use Commit Genius.",
      "Set API Key"
    );
    if (action === "Set API Key") {
      vscode.commands.executeCommand("commit-genius.setApiKey");
    }
    return;
  }

  const model = vscode.workspace.getConfiguration("commit-genius").get("model");
  const prompt = `Based on the following git diff, generate a concise and professional commit message. The message should follow conventional commit standards. It should be a single line, no more than 72 characters, starting with a type like 'feat', 'fix', 'chore', etc. Do not include any explanations or extra text, only the commit message itself.\n\nDiff:\n${diff}`;

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Commit Genius: Generating commit message...",
      cancellable: false,
    },
    async () => {
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          { model: model, messages: [{ role: "user", content: prompt }] },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost", // Required for free models
              "X-Title": "Commit Genius",
            },
          }
        );

        const commitMessage = response.data.choices[0].message.content
          .trim()
          .replace(/['"`]/g, "");
        const gitExtension =
          vscode.extensions.getExtension("vscode.git")?.exports;
        const api = gitExtension?.getAPI(1);

        if (api && api.repositories.length > 0) {
          api.repositories[0].inputBox.value = commitMessage;
        } else {
          vscode.window.showErrorMessage("No active Git repository found.");
        }
      } catch (error) {
        console.error("Commit Genius Error:", error);
        let errorMessage = "Failed to generate commit message.";
        if (error.response) {
          if (error.response.status === 429) {
            errorMessage =
              "You have exceeded the API rate limit. Please wait a moment before trying again.";
          } else {
            const apiError =
              error.response.data.error?.message ||
              JSON.stringify(error.response.data);
            errorMessage = `API Error: ${error.response.status} - ${apiError}`;
          }
        } else if (error.request) {
          errorMessage = "Network error. Could not connect to OpenRouter API.";
        } else {
          errorMessage = error.message;
        }
        vscode.window.showErrorMessage(`Commit Genius Error: ${errorMessage}`);
      }
    }
  );
}

/**
 * Runs the `git diff --staged` command in a specific directory.
 * @param {string} cwd The directory to run the command in.
 * @returns {Promise<string>} A promise that resolves with the stdout.
 */
function runGitDiffCommand(cwd) {
  return new Promise((resolve, reject) => {
    if (!cwd) {
      return reject(new Error("Workspace folder not found."));
    }

    exec(
      "git diff --staged",
      { cwd, maxBuffer: 1024 * 10000 },
      (error, stdout, stderr) => {
        if (error) {
          return reject(
            new Error(
              `Failed to run 'git diff --staged': ${stderr || error.message}`
            )
          );
        }
        resolve(stdout);
      }
    );
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
