"use strict";

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
   options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
   async up(queryInterface, Sequelize) {
      await ReviewImage.bulkCreate(
         [
            {
               reviewId: 1,
               url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
            },
            
            {
               reviewId: 2,
               url: "https://cdn.gaminggorilla.com/wp-content/uploads/2022/06/The-Best-Minecraft-House-Ideas.jpg",
            },
            {
               reviewId: 3,
               url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK7jXC5vkYD1u1ilBQnrXl8O8l2tyEPlrpgw&usqp=CAU",
            },
         ],
         { validate: true }
      );
   },

   async down(queryInterface, Sequelize) {
      options.tableName = "ReviewImages";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {});
   },
};
