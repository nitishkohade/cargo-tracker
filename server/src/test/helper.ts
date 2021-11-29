const {DataTypes} = require('sequelize');

var SequelizeMock = require('sequelize-mock');
var DBConnectionMock = new SequelizeMock();

const Truck = DBConnectionMock.define('Truck', {
    "model": "truck1",
    "year": "2017",
    "licensePlate": "RT456YU",
    "currentDistance_KM": "400",
    "maxLoad_KG": "3000",
    "fuelType": "GAS"
    }, 
      {
        instanceMethods: {
        },
        classMethods: {
            
        }
});

const TruckLocation = DBConnectionMock.define('TruckLocation', {
}, {
    instanceMethods: {
        myTestFunc: function () {
            return 'Test Truck Location';
        },
    },
});


module.exports = {
    Truck,
    TruckLocation,
    DBConnectionMock
}