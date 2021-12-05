import { httpService } from 'config/http-service';
import { API_ERRORS } from 'utils/macros/errors';
import { Mapper } from 'models/utils/mapper';

const urls = {
  getCategoriesByEventId: (eventId) => '/events/' + eventId + '/categories',
  addPointCategory: (eventId) => '/events/' + eventId + '/categories',
};

export const pointCategoryController = {
  getCategoriesByEventId ({ eventId }) {
    return httpService.get({
      url: urls.getCategoriesByEventId(eventId),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.getCategoriesByEventId,
        },
      },
    });
  },

  addPointCategory ({ category, eventId }) {
    return httpService.post({
      url: urls.addPoint(eventId),
      body: Mapper.mapPointOut(category),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.addPoint,
        },
      },
    });
  },

};
