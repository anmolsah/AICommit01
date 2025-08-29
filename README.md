
---

# <img src="./icon.png" alt="Commit Genius Logo" width="40"/> Commit Genius

Commit Genius helps you generate **professional and concise commit messages** using AI.
No more wasting time thinking about the right words — just stage your changes, click a button, and let AI do the work 🚀.

---

## ✨ Features

* Generate commit messages following **conventional commit standards** (`feat`, `fix`, `chore`, etc.).
* Works directly with your Git workflow in VS Code.
* Supports **free AI models** via [OpenRouter.ai](https://openrouter.ai), with an option to switch to paid models if you prefer.
* Secure — your API key is stored safely in VS Code’s secret storage.

---

## 🛠️ How to Use

### 1. Install the Extension

Search for **Commit Genius** in the VS Code marketplace and install it.

---

### 2. Stage Your Changes

* Make changes in your code.
* Go to the **Source Control view** in VS Code.
* Click on the **`+` (plus) icon** to stage the changes.


---

### 3. Generate AI Commit Message

* In the Source Control view, click on the **✨ (sparkle/star) icon**.
* Commit Genius will ask you for your **OpenRouter API Key** (only the first time).


---

### 4. Enter Your API Key

* If you don’t have one yet, go to [OpenRouter.ai Keys](https://openrouter.ai/keys).
* Sign in with GitHub/Google.
* Click **Create Key** and copy the key (looks like `sk-or-...`).
* Paste this into VS Code when prompted. ✅ Done!

---

### 5. Enjoy AI-Powered Commit Messages

* Generated commit message appears in the commit box.
* You can edit it before committing.

---

## ⚙️ Models & Settings

* Default: **free AI models** (DeepSeek, Qwen, Mistral).
* Free models have **rate limits** → if you hit them, wait a few minutes.
* Switch to **paid models** anytime:

  * Go to **Settings → Extensions → Commit Genius → Model**.
  * Select free or paid models depending on your needs.

---

## 💡 Tips

* Stage your changes for best results.
* Follows **conventional commit format** → keeps commit history clean.
* API key stored securely in VS Code Secret Storage.

---

## 📷 Screenshots & Demo

1. Stage changes (`+` button).
2. Generate commit (`✨` icon).
3. API key input.


---

## 📝 Example

**Diff:**

```diff
- const name = "user";
+ const username = "user123";
```

**Generated Commit Message:**

```
fix: update version to 1.1.1 and modify default AI model in package.json
```

---

## 🛡️ Security

* Your API key is stored locally in VS Code Secret Storage.
* It is **never shared** beyond the OpenRouter API requests you make.

---

## 🚀 Get Started

1. Install Commit Genius.
2. Stage your changes.
3. Click the sparkle ✨ icon.
4. Paste your OpenRouter API key.
5. Commit like a pro!

---


