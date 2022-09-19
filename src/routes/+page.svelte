<script lang="ts">
	import { selectedAccount, connected } from "svelte-web3";
	import { goto } from "$app/navigation";
	import Web3Modal from "$lib/Web3Modal.svelte";

	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	if ($connected && $selectedAccount) {
		goto("/swap");
	}
</script>

<div class="relative bg-gray-50 overflow-hidden h-screen">
	<div
		class="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full"
		aria-hidden="true"
	>
		<div class="relative h-full max-w-7xl mx-auto">
			<svg
				class="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
				width="404"
				height="784"
				fill="none"
				viewBox="0 0 404 784"
			>
				<defs>
					<pattern
						id="f210dbf6-a58d-4871-961e-36d5016a0f49"
						x="0"
						y="0"
						width="20"
						height="20"
						patternUnits="userSpaceOnUse"
					>
						<rect
							x="0"
							y="0"
							width="4"
							height="4"
							class="text-gray-200"
							fill="currentColor"
						/>
					</pattern>
				</defs>
				<rect
					width="404"
					height="784"
					fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
				/>
			</svg>
			<svg
				class="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
				width="404"
				height="784"
				fill="none"
				viewBox="0 0 404 784"
			>
				<defs>
					<pattern
						id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
						x="0"
						y="0"
						width="20"
						height="20"
						patternUnits="userSpaceOnUse"
					>
						<rect
							x="0"
							y="0"
							width="4"
							height="4"
							class="text-gray-200"
							fill="currentColor"
						/>
					</pattern>
				</defs>
				<rect
					width="404"
					height="784"
					fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
				/>
			</svg>
		</div>
	</div>

	<div class="relative pt-6 pb-16 sm:pb-24 h-full">
		<div>
			<div class="max-w-7xl mx-auto px-4 sm:px-6">
				<nav
					class="relative flex items-center justify-between sm:h-10 md:justify-center"
					aria-label="Global"
				>
					<div
						class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0"
					>
						<div class="flex items-center justify-between w-full md:w-auto">
							<a href="/">
								<span class="sr-only">Crypton</span>
								<img class="h-8 w-auto sm:h-10" src="untitled.svg" alt="" />
							</a>
							<div class="-mr-2 flex items-center md:hidden">
								<button
									type="button"
									class="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
									aria-expanded="false"
									on:click={toggleMobileMenu}
								>
									<span class="sr-only">Open main menu</span>
									<!-- Heroicon name: outline/menu -->
									<svg
										class="h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
					<div class="hidden md:flex md:space-x-10">
						<a
							href="#features"
							class="font-medium text-gray-500 hover:text-gray-900">Features</a
						>

						<a
							href="#contactus"
							class="font-medium text-gray-500 hover:text-gray-900"
							>Contact us</a
						>
					</div>
					<div
						class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0"
					>
						<span class="inline-flex rounded-md shadow">
							<Web3Modal
								classes="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
								text="Connect wallet"
							/>
						</span>
					</div>
				</nav>
			</div>

			<!--
        Mobile menu, show/hide based on menu open state.

        Entering: "duration-150 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-100 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      -->
			<div
				class="{mobileMenuOpen
					? ''
					: 'hidden'} absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
			>
				<div
					class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
				>
					<div class="px-5 pt-4 flex items-center justify-between">
						<div>
							<img class="h-8 w-auto" src="untitled.svg" alt="" />
						</div>
						<div class="-mr-2">
							<button
								type="button"
								class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
								on:click={toggleMobileMenu}
							>
								<span class="sr-only">Close menu</span>
								<!-- Heroicon name: outline/x -->
								<svg
									class="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</div>
					<div class="px-2 pt-2 pb-3">
						<a
							href="#features"
							class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							>Features</a
						>

						<a
							href="#contactus"
							class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							>Contact us</a
						>
					</div>
					<div
						class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0"
					>
						<span class="inline-flex rounded-md shadow">
							<Web3Modal
								classes="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
								text="Connect wallet"
							/>
						</span>
					</div>
				</div>
			</div>
		</div>

		<main
			class="max-w-7xl px-4 flex flex-col justify-center h-full text-center"
		>
			<h1
				class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
			>
				<span class="block xl:inline">The best rate for</span>
				<span class="block text-indigo-600 xl:inline">your crypto</span>
			</h1>
			<p
				class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
			>
				Routa compares all the decentralized exchanges to find the best exchange
				rate for your tokens
			</p>
			<div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
				<Web3Modal
					classes="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 rounded-md shadow"
					text="Exchange crypto"
				/>
			</div>
		</main>
	</div>
</div>

<!-- feature section -->
<div id="features" class="py-12 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="lg:text-center">
			<h2
				class="text-base text-indigo-600 font-semibold tracking-wide uppercase"
			>
				Payments
			</h2>
			<p
				class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
			>
				A better way to exchange crypto
			</p>
			<p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
				Never manually compare different exchange's rates again!
			</p>
		</div>

		<div class="mt-10">
			<dl
				class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
			>
				<div class="relative">
					<dt>
						<div
							class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
						>
							<!-- Heroicon name: outline/globe-alt -->
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
								/>
							</svg>
						</div>
						<p class="ml-16 text-lg leading-6 font-medium text-gray-900">
							Routa doesn't take any fees!
						</p>
					</dt>
					<dd class="mt-2 ml-16 text-base text-gray-500">
						we only find the best route to exchange your crypto amongst the existing liquidity providers
					</dd>
				</div>

				<div class="relative">
					<dt>
						<div
							class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
						>
							<!-- Heroicon name: outline/scale -->
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
								/>
							</svg>
						</div>
						<p class="ml-16 text-lg leading-6 font-medium text-gray-900">
							Reduce slippage!
						</p>
					</dt>
					<dd class="mt-2 ml-16 text-base text-gray-500">
						We split your swap against all the liquidity sources to minimize slippage.
					</dd>
				</div>

				<div class="relative">
					<dt>
						<div
							class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
						>
							<!-- Heroicon name: outline/lightning-bolt -->
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<p class="ml-16 text-lg leading-6 font-medium text-gray-900">
							Multichain
						</p>
					</dt>
					<dd class="mt-2 ml-16 text-base text-gray-500">
						Swap any 2 tokens even cross chains!
					</dd>
				</div>

				<div class="relative">
					<dt>
						<div
							class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
						>
							<!-- Heroicon name: outline/annotation -->
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
								/>
							</svg>
						</div>
						<p class="ml-16 text-lg leading-6 font-medium text-gray-900">
							Open source
						</p>
					</dt>
					<dd class="mt-2 ml-16 text-base text-gray-500">
						Support for any new liquidity provider can be added easily.
					</dd>
				</div>
			</dl>
		</div>
	</div>
</div>

<!-- contact us -->

<div id="#contactus" class="bg-white">
	<!-- Header -->
	<div class="relative pb-32 bg-gray-800">
		<div class="absolute inset-0">
			<img
				class="w-full h-full object-cover"
				src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
				alt=""
			/>
			<div
				class="absolute inset-0 bg-gray-800 mix-blend-multiply"
				aria-hidden="true"
			/>
		</div>
		<div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
			<h1
				class="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
			>
				Support
			</h1>
			<p class="mt-6 max-w-3xl text-xl text-gray-300">
				Our team is there if you need anything!
			</p>
		</div>
	</div>

	<!-- Overlapping cards -->
	<section
		class="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
		aria-labelledby="contact-heading"
	>
		<h2 class="sr-only" id="contact-heading">Contact us</h2>
		<div class="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
			<div class="flex flex-col bg-white rounded-2xl shadow-xl">
				<div class="flex-1 relative pt-16 px-6 pb-8 md:px-8">
					<div
						class="absolute top-0 p-5 inline-block bg-indigo-600 rounded-xl shadow-lg transform -translate-y-1/2"
					>
						<!-- Heroicon name: outline/phone -->
						<svg
							class="h-6 w-6 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-medium text-gray-900">Sales</h3>
					<p class="mt-4 text-base text-gray-500">
						For enterprise related features and anything custom, feel free to
						reach out!
					</p>
				</div>
				<div class="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
					<a
						href="mailto: sales@crypton.dev"
						class="text-base font-medium text-indigo-700 hover:text-indigo-600"
						>Contact us<span aria-hidden="true"> &rarr;</span></a
					>
				</div>
			</div>

			<div class="flex flex-col bg-white rounded-2xl shadow-xl">
				<div class="flex-1 relative pt-16 px-6 pb-8 md:px-8">
					<div
						class="absolute top-0 p-5 inline-block bg-indigo-600 rounded-xl shadow-lg transform -translate-y-1/2"
					>
						<!-- Heroicon name: outline/support -->
						<svg
							class="h-6 w-6 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-medium text-gray-900">Technical Support</h3>
					<p class="mt-4 text-base text-gray-500">
						If you have any problem or suggestion, we are looking forward to
						helping you!
					</p>
				</div>
				<div class="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
					<a
						href="mailto: support@crypton.dev"
						class="text-base font-medium text-indigo-700 hover:text-indigo-600"
						>Contact us<span aria-hidden="true"> &rarr;</span></a
					>
				</div>
			</div>

			<div class="flex flex-col bg-white rounded-2xl shadow-xl">
				<div class="flex-1 relative pt-16 px-6 pb-8 md:px-8">
					<div
						class="absolute top-0 p-5 inline-block bg-indigo-600 rounded-xl shadow-lg transform -translate-y-1/2"
					>
						<!-- Heroicon name: outline/newspaper -->
						<svg
							class="h-6 w-6 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
							/>
						</svg>
					</div>
					<h3 class="text-xl font-medium text-gray-900">Media Inquiries</h3>
					<p class="mt-4 text-base text-gray-500">
						For any marketing or press related needs. We are open to
						partnerships. You are welcome to reach out!
					</p>
				</div>
				<div class="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
					<a
						href="mailto: press@crypton.dev"
						class="text-base font-medium text-indigo-700 hover:text-indigo-600"
						>Contact us<span aria-hidden="true"> &rarr;</span></a
					>
				</div>
			</div>
		</div>
	</section>
</div>
