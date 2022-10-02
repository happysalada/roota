<script>
  import { defaultEvmStores, web3, connected } from "svelte-web3";
  import { goto } from "$app/navigation";
  import Web3Modal from "web3modal";
  import { variables } from "$lib/variables";
  // import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
  // const WalletConnectProvider = window.WalletConnectProvider.default;
  import WalletConnectProvider from "@walletconnect/web3-provider";
  const disable = () => defaultEvmStores.disconnect();

  let web3Modal;

  // you might like this trick
  let userClass = "";
  export { userClass as class };
  export let text = "";

  console.debug(`$web3 :>> `, $web3);

  const enable = async () => {
    console.debug(`WalletConnectProvider :>> `, WalletConnectProvider);
    if (web3Modal) web3Modal.clearCachedProvider();
    web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: { infuraId: variables.infuraId },
        },
        // coinbasewallet: {
        //   package: CoinbaseWalletSDK,
        //   options: {
        //     appName: "crypton",
        //     infuraId: "7b305244a8dc444f9cdd411c1a0b10cf"
        //   }
        // },
      },
      disableInjectedProvider: false,
    });
    const provider = await web3Modal.connect();
    defaultEvmStores.setProvider(provider);
  };

  const login = async () => {
    goto("/swap");
  };

  $: if ($connected && $web3) login();
</script>

{#if $web3.version}
  {#if $connected}
    <button
      class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
      on:click={disable}>Logout</button
    >
  {:else}
    <button class={userClass} on:click={enable}>{text}</button>
  {/if}
{/if}
