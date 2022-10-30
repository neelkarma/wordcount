<script lang="ts">
  import { onMount } from "svelte";

  let div: HTMLDivElement;

  const focusEditor = () => {
    if (document.activeElement == div) return; // Skip if already focused
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(div);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    div.focus();
    range.detach();
  };

  onMount(() => {
    // Auto focus on mount
    div.focus();

    // Auto focus on keydown
    window.onkeydown = focusEditor;
    window.onclick = focusEditor;
  });

  let input = "";
  let selected = "";
  export let value = "";
  $: {
    // Prioritize selected over actual text
    value = selected ? selected : input;
  }
</script>

<div
  class="w-11/12 md:w-3/4 lg:w-1/2 mx-auto h-auto resize-none focus:outline-none"
  bind:this={div}
  on:input={(e) => {
    selected = "";

    // bind:textContent removes line breaks, so innerText used instead
    input = e.currentTarget.innerText;
  }}
  on:mouseup={() => (selected = window.getSelection().toString())}
  on:paste|preventDefault={(e) => {
    // Remove formatting from paste
    const text = e.clipboardData.getData("text/plain");
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
  }}
  contenteditable
/>
