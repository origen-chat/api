/**
 * Entry point of the application.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { initializeAnalytics } from './analytics';
import { Root } from './components';
import { initializeErrorTracking } from './errorTracking';
import { register as registerServiceWorker } from './serviceWorkerRegistration';

export function startApplication(): void {
  initializeAnalytics();
  initializeErrorTracking();

  render();

  registerServiceWorker();
}

function render(): void {
  const rootElementId = 'root';
  const rootElement = document.getElementById(rootElementId);

  if (!rootElement) {
    throw new Error(`#${rootElementId} element not found`);
  }

  const rootReactElement = <Root />;

  ReactDOM.render(rootReactElement, rootElement);
}
