/* tslint:disable:no-console */

/**
 * In production, we register a service worker to serve assets from local cache.
 *
 * This lets the app load faster on subsequent visits in production, and gives
 * it offline capabilities. However, it also means that developers (and users)
 * will only see deployed updates on the "N+1" visit to a page, since previously
 * cached resources are updated in the background.
 *
 * To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
 * This link also includes instructions on opting out of this behavior.
 */

import { isProductionEnvironment } from './helpers';

export type Config = {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
};

const isLocalhost = !!(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/,
  )
);

export function register(config?: Config): void {
  if (!isProductionEnvironment || !('serviceWorker' in navigator)) {
    return;
  }

  const publicUrl = new URL(
    process.env.PUBLIC_URL!,
    window.location.toString(),
  );

  if (publicUrl.origin !== window.location.origin) {
    // Our service worker won't work if PUBLIC_URL is on a different origin
    // from what our page is served on. This might happen if a CDN is used to
    // serve assets; see https://github.com/facebook/create-react-app/issues/2374.
    return;
  }

  window.addEventListener(
    'load',
    async (): Promise<void> => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost.
        // Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost,
        // pointing developers to the
        // service worker/PWA documentation.
        await navigator.serviceWorker.ready;
        console.info(
          'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://goo.gl/SC7cgQ.',
        );
      } else {
        // Is not local host. Just register service worker.
        registerValidSW(swUrl, config);
      }
    },
  );
}

async function registerValidSW(swUrl: string, config?: Config): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;

      if (installingWorker === null) {
        return;
      }

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // At this point, the old content will have been purged and
            // the fresh content will have been added to the cache.
            // It's the perfect time to display a "New content is
            // available; please refresh." message in your web app.

            if (config && config.onUpdate) {
              config.onUpdate(registration);
            }
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.

            if (config && config.onSuccess) {
              config.onSuccess(registration);
            }
          }
        }
      };
    };
  } catch (error) {
    // Error during service worker registration.
  }
}

async function checkValidServiceWorker(
  swUrl: string,
  config?: Config,
): Promise<void> {
  try {
    // Check if the service worker can be found. If it can't reload the page.
    const response = await fetch(swUrl);
    // Ensure service worker exists, and that we really are getting a JS file.
    if (isStatus404(response) || !isContentTypeHeaderOfJavaScript(response)) {
      // No service worker found. Probably a different app. Reload the page.
      unregisterAndReload();
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl, config);
    }
  } catch (e) {
    // No internet connection found. App is running in offline mode.
  }
}

function isStatus404(response: Response): boolean {
  return response.status === 404;
}

function isContentTypeHeaderOfJavaScript(response: Response): boolean {
  const contentType = response.headers.get('content-type');

  if (!contentType) {
    return false;
  }

  return contentType.includes('javascript');
}

async function unregisterAndReload(): Promise<void> {
  const registration = await navigator.serviceWorker.ready;

  await registration.unregister();
  window.location.reload();
}

export async function unregister(): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  registration.unregister();
}
