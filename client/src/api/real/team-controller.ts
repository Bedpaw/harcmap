import { httpService } from 'config/http-service';
import { API_ERRORS } from 'utils/macros/errors';

const urls = {
  getAllTeamsByEventId: (eventId: string) => '/events/' + eventId + '/teams',
  getTeamByEventId: (eventId: string, teamId: string) => '/events/' + eventId + '/teams/' + teamId,
};

export const teamController = {
  getAllTeamsByEventId (eventId: string) {
    return httpService.get({
      url: urls.getAllTeamsByEventId(eventId),
      errorOptions: API_ERRORS.getPointsByEventId,
    });
  },
  getTeamByEventId (eventId: string, teamId: string) {
    return httpService.get({
      url: urls.getTeamByEventId(eventId, teamId),
      errorOptions: API_ERRORS.getPointsByEventId,
    });
  },

};
