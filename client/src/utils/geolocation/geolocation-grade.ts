export enum GeoAccuracy {
    HIGH,
    MEDIUM,
    LOW,
    VERY_LOW,
    UNKNOWN,
}

const ACCURACY_HISTORY_LENGTH = 5;
const timeToInitialize = 5000;
let isInitialized = false;

const lastPositionsAccuracies: GeoAccuracy[] = [];

function addAccuracy (accuracy: GeoAccuracy) {
  if (lastPositionsAccuracies.length >= ACCURACY_HISTORY_LENGTH) {
    lastPositionsAccuracies.pop();
  }
  lastPositionsAccuracies.unshift(accuracy);
}

function getAccuracyEnum (accuracy: number) {
  let accuracyEnum;

  if (accuracy > 50) {
    accuracyEnum = GeoAccuracy.VERY_LOW;
  } else if (accuracy > 25) {
    accuracyEnum = GeoAccuracy.LOW;
  } else if (accuracy > 10) {
    accuracyEnum = GeoAccuracy.MEDIUM;
  } else {
    accuracyEnum = GeoAccuracy.HIGH;
  }

  return accuracyEnum;
}

function getLastAccuraciesGrade () {
  // eslint-disable-next-line no-return-assign
  setTimeout(() => isInitialized = true, timeToInitialize);

  const checkEvery = (enumVal: GeoAccuracy[]) => lastPositionsAccuracies.every((acc) => enumVal.includes(acc));
  const isLocationUnknown = lastPositionsAccuracies.length < ACCURACY_HISTORY_LENGTH && isInitialized === false;

  if (isLocationUnknown && checkEvery([GeoAccuracy.VERY_LOW, GeoAccuracy.LOW])) {
    return GeoAccuracy.UNKNOWN;
  }

  if (checkEvery([GeoAccuracy.VERY_LOW])) {
    return GeoAccuracy.VERY_LOW;
  }
  if (checkEvery([GeoAccuracy.VERY_LOW, GeoAccuracy.LOW])) {
    return GeoAccuracy.LOW;
  }
  if (checkEvery([GeoAccuracy.HIGH])) {
    return GeoAccuracy.HIGH;
  }

  return GeoAccuracy.MEDIUM;
}

export const geolocationGrade = {
  getAccuracyEnum,
  getLastAccuraciesGrade,
  addAccuracy,
  lastPositionsAccuracies,
};
