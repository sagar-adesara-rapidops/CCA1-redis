const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("folders", {
      folderId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      folderName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "userId" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      providerId: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
    });
    await queryInterface.addIndex("folders", ["folderName"], {
      name: "folder_name_idx",
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
