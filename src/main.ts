import "@fontsource/inter";
import "./style.css";
import { debounce, humanizeDurationMins, plural } from "./utils";

// Elements
const editor = <HTMLDivElement>document.getElementById("editor");
const stats = <HTMLDivElement>document.getElementById("stats");
const wordsCharsEl = <HTMLParagraphElement>(
  document.getElementById("words-chars")
);
const charsExcludingSpacesEl = <HTMLParagraphElement>(
  document.getElementById("chars-excluding-spaces")
);
const paragraphsEl = <HTMLParagraphElement>(
  document.getElementById("paragraphs")
);
const readingTimeEl = <HTMLParagraphElement>(
  document.getElementById("reading-time")
);
const speakingTimeEl = <HTMLParagraphElement>(
  document.getElementById("speaking-time")
);

/** Function to focus the editor */
function focusEditor() {
  if (document.activeElement == editor) return; // Skip if already focused
  const range = document.createRange();
  const selection = window.getSelection()!;
  range.selectNodeContents(editor);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  editor.focus();
  range.detach();
}

const saveToLocalStorage = debounce(() => {
  const contents = editor.innerText;
  window.localStorage.setItem("text", contents);
});

function updateStats() {
  const selected = window.getSelection()?.toString() ?? "";
  const input = editor.innerText;

  const text = selected || input;

  const wordCount = text.split(" ").filter((word) => word.length).length;
  const charCountExcludingSpaces = text.replaceAll(/\s+/g, "").length;
  const charCount = text.length;
  const paragraphCount = text.split("\n").filter((para) => para.length).length;
  const readingTime = humanizeDurationMins(wordCount / 275);
  const speakingTime = humanizeDurationMins(wordCount / 180);

  wordsCharsEl.innerHTML = `${wordCount} word${plural(
    wordCount,
  )}, ${charCount} character${plural(charCount)}`;
  charsExcludingSpacesEl.innerHTML = `${charCountExcludingSpaces} character${plural(
    charCountExcludingSpaces,
  )} (excluding spaces)`;
  paragraphsEl.innerHTML = `${paragraphCount} paragraph${plural(
    paragraphCount,
  )}`;
  readingTimeEl.innerHTML = `${readingTime} to read`;
  speakingTimeEl.innerHTML = `${speakingTime} to speak`;
}

// Initialization Work
function init() {
  // Restore localStorage text
  editor.innerHTML = window.localStorage.getItem("text") ?? "";
  updateStats();

  // Focus editor on start
  focusEditor();

  // Auto focus editor on keydown and click
  window.onkeydown = focusEditor;
  window.onclick = focusEditor;

  // Because for some reason browsers can't animate between a fixed value and "auto".
  stats.style.setProperty("--expanded-height", `${stats.scrollHeight}px`);

  // Auto-change stats colors if page is scrolled
  window.onscroll = () => {
    if (window.scrollY) {
      stats.setAttribute("data-scrolled", "");
    } else {
      stats.removeAttribute("data-scrolled");
    }
  };
}

// Account for if DOM is already loaded
if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);

// Main App Logic
editor.oninput = () => {
  updateStats();
  saveToLocalStorage();
};

editor.onmouseup = () => {
  updateStats();
};

editor.onpaste = (e) => {
  e.preventDefault();

  const text = e.clipboardData?.getData("text/plain");
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;
  selection.deleteFromDocument();
  selection.getRangeAt(0).insertNode(document.createTextNode(text ?? ""));
  selection.collapseToEnd();

  updateStats();
};
