const { getSHA } = require('../../../../libs/utils');
const Users = require('../../../../models/users');

// registration
// todo check if doesnt exist
async function signUp (userObject) {
  const userObjectWithHash = userObject;

  userObjectWithHash.role = 'common';
  userObjectWithHash.password = getSHA(userObject.password);

  const result = await Users.create(userObject);
  const { success, data } = result;
  let responseData = result;

  if (success) {
    responseData = data[0];

    delete responseData.password;
    delete responseData._id;
  }

  return responseData;

}

module.exports = signUp;
