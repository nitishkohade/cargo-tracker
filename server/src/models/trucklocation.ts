'use strict';

import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class TruckLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Truck, {foreignKey: 'truckId'})
    }
  };
  TruckLocation.init({
    truckId: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      references: {
        model: 'Trucks',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TruckLocation',
    updatedAt: false,
    indexes: [
        {
            unique: false,
            fields: ['truckId']
        },
    ]
  });
  return TruckLocation;
};