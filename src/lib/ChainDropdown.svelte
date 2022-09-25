<script lang="ts">
  import { clickOutside } from "svelte-use-click-outside";

  import ChainButton from "./ChainButton.svelte";
  import { chains } from "$lib/chains";

  let chainDropdownMenuOpen = false;
  export let onDropdownClick: (chainId: number) => void;
  export let selectedChainId = 1;

  function toggleChainDropdownMenu() {
    chainDropdownMenuOpen = !chainDropdownMenuOpen;
  }
</script>

<div
  class="min-w-[75px]"
  use:clickOutside={() => (chainDropdownMenuOpen = false)}
>
  <div class="flex items-center sm:static ">
    <!-- Chain dropdown -->
    <div class="relative">
      <ChainButton
        chainId={selectedChainId}
        onClick={toggleChainDropdownMenu}
      />

      <!--
        Dropdown menu, show/hide based on menu state.

        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      -->
      <div
        class="{chainDropdownMenuOpen
          ? ''
          : 'hidden'} absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        {#each Object.values(chains) as { assetSrc, name, chainId }}

          <button
            class="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabindex="-1"
            id="user-menu-item-0"
            on:click={() => {
              onDropdownClick(chainId);
              chainDropdownMenuOpen = false;
            }}
          >
            <div class="flex">
              <img class="h-8 w-8 rounded-full" src={assetSrc || ""} alt="" />
              <p class="m-auto">{name}</p>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
