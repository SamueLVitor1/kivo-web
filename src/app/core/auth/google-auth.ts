import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    google?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  private scriptLoaded = false;

  constructor(private zone: NgZone) {}

  loadScript(): Promise<void> {
    if (this.scriptLoaded) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => { this.scriptLoaded = true; resolve(); };
      script.onerror = () => reject('Erro ao carregar script Google');
      document.head.appendChild(script);
    });
  }

  async renderButton(container: HTMLElement, callback: (response: any) => void) {
    await this.loadScript();

    window.google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (resp: any) => {
        this.zone.run(() => callback(resp));
      },
      ux_mode: 'popup',
    });

    window.google.accounts.id.renderButton(container, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'rectangular',
      width: 300,
    });
  }
}
