const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("emails_folders_association", {
      folderId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "folders",
          key: "folderId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      emailId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
          model: "emails",
          key: "emailId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
