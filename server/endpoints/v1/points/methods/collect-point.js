const Points = require('../../../../models/points');
const Teams = require('../../../../models/teams');
const { ObjectId } = require('mongodb');
const { AppError, errorCodes } = require('../../../../libs/errors');
const { getUserTeamIdFromSession, getUserRoleFromSession } = require('../../../../libs/utils');

async function collectPoint (request, eventId, pointKey) {
  // TODO add limit of try
  const point = await Points.get({ eventId: ObjectId(eventId), pointKey });
  const userTeamId = getUserTeamIdFromSession(eventId, request.user);
  const userRole = getUserRoleFromSession(eventId, request.user);

  if (['creator', 'admin', 'observer'].includes(userRole)) {
    throw new AppError(errorCodes.ADMINISTRATOR_CANT_COLLECT_POINTS, {
      httpStatus: 400,
    });
  }

  if (point) {
    const { _id } = point;
    // check if point wasn't collect
    if (!point.pointCollectedDate) {
      const now = Date.now();
      const updatedPoint = await Points.update({ _id }, {
        pointCollectedDate: now,
      });

      // point updated - we can add it to user team collected points
      if (updatedPoint.success) {
        const updatedTeam = await Teams.update({ _id: userTeamId }, {
          $push: { collectedPoints: _id },
        }, { rawNewDocument: true });

        // team updated
        if (updatedTeam.success) {
          return {
            pointId: point._id.toString(),
            pointName: point.pointName,
            pointType: point.pointType,
            pointCollectedDate: now,
            pointDuration: point.pointDuration,
            pointPosition: point.pointPosition,
            pointCategoryId: point.pointCategoryId,
          };
        } else {
          throw new AppError(errorCodes.CANNOT_UPDATE_TEAM_COLLECTED_POINTS, {
            httpStatus: 500,
            details: updatedTeam.errorDetails,
          });
        }
      } else {
        throw new AppError(errorCodes.CANNOT_UPDATE_COLLECTED_POINT, {
          httpStatus: 500,
          details: updatedPoint.errorDetails,
        });
      }
    } else {
      throw new AppError(errorCodes.POINT_ALREADY_COLLECTED, {
        httpStatus: 400,
      });
    }
  } else {
    // wrong pointKey
    throw new AppError(errorCodes.POINT_NOT_EXIST, {
      httpStatus: 400,
    });
  }
}

module.exports = collectPoint;
