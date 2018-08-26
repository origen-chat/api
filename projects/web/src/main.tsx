/**
 * Entry point of the application.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { initializeAnalytics } from './analytics';
import { Root } from './components';
import { initializeErrorTracking } from './errorTracking';
import './globalStyles';
import { register as registerServiceWorker } from './serviceWorkerRegistration';

export default function startApplication(): void {
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
