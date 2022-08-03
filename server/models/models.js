const sequelize = require('../dataBase');
const {DataTypes} = require('sequelize');

// const ropesInStock = sequelize.define('ropesInStock', {
const products = sequelize.define('products', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        color_id: {type: DataTypes.STRING},
        quantity: {type: DataTypes.INTEGER},
        brand_id: {type: DataTypes.INTEGER}
    },
    {timestamps: false});

// const ropesBrand = sequelize.define('ropesBrand', {
const brand = sequelize.define('brand', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        brand_name: {type: DataTypes.STRING, unique: true}
    },
    {timestamps: false});

const users = sequelize.define('users', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, unique: true},
        name: {type: DataTypes.STRING},
        surname: {type: DataTypes.STRING},
        shop_id: {type: DataTypes.INTEGER},
        password: {type: DataTypes.STRING},
        role: {type: DataTypes.STRING, allowNull: false, default: 'USER'},
        is_activated: {type: DataTypes.BOOLEAN, allowNull: false, default: false},
        activation_link: {type: DataTypes.STRING}
    },
    {timestamps: false})

const userTokens = sequelize.define('userTokens', {
    user_id: {type: DataTypes.INTEGER},
    refresh_token: {type: DataTypes.STRING, required: true}
})

const shopAddresses = sequelize.define('shopAddresses', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        address: {type: DataTypes.STRING, unique: true}
    },
    {timestamps: false})


const orders = sequelize.define('orders', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        user_id: {type: DataTypes.INTEGER},
        shop_id: {type: DataTypes.INTEGER},
        brand_id: {type: DataTypes.INTEGER},
        order_status: {type: DataTypes.STRING, default: false},
        order_date: {type: DataTypes.STRING}
    },
    {timestamps: false})

const orderDetails = sequelize.define('orderDetails', {
    order_id: {type: DataTypes.INTEGER},
    color_id: {type: DataTypes.STRING},
    quantity: {type: DataTypes.INTEGER},
    is_available: {type: DataTypes.BOOLEAN, defaultValue: true}
},
    {timestamps: false})



const productsForOrder = sequelize.define('productsForOrder', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    shop_id: {type: DataTypes.INTEGER},
    brand_id: {type: DataTypes.INTEGER},
    order_status: {type: DataTypes.STRING, default: false},
    order_date: {type: DataTypes.STRING}
},
    {timestamps: false})

const productsForOrderDetails = sequelize.define('productsForOrderDetails', {
    order_id: {type: DataTypes.INTEGER},
    color_id: {type: DataTypes.STRING},
    quantity: {type: DataTypes.INTEGER}
},
    {timestamps: false})

// brand.hasMany(products, {foreignKey: 'brand_id'});
// products.belongsTo(brand);
//
// users.hasMany(orders, {foreignKey: 'order_id'});
// orders.belongsTo(users);
//
// users.hasOne(shopAddresses);
// shopAddresses.belongsTo(users);
//
// orders.hasOne(orderDetails, {foreignKey: 'order_id'});
// orderDetails.belongsTo(orders);
//
// productsForOrder.hasOne(productsForOrderDetails, {foreignKey: 'order_id'});
// productsForOrderDetails.belongsTo(productsForOrder);

module.exports = {
    brand,
    products,
    users,
    orders,
    shopAddresses,
    userTokens,
    orderDetails,
    productsForOrder,
    productsForOrderDetails
}