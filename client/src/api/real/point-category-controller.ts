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
      successCallback: (pointsCategory) => {
        // TODO it is mock callback
        return [
          {
            categoryId: '60e7046eaa95cc33d7c4672b',
            categoryName: 'Łatwe',
            pointValue: 1,
            strokeColor: 'stroke',
            fillColor: 'danger',
          },
          {
            categoryId: '60e7046eaa95cc33d7c4672b',
            categoryName: 'Trudne',
            pointValue: 3,
            strokeColor: 'stroke',
            fillColor: 'danger',
          },
        ];
      },
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
