'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import * as configs from '../env'

const dbConfig = configs.DB_CONFIG[env]

type dbProps = {
  sequelize?: any
  Sequelize?: any
  Truck?: any
  TruckLocation?: any
}

const db: dbProps = {};

let sequelize;

if(process.env.NODE_ENV === 'test') {
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
} else {
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// // An Alternative way to mock the sequelize
// const {Truck, TruckLocation, DBConnectionMock} =  require('../test/helper')

// db.Truck = Truck
// db.TruckLocation = TruckLocation
// db.sequelize = DBConnectionMock

export default db;
