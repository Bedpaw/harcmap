const Users = require('../../../../models/users');

async function getUsers () {
  const usersArray = await Users.all();

  // filter passwords
  return usersArray.map((userObject) => {
    const {
      email,
      userEvents,
      role,
    } = userObject;

    return {
      email,
      userEvents,
      role,
    };
  });
}

module.exports = getUsers;
