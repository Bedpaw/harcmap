import { store } from 'store';

const availableColors = {
  stroke: 'stroke',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
};

function getColor (color) {
  return store.getters['theme/colors'][color];
}

export const MAP_POINTS = {
  '60e7046eaa95cc33d7c4672b': () => ({
    strokeColor: getColor(availableColors.stroke),
    fillColor: getColor(availableColors.info),
  }),
  '1': () => ({
    strokeColor: getColor(availableColors.stroke),
    fillColor: getColor(availableColors.info),
  }),
  '2': () => ({
    strokeColor: getColor(availableColors.stroke),
    fillColor: getColor(availableColors.warning),
  }),
  '3': () => ({
    strokeColor: getColor(availableColors.stroke),
    fillColor: getColor(availableColors.danger),
  }),
};
