"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
   options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
   async up(queryInterface, Sequelize) {
      await Review.bulkCreate(
         [
            {
               spotId: 1,
               userId: 2,
               review: "magical place",
               stars: 5,
            },
            {
               spotId: 2,
               userId: 3,
               review: "friendly neighbors, quiet street",
               stars: 4,
            },
            {
               spotId: 3,
               userId: 1,
               review: "lovely deck, fun boat",
               stars: 5,
            },
         ],
         { validate: true }
      );
   },

   async down(queryInterface, Sequelize) {
      options.tableName = "Reviews";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {});
   },
};
