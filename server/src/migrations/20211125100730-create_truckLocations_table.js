'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable("TruckLocations", {
        id: {
            type: Sequelize.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        truckId: {
          type: Sequelize.INTEGER(6),
          allowNull: false,
          references: {
            model: 'Trucks',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        latitude: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        longitude: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        }
    },
    {
      indexes: [
          {
              unique: false,
              fields: ['truckId']
          },
      ]
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("TruckLocations")
  }
};
