const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("emails", {
      emailId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      emailSubject: { type: Sequelize.DataTypes.STRING, allowNull: true },
      emailBodyText: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      emailBodyHtml: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      threadId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isRead: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
      },
      imid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      inReplyTo: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      scheduledAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      snippet: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isArchive: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isTrashed: {
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
