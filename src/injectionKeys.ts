import { ethers } from "ethers";
import { InjectionKey, Ref } from "vue";

export const providerKey: InjectionKey<
  Ref<ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider>
> = Symbol("provider");
export const isWalletConnectedKey: InjectionKey<Ref<boolean>> =
  Symbol("isWalletConnected");
export const canvasKey: InjectionKey<Ref<Array<string>>> = Symbol("canvas");
