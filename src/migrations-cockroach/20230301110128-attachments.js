const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("attachments", {
      attachment_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      email_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "emails",
          key: "email_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      attachment_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      attachment_size: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      attachment_path: {
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
