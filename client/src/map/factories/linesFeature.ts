import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import { Stroke, Style } from 'ol/style';
import { store } from 'store';
import { PointType } from 'models/point';
import { mapConfig } from '../config';
import { Team } from 'models/team';
import { userUtils } from 'config/users-config';

export function createLinesFeature (list: PointType[] = []) {
  if (!mapConfig.lineConnectingPoints.visible) return false;

  const features = [] as Feature<LineString>[];

  if (userUtils.can.seeAllTeamsTracks()) {
    const teams = store.getters['groups/teams'] as Team[];
    teams.map((team) => {
      const teamCollectedPoints = store.getters['groups/collectedPointsByTeam'](team);
      return createSingleTrack(features, teamCollectedPoints, team.teamColor);
    });
  } else {
    const teamColor = store.getters['team/teamColor'];
    createSingleTrack(features, list, teamColor);
  }
  return features.length > 0 ? features : false;
}

const createSingleTrack = (features: Feature<LineString>[], pointsList: PointType[], color: string) => {
  const notEnoughPoints = pointsList.length < 2;

  if (notEnoughPoints) return false;

  const linePath = pointsList.map(point => [point.pointLongitude, point.pointLatitude]) as number[][];
  const polyline = new LineString(linePath);
  polyline.transform('EPSG:4326', 'EPSG:3857');

  const feature = new Feature(polyline);
  feature.setStyle(getLineStyle(color));
  features.push(feature);
};

const getLineStyle = (color?: string) => {
  return new Style({
    stroke: new Stroke(
      {
        color: color ?? mapConfig.lineConnectingPoints.color,
        width: mapConfig.lineConnectingPoints.width,
      },
    ),
  });
};
