/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SPC_CONTRACT_ADDRESS: string;
  readonly VITE_SALES_WALLET: string;
  readonly VITE_BSC_CHAIN_ID_HEX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
