/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CASE_STUDY_PASSWORD_HASH?: string
  readonly VITE_ACCESS_REQUEST_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
