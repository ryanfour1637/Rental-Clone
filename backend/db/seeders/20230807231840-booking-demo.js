"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
   options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
   async up(queryInterface, Sequelize) {
      await Booking.bulkCreate(
         [
            {
               spotId: 8,
               userId: 4,
               startDate: "2023-11-27",
               endDate: "2023-12-15",
            },
            {
               spotId: 9,
               userId: 5,
               startDate: "2023-09-27",
               endDate: "2023-12-12",
            },
            {
               spotId: 10,
               userId: 6,
               startDate: "2023-10-27",
               endDate: "2023-12-29",
            },
         ],
         { validate: true }
      );
   },

   async down(queryInterface, Sequelize) {
      options.tableName = "Bookings";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {});
   },
};
