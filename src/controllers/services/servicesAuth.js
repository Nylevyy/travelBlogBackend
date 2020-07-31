const path = require('path');
const titles = require(path.resolve('src/models/Titles'))
const users = require(path.resolve('src/models/Users'));

class Auth {
  createUser(user) {
    return users.createUser(user)
      .then((userID) => titles.createTitle(userID))
  }

}

const auth = new Auth;

module.exports = auth;
