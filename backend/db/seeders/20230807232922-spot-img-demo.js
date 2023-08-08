"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
   options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
   async up(queryInterface, Sequelize) {
      await SpotImage.bulkCreate(
         [
            {
               spotId: 1,
               url: "https://media.istockphoto.com/id/524085051/photo/beautiful-exterior-of-new-luxury-home-at-twilight.jpg?s=2048x2048&w=is&k=20&c=cyKw0bAov6l0ctSyby7E469DHll7RHvfA8SdEsrPbSk=",
               preview: false,
            },
            {
               spotId: 2,
               url: "https://media.istockphoto.com/id/1150545984/photo/upscale-modern-mansion-with-pool.jpg?s=612x612&w=0&k=20&c=JT7qSGgmlGfiNiqJE2jw6rYwRcYCj9KBs7i2Rmyyypo=",
               preview: true,
            },
            {
               spotId: 3,
               url: "https://plus.unsplash.com/premium_photo-1686782502813-51579b55f6d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
               preview: false,
            },
         ],
         { validate: true }
      );
   },

   async down(queryInterface, Sequelize) {
      options.tableName = "SpotImages";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {});
   },
};
