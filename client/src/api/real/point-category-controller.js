import { httpService } from 'config/http-service';
import { API_ERRORS } from 'utils/macros/errors';
import { Mapper } from 'models/utils/mapper';

const urls = {
  getCategoriesByEventId: (eventId) => '/events/' + eventId + '/points',
  addPointCategory: (eventId) => '/events/' + eventId + '/points',
};

export const pointCategoryController = {
  getCategoriesByEventId ({ eventId }) {
    return httpService.get({
      url: urls.getCategoriesByEventId(eventId),
      responseConfig: {
        successCallback: data => data.categories.map(category => Mapper.mapPointIn(category)),
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
