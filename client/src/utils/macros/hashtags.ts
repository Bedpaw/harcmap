import { colorsUtils } from 'utils/macros/colors';

const late = {
  little: { label: 'LekkoSpóźniony', time: 2 },
  normal: { label: 'Spóźniony', time: 1.5 },
  very: { label: 'BardzoSpóźniony', time: 1 },
};

export const hashtags = {
  late,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  lateList: Object.keys(late).map((label) => late[label]),
  colors: colorsUtils.appColors,
  colorsList: Object.keys(colorsUtils.appColors),
};
