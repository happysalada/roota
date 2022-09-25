import { derived, writable } from 'svelte/store';
import { chainData, web3, makeEvmStores, selectedAccount } from "svelte-web3";
import abi from 'human-standard-token-abi'
import { asyncable } from "svelte-asyncable";
import type { Writable, Readable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Contract } from "web3-eth-contract"
import Big from "big.js";

import type { TokenData } from 'globals';
import { chains } from "$lib/chains";
// import { BiconomyHyphen } from "$lib/exchanges/hyphen"

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

export const exchanges = asyncable(async ($web3, $sourceTokenAddress, $sourceTokenAmount, $sourceChainId, _$destinationTokenAddress, $destinationChainId, $account) => {
  let exchanges = [];
  if ($web3) {
    // console.log($web3);
    // let hyphen = new BiconomyHyphen($web3, () => {});
    // await hyphen.init();
    // let confirmation = await hyphen.previewTransfer({sourceTokenAddress: $sourceTokenAddress, sourceTokenAmount: $sourceTokenAmount, sourceChainId: $sourceChainId, destinationChainId: $destinationChainId, sourceAccount: $account});
    // console.log(confirmation);
    // exchanges = [confirmation];
    return [{
      name: "multichain",
      logoSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAscAAAByCAYAAAC/bnzBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYyMTM2QTlDNThDMTExRUNCOEUxRjY3RUE2MzM4MkU5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYyMTM2QTlENThDMTExRUNCOEUxRjY3RUE2MzM4MkU5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjIxMzZBOUE1OEMxMTFFQ0I4RTFGNjdFQTYzMzgyRTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjIxMzZBOUI1OEMxMTFFQ0I4RTFGNjdFQTYzMzgyRTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5LkJZfAAAYO0lEQVR42uyd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",
      feePerHundred: Big(0),
      gasFee: Big(1),
      minimumAmount: Big(12),
      estimatedTime: "10-30 min",
      totalFee: Big(0),
    },{
      name: "across",
      logoSrc: "",
      feePerHundred: Big(0.105),
      gasFee: Big(0.00264),
      minimumAmount: Big(0),
      estimatedTime: "3-6 min",
      totalFee: Big(0),
    },{
      name: "hyphen",
      logoSrc: "https://hyphen.biconomy.io/hyphen-logo.svg",
      feePerHundred: Big(0.0443),
      gasFee: Big(0.00137),
      minimumAmount: Big(10),
      estimatedTime: "10-15 min",
      totalFee: Big(0),
    }].map(exchange => {
      exchange.totalFee = Big($sourceTokenAmount).div(Big(100)).mul(exchange.feePerHundred).add(exchange.gasFee)
      return exchange
    })
    .filter(exchange => Big($sourceTokenAmount).gte(Big(exchange.minimumAmount)))
    .sort((a, b) => a.totalFee.minus(b.totalFee).toNumber())
  }
  return exchanges
}, [], [web3, sourceTokenAddress, sourceTokenAmount, sourceChainId, selectedAccount, destinationChainId, selectedAccount])

