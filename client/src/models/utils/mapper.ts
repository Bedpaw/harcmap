import { PointDTO, PointDTOCreate, PointDTOUpdate } from 'models/dtos/point';
import { PointType } from 'models/point';

export class Mapper {

  public static mapPointIn (pointIn: PointDTO): PointType {
    return {
      pointAppearanceTime: pointIn.pointDuration.startDate,
      pointCategory: pointIn.pointCategoryId,
      pointCollectionTime: pointIn.pointCollectedDate,
      pointExpirationTime: pointIn.pointDuration.endDate,
      pointId: pointIn.pointId,
      pointLatitude: pointIn.pointPosition.latitude,
      pointLongitude: pointIn.pointPosition.longitude,
      pointName: pointIn.pointName,
      pointType: pointIn.pointType,
    };
  }

  public static mapPointOut (pointOut: PointType): PointDTOCreate | PointDTOUpdate {
    return {
      pointCategoryId: pointOut.pointCategory,
      pointDuration: {
        startDate: pointOut.pointAppearanceTime,
        endDate: pointOut.pointExpirationTime,
      },
      pointKey: 'XD',
      pointName: pointOut.pointName,
      pointPosition: {
        longitude: pointOut.pointLongitude,
        latitude: pointOut.pointLatitude,
      },
      pointType: pointOut.pointType,
    };
  }
}
