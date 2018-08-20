export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type Breakpoints = Readonly<{ [K in BreakpointKey]: string }>;
export type BreakpointsWithoutUnit = Readonly<{ [K in BreakpointKey]: number }>;

export const breakpointsWithoutUnit: BreakpointsWithoutUnit = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1900,
};

export const breakpoints: Breakpoints = Object.entries(
  breakpointsWithoutUnit,
).reduce(
  (acc, [breakpointKey, breakpointValueWithoutUnit]) => ({
    ...acc,
    [breakpointKey]: `${breakpointValueWithoutUnit}px`,
  }),
  {},
) as Breakpoints;
