const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("emails", {
      email_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        // autoIncrement: true,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      email_subject: { type: Sequelize.DataTypes.STRING, allowNull: true },
      email_body_text: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      email_body_html: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      thread_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        // defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_read: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
      },
      imid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      in_reply_to: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      scheduled_at: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      snippet: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      is_archive: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_trashed: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
