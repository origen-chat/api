import {
  breakpoints,
  Breakpoints,
  breakpointsWithoutUnit,
  BreakpointsWithoutUnit,
} from './breakpoints';

export type Theme = {
  breakpoints: Breakpoints;
  breakpointsWithoutUnit: BreakpointsWithoutUnit;
};

const theme: Theme = {
  breakpoints,
  breakpointsWithoutUnit,
};

export default theme;
