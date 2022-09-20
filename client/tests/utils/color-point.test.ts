import { PointType } from 'models/point';
import { MACROS } from 'utils/macros';
import { pointUtils } from 'utils/point';
const { pointType: pointTypes } = MACROS;

const timeoutPoint: PointType = {
  pointAppearanceTime: null,
  pointCategoryId: '',
  pointCollectionTime: null,
  pointDescription: null,
  pointExpirationTime: null,
  pointId: 'temporary1',
  pointKey: '1234',
  pointLatitude: 0,
  pointLongitude: 0,
  pointName: null,
  pointSuccessMessage: null,
  pointType: pointTypes.timeout,
};

describe('point is displayed as collected', () =>
  it('Temporary points are always not collected', () => {
    const result = pointUtils.pointIsDisplayedAsCollected(timeoutPoint, {
      pointsCollectedByTeam: [],
      mapRefreshTime: 30,
    });
    expect(result).toBe(true);
  },
  ),
);
