'use strict';

import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Truck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.TruckLocation, {foreignKey: 'truckId'})
    }
  };
  Truck.init({
    model: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    licensePlate: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    currentDistance_KM: {
        type: DataTypes.INTEGER(5),
        allowNull: false
    },
    maxLoad_KG: {
        type: DataTypes.INTEGER(5),
        allowNull: false
    },
    fuelType: {
        type: DataTypes.ENUM('GAS', 'DIESEL', 'ELECTRIC'),
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Truck',
    indexes: [
      {
          unique: true,
          fields: ['licensePlate']
      }
    ]
  });
  return Truck;
};