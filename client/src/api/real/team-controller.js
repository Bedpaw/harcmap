import { httpService } from 'config/http-service';
import { MapPoint } from 'src/structures/map-point';
import { API_ERRORS } from 'utils/macros/errors';
import { Mapper } from 'models/utils/mapper';

const urls = {
  getAllTeamsByEventId: (eventId) => '/events/' + eventId + '/teams',
  getTeamByEventId: (eventId, teamId) => '/events/' + eventId + '/teams/' + teamId,
};

export const teamController = {
  getAllTeamsByEventId ({ eventId }) {
    return httpService.get({
      url: urls.getAllTeamsByEventId(eventId),
      responseConfig: {
        successCallback: data => data.teams.map(teams => Mapper.mapPointIn(teams)),
        errorConfig: {
          ...API_ERRORS.getPointsByEventId,
        },
      },
    });
  },
  getTeamByEventId ({ eventId, teamId }) {
    return httpService.get({
      url: urls.getTeamByEventId(eventId, teamId),
      responseConfig: {
        successCallback: data => data.team.map(team => Mapper.mapPointIn(team)),
        errorConfig: {
          ...API_ERRORS.getPointsByEventId,
        },
      },
    });
  },

};
