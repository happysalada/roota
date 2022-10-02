<script lang="ts">
  import "../global.css";
  import Loader from "$lib/Loader.svelte";
  import { onMount } from "svelte";

  let loaded = false;

  onMount(async () => {
    loaded = true;
  });
</script>

{#if !loaded}
  <section class="overflow-x-hidden w-screen relative">
    <Loader />
  </section>
{:else}
  <main class="main h-full">
    <slot />
  </main>
{/if}
