<script lang="ts">
	import "../../global.css";
  import Loader from '$lib/Loader.svelte'
  import Nav from '$lib/Nav.svelte'
  import { onMount } from 'svelte';

  let loaded = false

  import { page } from '$app/stores'

  onMount(async () => {
		loaded = true;
	});
</script>

{#if !loaded }
<section class="overflow-x-hidden w-screen relative">
  <Loader />
</section>
{:else}
<div class="grid">
  <nav class="nav">
    <Nav path={$page.url.pathname} />
  </nav>

  <main class="main h-full">
    <slot />
  </main>
  
</div>
{/if}

<style>
  /* minmax on the nav is used for expansion on mobile */
  /* minmax on the main is used for long main content */
  .grid {
    display: grid;
    grid-template-rows: 10vh minmax(90vh, auto);
    grid-template-areas:
      'nav'
      'main'
  }
  
  .nav {
    grid-area: nav;
  }

  .main {
    grid-area: main;
  }
  
</style>
