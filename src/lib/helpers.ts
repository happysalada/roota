import { chains } from "$lib/chains"
import type { ChainData, TokenData } from "globals"
import Big from 'big.js';
import type {Big as BigType} from "@types/big.js"

export const getChainData = (desiredChainId: number): ChainData => chains[desiredChainId] || chains[1]

export const balanceToUnits = (balance: number, decimals: number): BigType => Big(balance).mul(Big(10).pow(-decimals))

export const defaultToken = (tokenList: TokenData[]): TokenData | undefined => {
  return tokenList.find(({symbol}) => symbol == "USDC") || tokenList[1]
}