/// <reference types="vite/client" />

interface ImportMetaEnv {
  // more env variables...
  readonly VITE_BACKEND_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
