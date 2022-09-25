import { derived, writable } from 'svelte/store';
import { chainData, web3, makeEvmStores, selectedAccount } from "svelte-web3";
import abi from 'human-standard-token-abi'
import { asyncable } from "svelte-asyncable";

import type { Writable, Readable } from 'svelte/store';
import { browser } from '$app/environment';
import type { TokenData } from 'globals';
import type { Contract } from "web3-eth-contract"

import { chains } from "$lib/chains";

const CACHE_EXPIRY = 60 * 60 * 24 * 7 // one week in seconds


export const tokenList = asyncable(() => {
  // Svelte will try to run this script with SSR, not in the browser
  // where localStorage is undefined.
  if (!browser) {
    return []
  }
  //get cached data from local storage
  let cache = localStorage.getItem('tokens');
  if (cache) {
    const { data, createdAt } = JSON.parse(cache);
    const expired = (Date.now() / 1000) - createdAt > CACHE_EXPIRY;
    //If cached data available and not expired return them. 
    if (data && !expired) {
      return data
    } else {
      return fetchStoreTokens(localStorage)
    }
  } else {
    return fetchStoreTokens(localStorage)
  }
})

const fetchStoreTokens = async (localStorage: any) => {
  const res = await fetch("https://gateway.ipfs.io/ipns/tokens.uniswap.org");
  const { tokens } = await res.json();
  const json = { data: tokens, createdAt: Date.now() / 1000 }
  localStorage.setItem('tokens', JSON.stringify(json));
  return tokens;
}

export const sourceTokenAmount = writable(0);
export const sourceChainId: Readable<number> = derived(chainData, $chainData => $chainData.chainId, 1)
export const sourceTokenList = asyncable(async ($tokenList, $targetChainId) => {
  const tokenList: TokenData[] = await $tokenList;
  return tokenList.filter(({ chainId }: { chainId: number }) => chainId == $targetChainId)
}, [],
  [tokenList, sourceChainId]);
export const sourceToken: Writable<undefined | TokenData> = writable(undefined);
export const sourceTokenAddress: Readable<undefined | string> = derived(sourceToken, ($sourceToken) => $sourceToken?.address, undefined)
export const sourceTokenContract: Readable<undefined | Contract> = derived([web3, sourceTokenAddress], ([$web3, $sourceTokenAddress]) => $sourceTokenAddress && new $web3.eth.Contract(abi, $sourceTokenAddress));
export const sourceTokenBalance = asyncable(async ($contract, $account) => {
  if ($contract && $account) {
    try {
      return $contract.methods
        ?.balanceOf($account)
        ?.call() || 0
    } catch (error) {
      console.log(error);
    }
  }
  return 0
}, 0, [sourceTokenContract, selectedAccount]);

export const destinationTokenAmount = writable(0);
export const destinationChainId: Writable<number> = writable(137); // Polygon
export const destinationTokenList = asyncable(async ($tokenList, $targetChainId) => {
  const tokenList: TokenData[] = await $tokenList;
  return tokenList.filter(({ chainId }: { chainId: number }) => chainId == $targetChainId)
}, [],
  [tokenList, destinationChainId]);
export const destinationToken: Writable<undefined | TokenData> = writable(undefined);
export const destinationTokenAddress: Readable<undefined | string> = derived(destinationToken, ($destinationToken) => $destinationToken?.address, undefined)
export const destinationWeb3 = asyncable(async ($destinationChainId: number) => {
  let newStore = makeEvmStores($destinationChainId.toString());
  let chainData = chains[$destinationChainId] || chains[1];
  await newStore.setProvider(chainData.rpc[0]);
  return newStore.web3;
}, undefined, [destinationChainId]);
export const destinationTokenContract = asyncable(async ($web3, $tokenAddress) => {
  let contract;
  const web3Store = await $web3;
  web3Store.subscribe(web3 => {
    if ($tokenAddress && web3) {
      contract = new web3.eth.Contract(abi, $tokenAddress)
    }
  })
  return contract
}
  , undefined,
  [destinationWeb3, destinationTokenAddress],
);
export const destinationTokenBalance = asyncable(async ($contract, $account) => {
  const contract = await $contract;
  if (contract && $account) {
    try {
      return contract.methods
        ?.balanceOf($account)
        ?.call() || 0
    } catch (error) {
      console.log(error);
    }
  }
  return 0
}, 0, [destinationTokenContract, selectedAccount]);

