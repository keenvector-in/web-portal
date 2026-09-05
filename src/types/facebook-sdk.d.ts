export {};

interface FacebookLoginResponse {
  authResponse: { code?: string } | null;
}

interface FacebookSdk {
  init(options: { appId: string; xfbml: boolean; version: string }): void;
  login(
    callback: (response: FacebookLoginResponse) => void,
    options: { config_id: string; response_type: string; override_default_response_type: boolean },
  ): void;
}

declare global {
  interface Window {
    FB?: FacebookSdk;
    fbAsyncInit?: () => void;
  }
}
