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
               name: "Karen Fournier",
               description: "waterfront home, gorgeous sunsets",
               price: 999.99,
            },
            {
               ownerId: 2,
               address: "2164 Jamestown Way",
               city: "Oxnard",
               state: "CA",
               country: "USA",
               name: "Terri Delgado",
               description: "waterfront home, dock and boat",
               price: 799.99,
            },
            {
               ownerId: 3,
               address: "33 Darlene Drive",
               city: "Southboro",
               state: "MA",
               country: "USA",
               name: "Mark Slots",
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
