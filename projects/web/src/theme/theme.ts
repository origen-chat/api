import breakpoints, {
  Breakpoints,
  breakpointsWithoutUnit,
  BreakpointsWithoutUnit,
} from './breakpoints';
import transitions, { Transitions } from './transitions';

export type Theme = Readonly<{
  breakpoints: Breakpoints;
  breakpointsWithoutUnit: BreakpointsWithoutUnit;
  transitions: Transitions;
}>;

const theme: Theme = {
  breakpoints,
  breakpointsWithoutUnit,
  transitions,
};

export default theme;
