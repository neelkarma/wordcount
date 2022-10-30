<script lang="ts">
  import * as core from "../core/pkg";
  import Editor from "./lib/Editor.svelte";
  import Stats from "./lib/Stats.svelte";
  let text = "";
</script>

<Stats {text} />
<Editor bind:value={text} />
