const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("topics", {
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        // primaryKey: false,
        // defaultValue: Sequelize.literal("gen_random_uuid()"),
        // autoIncrement: true,
      },
      tenant_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        // primaryKey: true,
        // defaultValue: Sequelize.literal("gen_random_uuid()"),
        // autoIncrement: true,
      },
      topic_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    });

    await queryInterface.addConstraint("topics", {
      type: "primary key",
      name: "topics_primary_key",
      fields: ["user_id", "tenant_id", "topic_name"],
    });
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
