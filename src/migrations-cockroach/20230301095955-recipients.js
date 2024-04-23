const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("recipients", {
      recipient_id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      // recipient_name: {
      //   type: Sequelize.DataTypes.STRING,
      //   allowNull: true,
      // },
      recipient_email_address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        // unique: true,
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
