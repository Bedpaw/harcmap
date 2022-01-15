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
      successCallback: data => data.map(point => Mapper.mapPointIn(point)),
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
    const test = Mapper.mapPointOut(point); // TODO
    return httpService.post({
      url: urls.addPoint(eventId),
      errorOptions: API_ERRORS.addPoint,
      body: test,
    });
  },
  editPoint (point: PointType, eventId: string) {
    const test = Mapper.mapPointOut(point); // TODO
    return httpService.put({
      url: urls.editPoint(eventId, point.pointId),
      errorOptions: API_ERRORS.editPoint,
      body: test,
    });
  },
};
