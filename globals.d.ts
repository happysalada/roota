/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />


interface ImportMetaEnv {
	VITE_INFURA_ID: string;
}

export type ChainData = {
	name: string,
	chain: string
	rpc: string[],
	faucets: [],
	nativeCurrency: { name: string, symbol: string, decimals: number },
	infoURL: string,
	shortName: string,
	chainId: number,
	networkId: number,
	slip44: number | undefined,
	explorers: Explorer[],
	// added properties
	assetSrc: string,
	color: string | undefined,
};

export type Explorer = {
	name: string,
	url: string,
	standard: string,
};

export type TokenData = {
	chainId: number,
	decimals: number,
	name: string,
	symbol: string,
	address: string,
	logoURI: string,
	extensions: {
		bridgeInfo: {
			[key: number]: {
				tokenAddress: string,
			}
		}
	}
}
