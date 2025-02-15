import { API_ERRORS } from 'utils/macros/errors';
import { httpService } from 'src/config/http-service';
import { Team } from 'models/team';
import { TeamDTO } from 'models/dtos/team';

const urls = {
  getAllTeamsByEventId: (eventId: string) => '/events/' + eventId + '/teams',
  getTeamByEventId: (eventId: string, teamId: string) => '/events/' + eventId + '/teams/' + teamId,
};

export const teamController = {
  getAllTeamsByEventId (eventId: string) {
    return httpService.get<TeamDTO[], Team[]>({
      url: urls.getAllTeamsByEventId(eventId),
      errorOptions: API_ERRORS.getAllTeamsByEventId,
    });
  },
  getTeamByEventId (eventId: string, teamId: string) {
    return httpService.get<TeamDTO, Team>({
      url: urls.getTeamByEventId(eventId, teamId),
      errorOptions: API_ERRORS.getTeamByEventId,
    });
  },
};
