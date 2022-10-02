import appConfigs from 'config';
import { toPx } from './index';

const breakpoints = Object.keys(appConfigs.breakpoints).reduce((acc, curr) => {
  const currentValue = appConfigs.breakpoints[curr];

  return Object.assign(acc, {
    [curr]: currentValue,
    [`>${curr}`]: currentValue + 1,
    [`<${curr}`]: currentValue - 1
  });
}, {});

const computedValue = (breakpoint) => {
  return typeof breakpoint === 'number'
    ? toPx(breakpoint)
    : breakpoint in breakpoints
    ? toPx(breakpoints[breakpoint])
    : breakpoint;
};

export const minQuery = (breakpoint) => {
  return `@media(min-width: ${computedValue(breakpoint)})`;
};

export const maxQuery = (breakpoint) => {
  return `@media(max-width: ${computedValue(breakpoint)})`;
};

export const minMaxQuery = (min, max) => {
  return `@media(max-width: ${computedValue(max)}) and (min-width: ${computedValue(min)})`;
};
