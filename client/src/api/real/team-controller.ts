import { httpService } from 'config/http-service';
import { API_ERRORS } from 'utils/macros/errors';

const urls = {
  getAllTeamsByEventId: (eventId) => '/events/' + eventId + '/teams',
  getTeamByEventId: (eventId, teamId) => '/events/' + eventId + '/teams/' + teamId,
};

export const teamController = {
  getAllTeamsByEventId ({ eventId }) {
    return httpService.get({
      url: urls.getAllTeamsByEventId(eventId),
      errorOptions: API_ERRORS.getPointsByEventId,
    });
  },
  getTeamByEventId ({ eventId, teamId }) {
    return httpService.get({
      url: urls.getTeamByEventId(eventId, teamId),
      errorOptions: API_ERRORS.getPointsByEventId,
    });
  },

};
