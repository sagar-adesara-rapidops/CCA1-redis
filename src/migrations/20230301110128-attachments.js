const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("attachments", {
      attachmentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      attachmentName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      attachmentSize: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      attachmentPath: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
