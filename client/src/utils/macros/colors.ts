import { translator } from 'dictionary';

export const appColors = {
  'purple': '#7308A5',
  'blue': '#3AA5FF',
  'green': '#007700',
  'gray': '#777777',
  'yellow': '#FFFF00',
  'red': '#FF0000',
  'black': '#000000',
  'orange': '#FEB300',
  'white': '#FFFFFF',
  'pink': '#C863DEFF',
};

export const colorsUtils = {
  colorsSelectValues: Object.entries(appColors).map(([key, value]) =>
    ({ label: translator.t('colors.' + key), value })),
  appColors,
};
