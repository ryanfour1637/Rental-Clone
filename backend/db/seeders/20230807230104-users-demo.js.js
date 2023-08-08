"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
   options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
   async up(queryInterface, Sequelize) {
      await User.bulkCreate(
         [
            {
               firstName: "Ryan",
               lastName: "Fournier",
               email: "ryanfour@gmail.com",
               username: "Ryanfour",
               hashedPassword: bcrypt.hashSync("password"),
            },
            {
               firstName: "Zoila",
               lastName: "Ceniseroz",
               email: "zoicen@gmail.com",
               username: "Zoicen",
               hashedPassword: bcrypt.hashSync("password2"),
            },
            {
               firstName: "Bergy",
               lastName: "Roo",
               email: "Bergyroo@gmail.com",
               username: "Bergyroo",
               hashedPassword: bcrypt.hashSync("password3"),
            },
         ],
         { validate: true }
      );
   },

   async down(queryInterface, Sequelize) {
      options.tableName = "Users";
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(
         options,
         {
            username: { [Op.in]: ["Ryanfour", "Zoicen", "Bergyroo"] },
         },
         {}
      );
   },
};
