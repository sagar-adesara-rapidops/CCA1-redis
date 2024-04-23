const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    console.log("saf");
    await queryInterface.createTable("users", {
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      emailAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      accessToken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
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
