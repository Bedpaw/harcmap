import { httpService } from 'config/http-service';
import { API_ERRORS } from 'utils/macros/errors';
import { Mapper } from 'models/utils/mapper';
import { PointDTO } from 'models/dtos/point';
import { PointType } from 'models/point';

const urls = {
  getPointsByEventId: (eventId: string) => '/events/' + eventId + '/points',
  collectPoint: (eventId: string) => '/events/' + eventId + '/points/collect',
  removePoint: (eventId: string, pointId: string) => '/events/' + eventId + '/points/' + pointId,
  addPoint: (eventId: string) => '/events/' + eventId + '/points',
  editPoint: (eventId: string, pointId: string) => '/events/' + eventId + '/points/' + pointId,
};

export const pointController = {
  getPointsByEventId (eventId: string): Promise<PointType[]> {
    return httpService.get<PointDTO[], PointType[]>({
      url: urls.getPointsByEventId(eventId),
      successCallback: data => data.map(point => {
        // TODO Every point cors (10,10) -> remove after mock change
        const x = Mapper.mapPointIn(point);
        const randomSign1 = Math.random() > 0.5;
        const randomSign2 = Math.random() > 0.5;
        let random1 = Math.random() * 100;
        let random2 = Math.random() * 100;
        if (randomSign1) {
          random1 *= -1;
        }
        if (randomSign2) {
          random2 *= -1;
        }
        if (x.pointLongitude && x.pointLatitude) {
          x.pointLatitude += random1;
          x.pointLongitude += random2;
        }
        return x;
      }),
      errorOptions: API_ERRORS.getPointsByEventId,
    });
  },
  collectPoint (pointKey: string, eventId: string) {
    return httpService.put({
      url: urls.collectPoint(eventId),
      errorOptions: API_ERRORS.collectPoint,
      body: { pointKey },
    });
  },
  removePoint (eventId: string, pointId: string) {
    return httpService.delete({
      url: urls.removePoint(eventId, pointId),
      errorOptions: API_ERRORS.removePoint,
    });
  },
  addPoint (point: PointType, eventId: string) {
    return httpService.post({
      url: urls.addPoint(eventId),
      errorOptions: API_ERRORS.addPoint,
      body: Mapper.mapPointOut(point),
    });
  },
  editPoint (point: PointType, eventId: string) {
    return httpService.put({
      url: urls.editPoint(eventId, point.pointId),
      errorOptions: API_ERRORS.editPoint,
      body: Mapper.mapPointOut(point),
    });
  },
};
