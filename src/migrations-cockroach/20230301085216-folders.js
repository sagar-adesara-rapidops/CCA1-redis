const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("folders", {
      folder_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        // autoIncrement: true,
      },
      folder_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "user_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      provider_id: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      next_page_token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      priority: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      sync_state: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
    await queryInterface.addIndex("folders", ["folder_name"], {
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
