const sequelize = require('../dataBase');
const {DataTypes} = require('sequelize');

const ropesInStock = sequelize.define('ropesInStock', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        color_id: {type: DataTypes.STRING},
        quantity: {type: DataTypes.INTEGER},
        brand_id: {type: DataTypes.INTEGER}
    },
    {timestamps: false});

const ropesBrand = sequelize.define('ropesBrand', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        brand_name: {type: DataTypes.STRING, unique: true}
    },
    {timestamps: false});

const Users = sequelize.define('users', {
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

const UserTokens = sequelize.define('userTokens', {
    user_id: {type: DataTypes.INTEGER},
    refresh_token: {type: DataTypes.STRING, required: true}
})

const ShopAddresses = sequelize.define('shopAddresses', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        address: {type: DataTypes.STRING, unique: true}
    },
    {timestamps: false})


const Orders = sequelize.define('orders', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        user_id: {type: DataTypes.INTEGER},
        shop_id: {type: DataTypes.INTEGER},
        brand_id: {type: DataTypes.INTEGER},
        order_status: {type: DataTypes.STRING, default: false},
        order_date: {type: DataTypes.STRING}
    },
    {timestamps: false})

const OrderDetails = sequelize.define('orderDetails', {
    order_id: {type: DataTypes.INTEGER},
    color_id: {type: DataTypes.STRING},
    quantity: {type: DataTypes.INTEGER},
    is_available: {type: DataTypes.BOOLEAN, defaultValue: true}
})



const ProductsForOrder = sequelize.define('productsForOrder', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    shop_id: {type: DataTypes.INTEGER},
    brand_id: {type: DataTypes.INTEGER},
    order_status: {type: DataTypes.STRING, default: false},
    order_date: {type: DataTypes.STRING}
})

const ProductsForOrderDetails = sequelize.define('productsForOrderDetails', {
    order_id: {type: DataTypes.INTEGER},
    color_id: {type: DataTypes.STRING},
    quantity: {type: DataTypes.INTEGER}
})

ropesBrand.hasMany(ropesInStock);
ropesInStock.belongsTo(ropesBrand);

Users.hasOne(Orders);
Orders.belongsTo(Users);

Users.hasOne(ShopAddresses);
ShopAddresses.belongsTo(Users);

// Users.belongsToMany(ShopAddresses, {through: Orders});
// ShopAddresses.belongsToMany(Users, {through: Orders});

module.exports = {
    ropesBrand,
    ropesInStock,
    Users,
    Orders,
    ShopAddresses,
    UserTokens,
    OrderDetails,
    ProductsForOrder,
    ProductsForOrderDetails
}