<script lang="ts">
  import { sourceTokenAmount, sourceToken } from "$lib/stores"
  let errorMessage: undefined | string;
</script>

<div>
  <div class="flex justify-between">
    <label for="inputAmount" class="block text-sm font-medium text-gray-700"
      >You send {$sourceToken && $sourceToken.symbol}</label
    >
  </div>
  <div class="relative mt-1 rounded-md shadow-sm">
    <input
      type="number"
      name="inputAmount"
      id="inputAmount"
      required
      class="{errorMessage
        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
        : ''} block w-full rounded-md focus:outline-none sm:text-sm"
      placeholder="1"
      min="0"
      step="0.0000000000000000001"
      bind:value={$sourceTokenAmount}
      aria-invalid="true"
      aria-describedby="inputAmount-error"
    />
    <div
      class="{errorMessage
        ? 'flex'
        : 'hidden'} pointer-events-none absolute inset-y-0 right-0 items-center pr-3"
    >
      <!-- Heroicon name: mini/exclamation-circle -->
      <svg
        class="h-5 w-5 text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
  <p
    class="{errorMessage ? 'block' : 'hidden'} mt-2 text-sm text-red-600"
    id="email-error"
  >
    Your password must be less than 4 characters.
  </p>
</div>
