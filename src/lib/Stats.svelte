<script lang="ts">
  import { humanizeDurationMins, plural } from "../utils";
  import {
    word_count,
    char_count,
    unique_word_count,
    paragraph_count,
    reading_time,
    speaking_time,
  } from "../../core/pkg";
  import { onMount } from "svelte";

  export let text: string;

  let div: HTMLDivElement;
  onMount(() => {
    // Because for some reason browsers can't animate between a fixed value and "auto".
    div.style.setProperty("--expanded-height", `${div.scrollHeight}px`);

    // Auto activate shadow if page is scrolled
    window.onscroll = () => {
      if (window.scrollY) {
        // Light Mode
        div.classList.remove("bg-zinc-50");
        div.classList.add("bg-zinc-100");

        // Dark Mode
        div.classList.remove("dark:bg-zinc-900");
        div.classList.add("dark:bg-zinc-800");
      } else {
        // Light Mode
        div.classList.remove("bg-zinc-100");
        div.classList.add("bg-zinc-50");

        // Dark Mode
        div.classList.remove("dark:bg-zinc-800");
        div.classList.add("dark:bg-zinc-900");
      }
    };
  });

  $: wordCount = word_count(text);
  $: charCount = char_count(text);
  $: uniqueWordCount = unique_word_count(text);
  $: paragraphCount = paragraph_count(text);
  $: readingTime = humanizeDurationMins(reading_time(text));
  $: speakingTime = humanizeDurationMins(speaking_time(text));
</script>

<div
  bind:this={div}
  class="
    group sticky top-0 left-0 hover:mb-3
    bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 hover:dark:bg-zinc-800
    text-zinc-400 hover:text-zinc-600 dark:text-zinc-500  dark:hover:text-zinc-400
    h-[55px] hover:h-[var(--expanded-height)] overflow-hidden
    transition-all duration-300 ease-in-out
  "
>
  <div class="flex flex-col gap-1 w-11/12 md:w-3/4 lg:w-1/2 mx-auto my-4">
    <p class="group-hover:font-bold">
      {wordCount} word{plural(wordCount)}, {charCount} character{plural(
        charCount
      )}
    </p>
    <div class="flex flex-col gap-1 mt-2">
      <p>{uniqueWordCount} unique word{plural(uniqueWordCount)}</p>
      <p>{paragraphCount} paragraph{plural(paragraphCount)}</p>
      <p>{readingTime} to read</p>
      <p>{speakingTime} to speak</p>
    </div>
  </div>
</div>
