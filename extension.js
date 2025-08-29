const vscode = require("vscode");
const { exec } = require("child_process");
const axios = require("axios");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Command to set the OpenRouter API key
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
        const diff = await getGitDiff();
        if (!diff) {
          vscode.window.showInformationMessage(
            "No staged changes found to generate a commit message."
          );
          return;
        }

        const apiKey = await context.secrets.get("openRouterApiKey");
        if (!apiKey) {
          // Prompt the user to set the key if it's not found
          const action = await vscode.window.showWarningMessage(
            "OpenRouter API key not set. Please set it to use Commit Genius.",
            "Set API Key"
          );
          if (action === "Set API Key") {
            vscode.commands.executeCommand("commit-genius.setApiKey");
          }
          return;
        }

        const model = vscode.workspace
          .getConfiguration("commit-genius")
          .get("model");
        const prompt = `Based on the following git diff, generate a concise and professional commit message. The message should follow conventional commit standards. It should be a single line, no more than 72 characters, starting with a type like 'feat', 'fix', 'chore', etc. Do not include any explanations or extra text, only the commit message itself.\n\nDiff:\n${diff}`;

        await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Commit Genius: Generating commit message...",
            cancellable: false,
          },
          async () => {
            const response = await axios.post(
              "https://openrouter.ai/api/v1/chat/completions",
              {
                model: model,
                messages: [{ role: "user", content: prompt }],
              },
              {
                headers: {
                  Authorization: `Bearer ${apiKey}`,
                  "Content-Type": "application/json",
                  "HTTP-Referer": "http://localhost", 
                  "X-Title": "Commit Genius", 
                },
              }
            );

            const commitMessage = response.data.choices[0].message.content
              .trim()
              .replace(/['"`]/g, ""); // Remove quotes
            const gitExtension =
              vscode.extensions.getExtension("vscode.git").exports;
            const api = gitExtension.getAPI(1);

            if (api.repositories.length > 0) {
              api.repositories[0].inputBox.value = commitMessage;
            } else {
              vscode.window.showErrorMessage("No Git repository found.");
            }
          }
        );
      } catch (error) {
        console.error("Commit Genius Error:", error); // Log the full error object

        let errorMessage = "Failed to generate commit message.";
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 429) {
            errorMessage =
              "You have exceeded the API rate limit. Please wait a moment before trying again.";
          } else {
            console.error("Error data:", error.response.data);
            const apiError =
              error.response.data.error?.message ||
              JSON.stringify(error.response.data);
            errorMessage = `API Error: ${error.response.status} - ${apiError}`;
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage =
            "Network error. Could not connect to OpenRouter API. Check your internet connection.";
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }

        vscode.window.showErrorMessage(`Commit Genius Error: ${errorMessage}`);
      }
    }
  );

  context.subscriptions.push(setApiKeyCommand, generateCommitMessageCommand);
}

function deactivate() {}

/**
 * Gets the staged git diff.
 * @returns {Promise<string>} A promise that resolves with the git diff.
 */
function getGitDiff() {
  return new Promise((resolve, reject) => {
    const cwd = vscode.workspace.workspaceFolders
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : undefined;
    if (!cwd) {
      vscode.window.showErrorMessage("Please open a folder or workspace.");
      return resolve("");
    }

    exec("git diff --staged", { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        // Don't reject, as this could just mean it's not a git repo.
        // The extension should handle an empty diff gracefully.
        vscode.window.showErrorMessage(
          "Failed to run git diff. Is this a Git repository?"
        );
        return resolve("");
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

module.exports = {
  activate,
  deactivate,
};
