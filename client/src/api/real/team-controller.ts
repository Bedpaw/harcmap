import { API_ERRORS } from 'utils/macros/errors';
import { httpService } from 'src/config/http-service';
import { TeamDTO } from 'models/dtos/team';
import { ACCOUNT_TYPES } from 'utils/permissions';

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
    return httpService.get<TeamDTO, TeamDTO>({
      url: urls.getTeamByEventId(eventId, teamId),
      errorOptions: API_ERRORS.getPointsByEventId,
      successCallback: (data) => {
        // TODO it is mock callback
        data.teamMembers = data.teamMembers.map((user, index) => {
          if (index === 0) {
            user.role = ACCOUNT_TYPES.teamLeader;
          } else {
            user.role = ACCOUNT_TYPES.teamMember;
          }
          return user;
        });
        return data;
      },
    });
  },

};
