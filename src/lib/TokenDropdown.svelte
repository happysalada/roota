<script lang="ts">
  import { clickOutside } from "svelte-use-click-outside";
  
  import TokenButton from "$lib/TokenButton.svelte";
  import { defaultToken } from "$lib/helpers";

  import type { TokenData } from "globals";

  let chainDropdownMenuOpen = false;
  export let onDropdownClick: (token: TokenData) => void;
  export let tokenList: TokenData[] = [];
  export let selectedToken = defaultToken(tokenList);

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
      <TokenButton
        token={selectedToken}
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
          : 'hidden'} absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white
          ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        {#each tokenList as token, id}
          <button
            class="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-neutral-300"
            role="menuitem"
            tabindex="-1"
            id="user-menu-item-{id}"
            on:click={() => {
              onDropdownClick(token);
              chainDropdownMenuOpen = false;
            }}
          >
            <div class="flex">
              <img class="h-8 w-8 rounded-full" src={token.logoURI || ""} alt="" />
              <p class="m-4 my-auto">{token.name}</p>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
