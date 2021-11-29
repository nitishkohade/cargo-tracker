'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TruckLocations', [
      {
        truckId: 1,
        latitude: 34.9090,
        longitude: 45.900
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('TruckLocations', null, {});
  }
};
