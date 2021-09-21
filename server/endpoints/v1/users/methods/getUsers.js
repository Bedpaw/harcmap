const Users = require('../../../../models/users');

async function getUsers () {
  const usersArray = await Users.all();

  // filter passwords
  return usersArray.map((userObject) => {
    const { email, userEvents, roles } = userObject;

    return {
      email,
      userEvents,
      roles,
    };
  });
}

module.exports = getUsers;
