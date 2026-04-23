interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_RESOURCES_URL: string;
    readonly VITE_API_AUTH_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}