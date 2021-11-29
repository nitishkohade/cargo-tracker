'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable("Trucks", {
        id: {
          type: Sequelize.INTEGER(6),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        model: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        year: {
            type: Sequelize.INTEGER(4),
            allowNull: false
        },
        licensePlate: {
            unique: true,
            type: Sequelize.STRING(10),
            allowNull: false
        },
        currentDistance_KM: {
            type: Sequelize.INTEGER(5),
            allowNull: false
        },
        maxLoad_KG: {
            type: Sequelize.INTEGER(5),
            allowNull: false
        },
        fuelType: {
            type: Sequelize.ENUM('GAS', 'DIESEL', 'ELECTRIC'),
            allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()')
        }
    },
    {
      indexes: [
          {
              unique: true,
              fields: ['licensePlate']
          }
      ]
    }
    )
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Trucks")
  }
};
