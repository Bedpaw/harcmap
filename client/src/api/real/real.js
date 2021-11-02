import { userController } from 'api/real/user-controller';
import { eventController } from 'api/real/event-controller';
import { API_ERRORS } from 'utils/macros/errors';
import { httpService } from 'config/http-service';

export const realApi = {
  ...userController,
  ...eventController,
  information () {
    return httpService.get({
      url: '/information',
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.information,
        },
      },
    });
  },
};
