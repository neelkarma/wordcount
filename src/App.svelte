<script lang="ts">
  import Editor from "./lib/Editor.svelte";
  import Stats from "./lib/Stats.svelte";
  let text = "";
</script>

<Stats {text} />
<Editor bind:value={text} />
