const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("recipients", {
      recipientId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recipientName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      recipientEmailAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      emailId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "emails",
          key: "emailId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: Sequelize.ENUM("from", "to", "cc", "bcc"),
        allowNull: false,
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("recipients");

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
