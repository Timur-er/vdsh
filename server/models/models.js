const sequelize = require('../dataBase');
const {DataTypes} = require('sequelize');

const ropesInStock = sequelize.define('ropesInStock', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    color_id: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER},
    brandId: {type: DataTypes.INTEGER}
});

const ropesBrand = sequelize.define('ropesBrand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    brandName: {type: DataTypes.STRING, unique: true}
});

ropesBrand.hasMany(ropesInStock);
ropesInStock.belongsTo(ropesBrand);

module.exports = {
    ropesBrand,
    ropesInStock
}