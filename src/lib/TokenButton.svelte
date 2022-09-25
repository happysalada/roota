<script lang="ts">
  import type { TokenData } from "globals";

  export let onClick: any;
  export let token: TokenData | undefined;
</script>
<button
  type="button"
  class="
    flex items-center rounded-full border border-transparent bg-neutral-500
    px-3 lg:px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-700
    focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
  "
  on:click={onClick}
>
  <img
    class="h-8 w-8 rounded-full"
    src={token?.logoURI || ""}
    alt=""
  />
  <span class="px-4 hidden md:block">{token?.symbol || ""} </span>
</button>
