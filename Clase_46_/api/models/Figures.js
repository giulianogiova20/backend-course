/**
 * Figures.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 70,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: false,
      minlength: 6,
      maxlength: 200,
    },
    photoURL: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 200,
    },
    stock: {
      type: Number,
      required: false,
      min: 0,
    },
    timestamp: {
      type: Number,
      required: false,
      default: Date.now,
    },

  },

};

