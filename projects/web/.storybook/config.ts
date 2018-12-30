import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure } from '@storybook/react';
import React from 'react';

import GlobalStyle from '../src/components/App/GlobalStyle';

addDecorator(checkA11y);
addDecorator(withKnobs);

addDecorator(storyFn =>
  React.createElement(
    React.Fragment,
    null,
    React.createElement(GlobalStyle, null, null),
    React.createElement('div', null, storyFn()),
  ),
);

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
