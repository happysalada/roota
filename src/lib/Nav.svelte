<script lang="ts">
	import { web3, chainData, walletType } from "svelte-web3";
	import { chains } from "$lib/chains";
	import { getChainData } from "$lib/helpers";

	export let path: string;
	let mobileMenuOpen = false;
	let dropdownMenuOpen = false;
	let chainDropdownMenuOpen = false;
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	function toggleDropdownMenu() {
		dropdownMenuOpen = !dropdownMenuOpen;
	}
	function toggleChainDropdownMenu() {
		chainDropdownMenuOpen = !chainDropdownMenuOpen;
	}
	
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
		chainDropdownMenuOpen = false;
	}

	$: src =
		$walletType && $walletType.toLowerCase().includes("metamask")
			? "/metamask-fox.svg"
			: "";
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-gray-800 h-full">
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-full">
		<div class="relative flex items-center justify-between h-full">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={toggleMobileMenu}
				>
					<span class="sr-only">Open main menu</span>
					<!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
					<svg
						class="{mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
					<svg
						class="{mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div
				class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
			>
				<div class="flex-shrink-0 flex items-center">
					<img
						class="block lg:hidden h-8 w-auto"
						src="untitled.svg"
						alt="Crypton"
					/>
					<img
						class="hidden lg:block h-8 w-auto"
						src="untitled.svg"
						alt="Crypton"
					/>
				</div>
				<div class="hidden sm:block sm:ml-6">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<a
							href="/"
							class="{path === '/settings'
								? 'nav-active'
								: 'nav-inactive'} nav-default">Settings</a
						>
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<!-- Chain dropdown -->
				<div class="ml-3 relative">
					<div>
						<button
							type="button"
							class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
							on:click={toggleChainDropdownMenu}
						>
							<span class="sr-only">Open user menu</span>
							<img
								class="h-8 w-8 rounded-full"
								src={getChainData($chainData?.chainId).assetSrc || ""}
								alt=""
							/>
						</button>
					</div>

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
							: 'hidden'} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
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
								on:click={() => switchNetwork(chainId)}
							>
								<div class="flex">
									<img
										class="h-8 w-8 rounded-full"
										src={assetSrc || ""}
										alt=""
									/>
									<p class="m-auto">{name}</p>
								</div>
							</button>
						{/each}
					</div>
				</div>

				<!-- Profile dropdown -->
				<div class="ml-3 relative">
					<div>
						<button
							type="button"
							class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
							on:click={toggleDropdownMenu}
						>
							<span class="sr-only">Open user menu</span>
							<img class="h-8 w-8 rounded-full" {src} alt="" />
						</button>
					</div>

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
						class="{dropdownMenuOpen
							? ''
							: 'hidden'} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="user-menu-button"
						tabindex="-1"
					>
						<!-- Active: "bg-gray-100", Not Active: "" -->
						<a
							href="/"
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="user-menu-item-0">Your Profile</a
						>
						<a
							href="/"
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="user-menu-item-1">Settings</a
						>
						<a
							href="/"
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="user-menu-item-2">Sign out</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="{mobileMenuOpen ? '' : 'hidden'} sm:hidden" id="mobile-menu">
		<div class="px-2 pt-2 pb-3 space-y-1">
			<a
				href="/"
				class="{path === '/settings'
					? 'nav-active'
					: 'nav-inactive'} nav-default block">Settings</a
			>
		</div>
	</div>
</nav>

<style>
	.nav-default {
		@apply text-gray-300 px-3 py-2 rounded-md text-sm font-medium;
	}

	.nav-default:hover {
		@apply bg-gray-700 text-white;
	}

	.nav-active {
		@apply bg-gray-900 text-white;
	}

	.nav-inactive {
		@apply text-gray-300;
	}

	.nav-inactive:hover {
		@apply bg-gray-700 text-white;
	}
</style>
