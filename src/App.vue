<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <router-link class="nav-link px-2 text-white" to="/"
              >Home
            </router-link>
          </li>

          <li>
            <router-link class="nav-link px-2 text-white" to="/about"
              >About
            </router-link>
          </li>
        </ul>

        <div class="text-end">
          <button
            type="button"
            id="btnConnectWallet"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :disabled="connectWalletLoading"
            class="btn btn-outline-light me-2 dropdown-toggle d-inline-block text-truncate"
            style="max-width: 200px"
          >
            <i class="bi bi-link"></i>

            {{ isWalletConnected ? adressList[0] : "Connect Wallet" }}
          </button>

          <ul class="dropdown-menu" aria-labelledby="btnConnectWallet">
            <li>
              <button
                v-if="hasMetaMask"
                @click="useMetaMask"
                class="dropdown-item"
                type="button"
              >
                MetaMask
              </button>
            </li>
            <li>
              <button
                @click="useConnectWallet"
                class="dropdown-item"
                type="button"
              >
                WalletConnect
              </button>
            </li>
            <li>
              <button @click="useFortmatic" class="dropdown-item" type="button">
                Fortmatic
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, isRef, provide, ref, Ref } from "vue";
import Fortmatic from "fortmatic";
import { abi, networks } from "./contracts/SimpleStorage.json";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { FmProvider } from "fortmatic/dist/cjs/src/core/fm-provider";
import { providerKey } from "./injectionKeys";
import { isWalletConnectedKey } from "@/injectionKeys";

interface NetWorks {
  [key: string]: NetWork;
}

interface NetWork {
  events: { [key: string]: string };

  links: { [key: string]: string };
  address: string;

  transactionHash: string;
}

export default defineComponent({
  name: "App",
  setup() {
    const provider = ref(
      new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
    );
    const isWalletConnected = ref(false);
    provide(providerKey, provider);
    provide(isWalletConnectedKey, isWalletConnected);
    return { provider, isWalletConnected };
  },
  data() {
    return {
      hasMetaMask: window.ethereum !== undefined,
      connectWalletLoading: false,
      adressList: [] as string[],
    };
  },
  methods: {
    async updateAdressList() {
      if (!this.provider)
        throw new Error(`Could not resolve ${providerKey.description}`);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.adressList = await this.provider.listAccounts();
    },
    async useMetaMask() {
      this.connectWalletLoading = true;
      try {
        await window.ethereum.request?.({
          method: "eth_requestAccounts",
        });
      } catch (error) {
        this.connectWalletLoading = false;
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      await this.updateAdressList();
      this.connectWalletLoading = false;
      this.isWalletConnected = true;
    },
    async useWalletConnect() {
      this.connectWalletLoading = true;
      const wc = new WalletConnectProvider({
        infuraId: "2d13e4d632c14e9890df636ad85856fa",
      });
      await wc.enable();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.provider = new ethers.providers.Web3Provider(wc);
      await this.updateAdressList();
      this.isWalletConnected = true;
      this.connectWalletLoading = false;

      /*
      const address = await this.web3.listAccounts();
      console.log(address);*/
      /*     const signer = web3.getSigner();
     console.log(web3);
     const ethNetwork = await web3.getNetwork();
     console.log(ethNetwork);
     const contract = new ethers.Contract(
       (networks as NetWorks)[ethNetwork.chainId].address,
       abi
     );
     const provider = contract.connect(signer);
     await provider.get();
     */
    },
    async useFortmatic() {
      console.log(this.provider);
      this.connectWalletLoading = true;
      const fortmatic = new Fortmatic("pk_test_2F570F735CF2E221");
      console.log(await fortmatic.getProvider().enable());
      this.provider = new ethers.providers.Web3Provider(
        fortmatic.getProvider() as unknown as ethers.providers.JsonRpcFetchFunc
      );
      console.log(this.provider.getSigner());
      await this.updateAdressList();
      this.connectWalletLoading = false;

      this.isWalletConnected = true;
    },
  },
});
</script>
