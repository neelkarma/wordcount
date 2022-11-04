import "@fontsource/inter";
import "./style.css";
import {
  word_count,
  char_count,
  unique_word_count,
  paragraph_count,
  reading_time,
  speaking_time,
} from "../core/pkg";
import { debounce, humanizeDurationMins, plural } from "./utils";

// Elements
const editor = document.getElementById("editor")!;
const stats = document.getElementById("stats")!;
const wordsCharsEl = document.getElementById("words-chars")!;
const uniqueWordsEl = document.getElementById("unique-words")!;
const paragraphsEl = document.getElementById("paragraphs")!;
const readingTimeEl = document.getElementById("reading-time")!;
const speakingTimeEl = document.getElementById("speaking-time")!;

/** Function to focus the editor */
const focusEditor = () => {
  if (document.activeElement == editor) return; // Skip if already focused
  const range = document.createRange();
  const selection = window.getSelection()!;
  range.selectNodeContents(editor);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  editor.focus();
  range.detach();
};

const saveToLocalStorage = debounce(() => {
  const contents = editor.innerHTML;
  window.localStorage.setItem("text", contents);
});

const updateStats = () => {
  const selected = window.getSelection()?.toString() ?? "";
  const input = editor.innerText;

  const text = selected || input;

  const wordCount = word_count(text);
  const charCount = char_count(text);
  const uniqueWordCount = unique_word_count(text);
  const paragraphCount = paragraph_count(text);
  const readingTime = humanizeDurationMins(reading_time(text));
  const speakingTime = humanizeDurationMins(speaking_time(text));

  wordsCharsEl.innerHTML = `${wordCount} word${plural(
    wordCount
  )}, ${charCount} character${plural(charCount)}`;
  uniqueWordsEl.innerHTML = `${uniqueWordCount} unique word${plural(
    uniqueWordCount
  )}`;
  paragraphsEl.innerHTML = `${paragraphCount} paragraph${plural(
    paragraphCount
  )}`;
  readingTimeEl.innerHTML = `${readingTime} to read`;
  speakingTimeEl.innerHTML = `${speakingTime} to speak`;
};

// Initialization Work
const init = () => {
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
};
// Account for if DOM is already loaded
if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);

// Main App Logic

editor.addEventListener("input", (e) => {
  updateStats();
  saveToLocalStorage();
});

editor.addEventListener("mouseup", () => {
  updateStats();
});

editor.addEventListener("paste", (e) => {
  e.preventDefault();

  const text = e.clipboardData?.getData("text/plain");
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;
  selection.deleteFromDocument();
  selection.getRangeAt(0).insertNode(document.createTextNode(text ?? ""));
  selection.collapseToEnd();

  updateStats();
});
