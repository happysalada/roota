<script lang="ts">
  import { destinationTokenAmount, destinationToken } from "$lib/stores"
</script>

<div>
  <div class="flex justify-between">
    <label for="email" class="block text-sm font-medium text-gray-700"
      >You receive {$destinationToken && $destinationToken.symbol}</label
    >
  </div>
  <div class="mt-1">
    <input
      type="number"
      name="outputAmount"
      id="outputAmount"
      disabled
      bind:value={$destinationTokenAmount}
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
    />
  </div>
</div>
