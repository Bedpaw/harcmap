import { httpService } from 'config/http-service';
import { API_ERRORS } from 'src/utils/macros/errors';
import { PointCategoryDTO, PointCategoryDTOCreate, PointCategoryDTOUpdate } from 'models/dtos/point';
import { PointCategory } from 'models/point';

const urls = {
  getCategoriesByEventId: (eventId: string) => '/events/' + eventId + '/categories',
  addPointCategory: (eventId: string) => '/events/' + eventId + '/categories',
  updatePointCategory: (eventId: string, categoryId: string) => '/events/' + eventId + '/categories/' + categoryId,
  deletePointCategory: (eventId: string, categoryId: string) => '/events/' + eventId + '/categories/' + categoryId,
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
  updatePointCategory (category: PointCategoryDTOUpdate, categoryId: string, eventId: string) {
    return httpService.put({
      url: urls.updatePointCategory(eventId, categoryId),
      body: category,
      errorOptions: API_ERRORS.addPoint,
    });
  },
  deletePointCategory (categoryId: string, eventId: string) {
    return httpService.delete({
      url: urls.deletePointCategory(eventId, categoryId),
      errorOptions: API_ERRORS.addPoint,
    });
  },

};
