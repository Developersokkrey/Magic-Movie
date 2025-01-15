'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('images', {
      RecID: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // If you want to set the UUID as default
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ImageURL: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ActorsRecID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MovieRecID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('images');
  },
};
