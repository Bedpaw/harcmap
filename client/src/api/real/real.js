import { eventController } from 'api/real/event-controller';
import { API_ERRORS } from 'utils/macros/errors';
import { httpService } from 'config/http-service';
import { authController } from 'api/real/auth-controller';

export const realApi = {
  ...authController,
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
