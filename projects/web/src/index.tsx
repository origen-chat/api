/**
 * Entry point of the application.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import './globalStyles';

import { initializeAnalytics } from './analytics';
import Root from './components/Root';
import { initializeErrorTracking } from './errorTracking';
import { register as registerServiceWorker } from './serviceWorkerRegistration';

main();

function main(): void {
  initializeAnalytics();
  initializeErrorTracking();

  render();

  registerServiceWorker();
}

function render(): void {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('#root element not found');
  }

  const rootReactElement = <Root />;

  ReactDOM.render(rootReactElement, rootElement);
}
