"use strict";

const { User, Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
   options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
   async up(queryInterface, Sequelize) {
      await Spot.bulkCreate(
         [
            {
               ownerId: 1,
               address: "37 Shore Road",
               city: "Bristol",
               state: "RI",
               country: "USA",
               lat: 41.6762,
               lng: -71.1662,
               description: "waterfront home, gorgeous sunsets",
               price: 999.99,
            },
            {
               ownerId: 2,
               address: "2164 Jamestown Way",
               city: "Oxnard",
               state: "CA",
               country: "USA",
               lat: 34.1975,
               lng: -119.1771,
               description: "waterfront home, dock and boat",
               price: 799.99,
            },
            {
               ownerId: 3,
               address: "33 Darlene Drive",
               city: "Southboro",
               state: "MA",
               country: "USA",
               lat: 42.3057,
               lng: -71.5231,
               description: "nice neighborhood, quiet",
               price: 399.99,
            },
         ],
         { validate: true }
      );
   },

   async down(queryInterface, Sequelize) {
      options.tableName = "Spots";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {});
   },
};
