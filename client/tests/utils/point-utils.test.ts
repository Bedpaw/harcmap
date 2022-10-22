import { PointType } from 'models/point';
import { MACROS } from 'utils/macros';
import { pointUtils } from 'utils/point';
import { ACCOUNT_TYPES } from 'config/users-config';
import * as dayjs from 'dayjs';
import { isBeforeLastGapEndTime, isCurrentHour } from 'utils/date';
import { initDateConfig } from 'config/date-config';
const { pointType: pointTypes } = MACROS;

const { admin, creator, observer, teamLeader, teamMember } = ACCOUNT_TYPES;
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

const notCollectedPoint: PointType = {
  pointAppearanceTime: null,
  pointCategoryId: '',
  pointCollectionTime: null,
  pointDescription: null,
  pointExpirationTime: null,
  pointId: 'notCollected1',
  pointKey: '1234',
  pointLatitude: 0,
  pointLongitude: 0,
  pointName: null,
  pointSuccessMessage: null,
  pointType: pointTypes.permanent,
};

const collectedPoint: PointType = {
  pointAppearanceTime: null,
  pointCategoryId: '',
  pointCollectionTime: 1234,
  pointDescription: null,
  pointExpirationTime: null,
  pointId: 'collected1',
  pointKey: '1234',
  pointLatitude: 0,
  pointLongitude: 0,
  pointName: null,
  pointSuccessMessage: null,
  pointType: pointTypes.permanent,
};

const getSmokeTestData = () => {
  const timeout1 = { ...timeoutPoint };
  const timeout2 = { ...timeoutPoint, pointId: 'timeout2' };
  const notCollectedPoint1 = { ...notCollectedPoint };
  const collectedLongTimeAgoPoint = { ...collectedPoint };
  const collectedByTeam1LongTimeAgo = { ...collectedPoint, pointId: 'team1' };
  const justCollectedByTeam1 = { ...collectedPoint, pointId: 'team1Just', pointCollectionTime: dayjs().subtract(1, 's') };
  const collectedByTeam2LongTimeAgo = { ...collectedPoint, pointId: 'team2' };
  const justCollectedByTeam2 = { ...collectedPoint, pointId: 'team2Just', pointCollectionTime: dayjs().subtract(1, 's') };

  return {
    timeout1,
    timeout2,
    notCollectedPoint1,
    collectedLongTimeAgoPoint,
    collectedByTeam1LongTimeAgo,
    collectedByTeam2LongTimeAgo,
    justCollectedByTeam1,
    justCollectedByTeam2,
  };
};

describe('Smoke test data', () => {
  const genericTestAction = (role: string, pointsCollectedByTeam: string[] = [], mapRefreshTime = 30) => (point: any) => {
    return pointUtils.pointIsDisplayedAsCollected(point, role, {
      pointsCollectedByTeam,
      mapRefreshTime,
    });
  };

  [admin, creator, observer].forEach(roleName => {
    it(roleName + ' should see point like admin', () => {
      const adminTestAction = genericTestAction(roleName);
      const results = Object.fromEntries(Object.entries(getSmokeTestData()).map(([k, v]) => [k, adminTestAction(v)]));
      const expectedResults = {
        timeout1: false,
        timeout2: false,
        notCollectedPoint1: false,
        collectedByTeam2LongTimeAgo: true,
        collectedByTeam1LongTimeAgo: true,
        collectedLongTimeAgoPoint: true,
        justCollectedByTeam2: true,
        justCollectedByTeam1: true,
      } as Record<keyof ReturnType<typeof getSmokeTestData>, boolean>;
      expect(results).toEqual(expectedResults);
    });
  });

  ['team1', 'team2', 'team3'].forEach(teamId => {
    [teamLeader, teamMember].forEach(roleName => {
      it(roleName + ' should see point like admin', () => {
        const smokeTestData = getSmokeTestData();
        const collectedPoints = {
          team1: [smokeTestData.justCollectedByTeam1.pointId, smokeTestData.collectedByTeam1LongTimeAgo.pointId],
          team2: [smokeTestData.justCollectedByTeam2.pointId, smokeTestData.collectedByTeam2LongTimeAgo.pointId],
          team3: [],
        };
        const usersTestAction = genericTestAction(roleName, collectedPoints[teamId as 'team1' | 'team2' | 'team3']);

        const results = Object.fromEntries(Object.entries(getSmokeTestData()).map(([k, v]) => [k, usersTestAction(v)]));

        const expectedResults = {
          timeout1: false,
          timeout2: false,
          notCollectedPoint1: false,
          collectedByTeam2LongTimeAgo: true,
          collectedByTeam1LongTimeAgo: true,
          collectedLongTimeAgoPoint: true,
          justCollectedByTeam2: teamId === 'team2',
          justCollectedByTeam1: teamId === 'team1',
        } as Record<keyof ReturnType<typeof getSmokeTestData>, boolean>;
        expect(results).toEqual(expectedResults);
      });
    });
  });

});
describe('point is displayed as collected success paths', () => {
  initDateConfig();
  it('Point with timeout type are always not collected', () => {
    const result = pointUtils.pointIsDisplayedAsCollected(timeoutPoint, admin, {
      pointsCollectedByTeam: [],
      mapRefreshTime: 30,
    });
    expect(result).toBe(false);
  });
  it('Point is displayed as not collected if has not collectionTime', () => {
    const result = pointUtils.pointIsDisplayedAsCollected(notCollectedPoint, admin, {
      pointsCollectedByTeam: [],
      mapRefreshTime: 30,
    });
    expect(result).toBe(false);
  });
  it('For admin point is displayed as collected if has collection data', () => {
    const result = pointUtils.pointIsDisplayedAsCollected(collectedPoint, admin, {
      pointsCollectedByTeam: [],
      mapRefreshTime: 30,
    });
    expect(result).toBe(true);
  });

  it('For team that collect point it is seen always', () => {
    const result = pointUtils.pointIsDisplayedAsCollected(collectedPoint, teamLeader, {
      pointsCollectedByTeam: [collectedPoint.pointId],
      mapRefreshTime: 30,
    });
    expect(result).toBe(true);
  });

  it('For team that not collect this point it is visible after time gap', () => {
    const pointCollected10minAfterFullHour = { ...collectedPoint, pointCollectionTime: Number(dayjs().minute(10)) };
    const result = pointUtils.pointIsDisplayedAsCollected(pointCollected10minAfterFullHour, teamLeader, {
      pointsCollectedByTeam: [],
      mapRefreshTime: 2 * 60,
    },
    dayjs().minute(20));
    expect(result).toBe(true);
  });

  it('For team that not collect this point it is not visible before time gap', () => {
    const pointCollected10minAfterFullHour = { ...collectedPoint, pointCollectionTime: Number(dayjs().minute(17)) };
    const result = pointUtils.pointIsDisplayedAsCollected(pointCollected10minAfterFullHour, teamLeader, {
      pointsCollectedByTeam: [],
      mapRefreshTime: 15 * 60,
    },
    dayjs().minute(20));
    expect(result).toBe(false);
  });
},
);

describe('Point display delay is working correct', () => {
  initDateConfig();
  describe('isCurrentHour', () => {
    it('now should get true', () => {
      const currentHour = dayjs();
      const result = isCurrentHour(currentHour);
      expect(result).toBe(true);
    });
    it('same hour, different day should get false', () => {
      const currentHourPlusOneDay = dayjs().add(1, 'd');
      const result = isCurrentHour(currentHourPlusOneDay);
      expect(result).toBe(false);

    });
    it('hour + 1 should get false', () => {
      const currentHourPlusOneHour = dayjs().add(1, 'h');
      const result = isCurrentHour(currentHourPlusOneHour);
      expect(result).toBe(false);
    });

  });

  describe('isBeforeLastGapEndTime', () => {
    it('If point been collected at least 1 hour ago it will always be visible', () => {
      const mapRefreshInSecond = 60 * 60;
      const timeToCompare = +dayjs().subtract(1, 'h');
      const result = isBeforeLastGapEndTime(mapRefreshInSecond, timeToCompare);
      expect(result).toBe(true);
    });

    describe('If point been collected in current hour, but there were no update yet', () => {
      const testCases = [
        {
          mapRefreshTime: 1,
          currentMinutes: 1,
          minutesOfCollection: 1,
          predictedLastTimeEndGap: 1,
        },
        {
          mapRefreshTime: 2,
          currentMinutes: 13,
          minutesOfCollection: 12,
          predictedLastTimeEndGap: 12,
        },
        {
          mapRefreshTime: 3,
          currentMinutes: 17,
          minutesOfCollection: 15,
          predictedLastTimeEndGap: 15,
        },
        {
          mapRefreshTime: 5,
          currentMinutes: 24,
          minutesOfCollection: 20,
          predictedLastTimeEndGap: 20,
        },
        {
          mapRefreshTime: 6,
          currentMinutes: 59,
          minutesOfCollection: 54,
          predictedLastTimeEndGap: 54,
        },
        {
          mapRefreshTime: 10,
          currentMinutes: 16,
          minutesOfCollection: 14,
          predictedLastTimeEndGap: 10,
        },
        {
          mapRefreshTime: 12,
          currentMinutes: 16,
          minutesOfCollection: 13,
          predictedLastTimeEndGap: 12,
        },
        {
          mapRefreshTime: 15,
          currentMinutes: 29,
          minutesOfCollection: 15,
          predictedLastTimeEndGap: 15,
        },
        {
          mapRefreshTime: 30,
          currentMinutes: 44,
          minutesOfCollection: 31,
          predictedLastTimeEndGap: 30,
        },
      ];
      testCases.forEach(({ mapRefreshTime, currentMinutes, minutesOfCollection, predictedLastTimeEndGap }) => {
        const name = `If map refresh time is ${mapRefreshTime} and minutes of current hour are ${currentMinutes},
         so last update should be triggered at ${predictedLastTimeEndGap}. Point has been collected at ${minutesOfCollection}, so it should not be visible`;
        it(name, () => {
          const mapRefreshInSecond = 60 * mapRefreshTime;
          const currentTime = dayjs().minute(currentMinutes);
          const timeToCompare = +dayjs().minute(minutesOfCollection);
          const result = isBeforeLastGapEndTime(mapRefreshInSecond, timeToCompare, currentTime);
          expect(result).toBe(false);
        });
      });
    });

    describe('If point been collected in current hour, but there were no update yet', () => {
      const testCases = [
        {
          mapRefreshTime: 1,
          currentMinutes: 1,
          minutesOfCollection: 0,
          predictedLastTimeEndGap: 1,
        },
        {
          mapRefreshTime: 2,
          currentMinutes: 13,
          minutesOfCollection: 10,
          predictedLastTimeEndGap: 12,
        },
        {
          mapRefreshTime: 3,
          currentMinutes: 17,
          minutesOfCollection: 12,
          predictedLastTimeEndGap: 15,
        },
        {
          mapRefreshTime: 5,
          currentMinutes: 24,
          minutesOfCollection: 19,
          predictedLastTimeEndGap: 20,
        },
        {
          mapRefreshTime: 6,
          currentMinutes: 59,
          minutesOfCollection: 53,
          predictedLastTimeEndGap: 54,
        },
        {
          mapRefreshTime: 10,
          currentMinutes: 16,
          minutesOfCollection: 0,
          predictedLastTimeEndGap: 10,
        },
        {
          mapRefreshTime: 12,
          currentMinutes: 16,
          minutesOfCollection: 1,
          predictedLastTimeEndGap: 12,
        },
        {
          mapRefreshTime: 15,
          currentMinutes: 29,
          minutesOfCollection: 14,
          predictedLastTimeEndGap: 15,
        },
        {
          mapRefreshTime: 30,
          currentMinutes: 44,
          minutesOfCollection: 29,
          predictedLastTimeEndGap: 30,
        },
      ];
      testCases.forEach(({ mapRefreshTime, currentMinutes, minutesOfCollection, predictedLastTimeEndGap }) => {
        const name = `If map refresh time is ${mapRefreshTime} and minutes of current hour are ${currentMinutes},
         so last update should be triggered at ${predictedLastTimeEndGap}. Point has been collected at ${minutesOfCollection}, so it should be visible`;
        it(name, () => {
          const mapRefreshInSecond = 60 * mapRefreshTime;
          const currentTime = dayjs().minute(currentMinutes);
          const timeToCompare = +dayjs().minute(minutesOfCollection);
          const result = isBeforeLastGapEndTime(mapRefreshInSecond, timeToCompare, currentTime);
          expect(result).toBe(true);
        });
      });
    });
  });
});
