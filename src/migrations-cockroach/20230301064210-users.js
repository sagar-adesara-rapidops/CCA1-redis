const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("users", {
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        // autoIncrement: true,
      },
      email_address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      access_token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      expiry_date: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
    });

    // await queryInterface.sequelize
    //   .query(`create table users ( user_id INT PRIMARY KEY  AUTO_INCREMENT, email_address varchar(255) NOT NULL,first_name varchar(255) NOT NULL,
    //   last_name varchar(255) NOT NULL,
    //   password varchar(255) NOT NULL,
    //   profile_pic varchar(255) NOT NULL,
    //   phone_number varchar(255));`);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
