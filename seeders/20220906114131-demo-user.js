"use strict";

const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "authority",
      [
        {
          id: 1,
          name: "superadmin",
          email: "5arafatshovo@gmail.com",
          role: "admin",
          password: bcrypt.hashSync(
            "123456789",
            parseInt(process.env.BCRYPT_SALT)
          ),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  // down: async (queryInterface, Sequelize) => {

  //   await queryInterface.bulkDelete("authority", null, bulkDeleteOptions);
  // },
};
