import { colorsUtils } from 'utils/colors';

test('HEX to RGB', () => {
  expect(colorsUtils.hexToRGB('#FFFFFF')).toBe('rgb(255, 255, 255)');
  expect(colorsUtils.hexToRGB('#FFFFFF', 1)).toBe('rgba(255, 255, 255, 1)');
});
