const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("emails_folders_association", {
      folder_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "folders",
          key: "folder_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      email_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,

        references: {
          model: "emails",
          key: "email_id",
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
