import { Hyphen, SIGNATURE_TYPES } from "@biconomy/hyphen";

export class BiconomyHyphen {
  private hyphen: any;
  constructor(provider: any, onFundsTransfered: () => void) {
    console.log("building hyphen");
    this.hyphen = new Hyphen(provider, {
      debug: true,
      environment: "prod",
      onFundsTransfered,
    })
    console.log(this.hyphen)
  }
  async init(): Promise<void> {
    try {
      await this.hyphen.init()
      console.log(this.hyphen)
    } catch (error) {
      console.log(error)
    }
  }
  
  async previewTransfer({sourceTokenAddress, sourceTokenAmount, sourceChainId, destinationChainId, sourceAccount}: {sourceTokenAddress: string, sourceTokenAmount: number, sourceChainId: number, destinationChainId: number, sourceAccount: string}): Promise<any> {
    return await this.hyphen.depositManager.preDepositStatus({
      tokenAddress: sourceTokenAddress,
      amount: sourceTokenAmount,
      fromChainId: sourceChainId,
      toChaintid: destinationChainId,
      userAddress: sourceAccount,
    })
  } 
}