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
  'pink': '#C863DE',
};

type ColorsList = Partial<{[key in keyof typeof appColors]: string }>;

const getSelectOptionStyle = (color: string) => ({
  color,
  backgroundColor: '#EEEEEE',
  borderBottom: `1px solid ${color}`,
});

const colorsSelectValues = (colors: ColorsList) => Object.entries(colors).map(([key, value]) =>
  ({ label: translator.t('colors.' + key), value, style: getSelectOptionStyle(value) }));

const getTeamColors = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { white, black, ...teamColors } = appColors;
  return teamColors;
};

export const colorsUtils = {
  getAllColorsSelectValues: colorsSelectValues(appColors),
  getTeamColorsSelectValues: colorsSelectValues(getTeamColors()),
  appColors,
};
