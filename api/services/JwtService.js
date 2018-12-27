let jwt = require('jsonwebtoken');
let jwtSecretAdmin = sails.config.secrets.jwtSecretAdmin;
let jwtSecretStudent = sails.config.secrets.jwtSecretStudent;
module.exports = {

  issue: function (payload,user) {
    if(user == 'admin'){
      token = jwt.sign(payload, jwtSecretAdmin, {expiresIn: 180 * 60});
      return token
    }else{
      token = jwt.sign(payload, jwtSecretStudent, {expiresIn: 180 * 60});
      return token
    }
  },

  verify: function (token,user, callback) {
    if(user == 'admin'){
      return jwt.verify(token, jwtSecretAdmin, callback);
    } else{
      return jwt.verify(token, jwtSecretStudent, callback);
    }
  }

};
