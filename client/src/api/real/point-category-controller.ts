import { httpService } from 'config/http-service';
import { API_ERRORS } from 'src/utils/macros/errors';
import { PointCategoryDTO, PointCategoryDTOCreate } from 'models/dtos/point';
import { PointCategory } from 'models/point';

const urls = {
  getCategoriesByEventId: (eventId: string) => '/events/' + eventId + '/categories',
  addPointCategory: (eventId: string) => '/events/' + eventId + '/categories',
};

export const pointCategoryController = {
  getCategoriesByEventId (eventId: string) {
    return httpService.get<PointCategoryDTO[], PointCategory[]>({
      url: urls.getCategoriesByEventId(eventId),
      errorOptions: API_ERRORS.getCategoriesByEventId,
    });
  },

  addPointCategory (category: PointCategoryDTOCreate, eventId: string) {
    return httpService.post({
      url: urls.addPointCategory(eventId),
      body: category,
      errorOptions: API_ERRORS.addPoint,
    });
  },

};
