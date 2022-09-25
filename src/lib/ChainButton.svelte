<script lang="ts">
  import { getChainData } from "$lib/helpers";

  export let onClick: any;
  export let chainId: number;

  const backGroundColor = (chainId: number) => {
    switch (chainId) {
      case 1: // Ethereum
        return "bg-slate-600"; 
      case 10: // Optimism
        return "bg-red-600"; 
      case 137: // Polygon
        return "bg-violet-600"; 
      case 42161: // Arbitrum
        return "bg-blue-600"; 
      default:
        return "bg-indigo-600"
    }
  }

  const hoverColor = (chainId: number) => {
    switch (chainId) {
      case 1: // Ethereum
        return "bg-slate-600"; 
      case 10: // Optimism
        return "bg-red-600"; 
      case 137: // Polygon
        return "bg-violet-600"; 
      case 42161: // Arbitrum
        return "bg-blue-600"; 
      default:
        return "bg-indigo-600"
    }
  }

  const ringColor = (chainId: number) => {
    switch (chainId) {
      case 1: // Ethereum
        return "ring-slate-500"; 
      case 10: // Optimism
        return "ring-red-500"; 
      case 137: // Polygon
        return "ring-violet-500"; 
      case 42161: // Arbitrum
        return "ring-blue-500"; 
      default:
        return "ring-indigo-500"
    }
  }
</script>
<button
  type="button"
  class="
    flex items-center rounded-full border border-transparent {backGroundColor(chainId)}
    px-3 lg:px-6 py-3 text-base font-medium text-white shadow-sm hover:{hoverColor(chainId)}
    focus:outline-none focus:ring-2 focus:{ringColor(chainId)} focus:ring-offset-2
  "
  on:click={onClick}
>
  <img
    class="h-8 w-8 rounded-full"
    src={getChainData(chainId).assetSrc || ""}
    alt=""
  />
  <span class="px-4 hidden md:block">{getChainData(chainId).name || ""} </span>
</button>
