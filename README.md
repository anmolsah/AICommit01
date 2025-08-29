
````markdown
# <img src="./logo.png" alt="Commit Genius Logo" width="40"/> Commit Genius

Commit Genius helps you generate **professional and concise commit messages** using AI.  
No more wasting time thinking about the right words — just stage your changes, click a button, and let AI do the work 🚀.

---

## ✨ Features
- Generate commit messages following **conventional commit standards** (`feat`, `fix`, `chore`, etc.).
- Works directly with your Git workflow in VS Code.
- Supports **free AI models** via [OpenRouter.ai](https://openrouter.ai), with an option to switch to paid models if you prefer.
- Secure — your API key is stored safely in VS Code’s secret storage.

---

## 🛠️ How to Use

1. **Install the Extension**  
   Search for **Commit Genius** in the VS Code marketplace and install it.

---

2. **Stage Your Changes**  
   - Make any changes in your code.  
   - Go to the **Source Control view** in VS Code.  
   - Click on the **`+` (plus) icon** to stage the changes.  

   ![Staging Changes Demo](./stagging.mp4)


---

3. **Generate AI Commit Message**  
   - In the Source Control view, click on the **✨ (sparkle/star) icon**.  
   - Commit Genius will ask you for your **OpenRouter API Key** (only the first time).  

   ![Sparkle Button Demo](./sparkleButton.mp4)

---

4. **Enter Your API Key**  
   - If you don’t have one yet, go to [OpenRouter.ai Keys](https://openrouter.ai/keys).  
   - Sign in with your GitHub/Google account.  
   - Click **Create Key** and copy the key (looks like `sk-or-...`).  
   - Paste this into VS Code when prompted.  
   - Done! 🎉

---

5. **Enjoy Your AI-Powered Commit Messages**  
   - Once generated, the commit message will appear in the commit box.  
   - You can edit it if you like before committing.  

---

## ⚙️ Models & Settings

- By default, Commit Genius uses **free AI models** from OpenRouter (e.g., DeepSeek, Qwen, Mistral).  
- Free models have **rate limits** (about 20 requests/minute, and daily caps).  
  - If you hit a limit, don’t worry — just try again after a few minutes.  
- If you want more reliability or higher quality, you can switch to **paid models** in the settings:  
  - Go to **Settings → Extensions → Commit Genius → Model**.  
  - Choose between free and paid models depending on your needs.

---

## 💡 Tips
- Use staged changes for best results (unstaged changes won’t be included).  
- Commit Genius follows **conventional commit format**, so your commit history stays clean and professional.  
- API key is stored securely — you don’t need to enter it every time.

---

## 📷 Screenshots
_Add images here to guide users visually:_  
1. Stage changes (`+` button).  
2. Generate commit (`✨` icon).  
3. API key input box.  

---

## 📝 Example
Diff:
```diff
- const name = "user";
+ const username = "user123";
````

Generated commit message:

```
feat: update variable name from name to username
```

---

## 🛡️ Security

Your API key is only stored locally in VS Code’s [Secret Storage](https://code.visualstudio.com/api/references/vscode-api#SecretStorage). It is **never shared** outside of the calls you make to OpenRouter.

---

## 🚀 Get Started

1. Install Commit Genius.
2. Stage your changes.
3. Click the sparkle ✨ icon.
4. Paste your OpenRouter API key.
5. Commit like a pro!

---

```


