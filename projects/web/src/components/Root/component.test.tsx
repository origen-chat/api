import { shallow } from 'enzyme';
import React from 'react';

import Root from './component';

describe('<Root />', () => {
  test('renders without crashing', () => {
    shallow(<Root />);
  });
});
