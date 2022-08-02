import { authController } from 'src/api/real/auth-controller';
import { pointController } from 'src/api/real/point-controller';
import { httpService } from 'config/http-service';
import { API_ERRORS } from 'src/utils/macros/errors';
import { eventController } from 'src/api/real/event-controller';
import { userController } from 'src/api/real/user-controller';
import { teamController } from 'src/api/real/team-controller';
import { pointCategoryController } from 'src/api/real/point-category-controller';
import { DEVELOPMENT_MODE } from 'config/app-env';

export const api = {
  ...authController,
  ...pointCategoryController,
  ...pointController,
  ...teamController,
  ...userController,
  ...eventController,
  information () {
    return httpService.get({
      url: '/about',
      errorOptions: API_ERRORS.information,
    });
  },
};

if (DEVELOPMENT_MODE) {
  window.api = api;
}
