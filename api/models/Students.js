/**
 * Students.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: "string",
      required: true,
      unique: true
    },
    password: {
      type: "string",
      required: true
    },
    name:{
      type:"string"
    },
    address:{
      type:"string"
    }

  },
  beforeCreate: function (values, cb) {
    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return cb(err);
      values.password = hash;
      return cb();
    });
  },
 
  datastore: 'default'
};

