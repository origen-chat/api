import { configure as configureEnzyme } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import 'jest-styled-components';

configureEnzyme({ adapter: new EnzymeAdapter() });
