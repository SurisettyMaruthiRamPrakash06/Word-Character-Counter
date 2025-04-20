# Word & Character Counter

A responsive and accessible web application that allows users to count words, characters, sentences, paragraphs, and estimate reading time in real time. It also includes live chart updates, dark mode, text cleaning, downloading features, and keyboard shortcuts.

---

## 🔥 Features

- 📊 Real-time word, character, sentence, paragraph counts  
- ⏱ Estimated reading time display  
- 🌓 Light/Dark theme toggle (with persistence)  
- 🧹 Clean text feature (removes extra spaces/newlines)  
- 💾 Download typed text as a `.txt` file  
- 📉 Interactive chart that shows words/characters over time  
- ♿ Accessible with ARIA labels  
- ⌨️ Keyboard shortcuts:
  - `Ctrl + D` → Download
  - `Ctrl + L` → Clean
  - `Ctrl + Delete` → Clear

---

## ✅ Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari, etc.)
- Internet connection to load Chart.js from CDN (or include it locally)

---

## 📦 Install Dependencies (if needed)

The app uses **Chart.js** via CDN. No npm or build tools are required.

If you want to use Chart.js locally:

```bash
# Optional - only if using locally hosted Chart.js
npm install chart.js
```

Then replace the CDN script tag in `index.html`:

```html
<script src="./path-to/chart.umd.js"></script>
```

---

## 🚀 How to Run

1. Clone the repository or download the source code:

```bash
git clone https://github.com/yourusername/word-character-counter.git
cd word-character-counter
```

2. Open `index.html` in your browser:

```bash
# Or just double-click the index.html file
```

---

## 🛠 Usage

1. Type or paste your text into the provided textarea.
2. See live updates for:
   - Word Count
   - Character Count
   - Sentence Count
   - Paragraph Count
   - Reading Time
3. Use buttons:
   - **Clean Text**: Removes extra whitespace and newlines
   - **Download**: Saves your text as a `.txt` file
   - **Clear**: Empties the text area
4. Use theme toggle ☀️🌙 in the top right to switch between dark and light modes.
5. View the live chart as your content grows.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributions

Contributions are welcome!  
Feel free to fork this repository, make changes, and submit a pull request.

---

## 📬 Contact

For any issues or suggestions, please open an issue on GitHub  or email me at **surisettyramprakash06@gmail.com**
