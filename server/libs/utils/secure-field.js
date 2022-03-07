const { getUserRoleFromSession } = require('./get-session-data');

const defaultRolesWithAccess = ['creator', 'admin', 'observer'];
/**
 * @description Used to secure only one field in response (admins permissions)
 * @param field {*} - value to return if user have permission
 * @param eventId {string} - ObjectID of checking event, parsed to string
 * @param request {*} - "http" request
 * @param [rolesWithAccess] {array} - list of roles with access to field
 * @return {*|null} - field value or null if user have no required permission
 */
function secureField (field, eventId, request, rolesWithAccess = defaultRolesWithAccess) {
  // check what role have authenticated user
  const isAuth = request.isAuthenticated();
  const userRole = isAuth ? getUserRoleFromSession(eventId, request.user) : null;
  // check if user role is one of allowed to field
  const permissionToKey = rolesWithAccess.includes(userRole);

  return permissionToKey ? field : null;
}

function secureInviteKeys (inviteKeys, eventId, request) {
  const teamLeader = 'teamLeader';
  const rolesWithAccess = defaultRolesWithAccess.concat(teamLeader);
  const inviteKeysIfHavePermissions = secureField(inviteKeys, eventId, request, rolesWithAccess);

  if (inviteKeysIfHavePermissions) {
    return inviteKeysIfHavePermissions.filter(inviteKey => {
      const rolesWithAccessToKey = inviteKey.role === 'teamMember' ? rolesWithAccess : defaultRolesWithAccess;

      return !!secureField(inviteKey, eventId, request, rolesWithAccessToKey);
    });
  } else {
    return null;
  }
}

module.exports = {
  secureField,
  secureInviteKeys,
};
