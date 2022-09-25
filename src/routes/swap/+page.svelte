<script lang="ts">
  import { selectedAccount, chainData, connected, web3 } from "svelte-web3";

  import { goto } from "$app/navigation";

  import ChainDropdown from "$lib/ChainDropdown.svelte";
  import TokenDropdown from "$lib/TokenDropdown.svelte";
  import FromToButton from "$lib/FromToButton.svelte";
  import TokenAmountInput from "$lib/TokenAmountInput.svelte";
  import TokenAmountOutput from "$lib/TokenAmountOutput.svelte";
  import { getChainData, balanceToUnits, defaultToken } from "$lib/helpers";
  import {
    sourceChainId,
    sourceToken,
    sourceTokenAmount,
    sourceTokenList,
    sourceTokenBalance,
    destinationChainId,
    destinationToken,
    destinationTokenAmount,
    destinationTokenBalance,
    destinationTokenList,
    destinationWeb3,
  } from "$lib/stores";

  if (!$connected || !$selectedAccount) {
    goto("/");
  }

  sourceTokenList.subscribe(async (list) => {
    const tokenList = await list;
    sourceToken.set(defaultToken(tokenList));
  });
  destinationTokenList.subscribe(async (list) => {
    const tokenList = await list;
    destinationToken.set(defaultToken(tokenList));
  });

  async function switchNetwork(chainId: number) {
    if ($chainData.chainId !== chainId) {
      try {
        await $web3?.eth?.currentProvider?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: $web3.utils.toHex(chainId) }],
        });
      } catch (err: any) {
        console.log(err);
        const chain = getChainData(chainId);

        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await $web3?.eth?.currentProvider?.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: chain.name,
                chainId: $web3.utils.toHex(chainId),
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: chain.rpc,
              },
            ],
          });
        }
      }
    }
  }
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white shadow sm:rounded-3xl">
  <div class="md:px-4 py-5 sm:px-6 text-center">
    <h3 class="text-lg font-medium leading-6 text-gray-900">Swap tokens</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
      From any chain, to any chain.
    </p>
  </div>
  <div class="border-t border-gray-200">
    <dl>
      <div
        class="bg-gray-100 px-4 py-5 flex justify-around w-full items-center"
      >
        <ChainDropdown
          onDropdownClick={switchNetwork}
          selectedChainId={$sourceChainId}
        />

        <FromToButton />

        <ChainDropdown
          onDropdownClick={(chainId) => destinationChainId.set(chainId)}
          selectedChainId={$destinationChainId}
        />
      </div>

      <div class="bg-white px-4 py-5 flex justify-around w-full items-center">
        {#await Promise.all([$sourceTokenList, $sourceTokenBalance])}
          <p>Loading ...</p>
        {:then [sourceTokenList, sourceTokenBalance]}
          <div>
            <TokenDropdown
              selectedToken={$sourceToken}
              onDropdownClick={(token) => sourceToken.set(token)}
              tokenList={sourceTokenList}
            />

            <div class="flex justify-between">
              <p class="text-sm text-gray-500">
                Balance: {($sourceToken &&
                  balanceToUnits(
                    sourceTokenBalance,
                    $sourceToken.decimals
                  ).toFixed(2)) ||
                  0}
              </p>
              <span
                class="ml-2 text-sm text-indigo-500 cursor-pointer"
                on:click={() =>
                  $sourceToken &&
                  sourceTokenAmount.set(
                    balanceToUnits(
                      sourceTokenBalance,
                      $sourceToken.decimals
                    ).toNumber()
                  )}>MAX</span
              >
            </div>
          </div>
        {:catch error}
          <p>{error}</p>
        {/await}

        <FromToButton />

        {#await $destinationTokenList}
          <p>Loading ...</p>
        {:then destinationTokenList}
          <div>
            <TokenDropdown
              selectedToken={$destinationToken}
              onDropdownClick={(token) => destinationToken.set(token)}
              tokenList={destinationTokenList}
            />

            {#await $destinationTokenBalance}
              <p>Loading ...</p>
            {:then destinationTokenBalance}
              <p class="text-sm text-gray-500">
                Balance: {($destinationToken &&
                  balanceToUnits(
                    destinationTokenBalance,
                    $destinationToken.decimals
                  ).toFixed(2)) ||
                  0}
              </p>
            {:catch error}
              <p>{error}</p>
            {/await}
          </div>
        {:catch error}
          <p>{error}</p>
        {/await}
      </div>
      <div
        class="bg-gray-100 px-4 py-5 flex justify-around w-full items-center"
      >
        <TokenAmountInput />

        <FromToButton />

        <TokenAmountOutput />
      </div>
      <div class="bg-white px-4 py-5 text-center">
        <button
          type="button"
          class="inline-flex items-center rounded-full border border-transparent
          bg-pink-600 px-6 py-3 text-lg font-medium text-white shadow-sm
          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
          focus:ring-offset-2"
        >
          Swap

          <svg
            class="ml-3 -mr-1 w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        </button>
      </div>
      <div class="bg-gray-100 px-4 py-5 text-center">
        <p>Transaction costs: 1 Gwei</p>
      </div>
    </dl>
  </div>
</div>
