import { API_ERRORS } from 'utils/macros/errors';
import { httpService } from 'config/http-service';
import { authController } from 'api/real/auth-controller';
import { pointCategoryController } from 'api/real/point-category-controller';
import { pointController } from 'api/real/point-controller';
import { teamController } from 'api/real/team-controller';
import { userController } from 'api/real/user-controller';
import { eventController } from 'api/real/event-controller';

export const realApi = {
  ...authController,
  ...pointCategoryController,
  ...pointController,
  ...teamController,
  ...userController,
  ...eventController,
  information () {
    return httpService.get({
      url: '/about',
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.information,
        },
      },
    });
  },
};
