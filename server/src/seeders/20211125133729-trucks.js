'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Trucks', [
      {
        model: "Truck_1",
        year: 2000,
        licensePlate: "RT456YU",
        currentDistance_KM: 400,
        maxLoad_KG: 5000,
        fuelType: "GAS"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Trucks', null, {});
  }
};
