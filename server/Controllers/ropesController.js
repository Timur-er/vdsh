// const db = require('../dataBase');
const {ropesInStock, ropesBrand} = require('../models/models');
const ApiError = require('../ApiError/ApiError');
const {where} = require("sequelize");


class controller {
    async addRopeBrand(req, res) {
        const {brand} = req.body;
        const newRopeBrand = await ropesBrand.create({brand});
        console.log(newRopeBrand.id)
        res.json(newRopeBrand.id);
    }

    async addRopeItem(req, res) {
        const {order, brandId} = req.body;
        try {
            for (const rope of order) {
                const {color_id, quantity} = rope;
                await ropesInStock.create({color_id, quantity, brandId})
            }
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }

        // console.log(color_id, quantity);
        // const newRopeItem = await db.query('INSERT INTO ropesinstock (color_id, quantity, brand) values($1, $2, $3) RETURNING *', [color_id, quantity, brand])
        res.json('added ropes to bd')
    }

    async getAllRopesByBrand(req, res) {
        const brand = req.body.brand;
        console.log(brand);
        const ropes = await ropesInStock.findAll({where: {brand}});
        res.json(ropes);
    }

    async createOrder (req, res) {

    }

    async addProduct (req, res) {

    }

    async getAllRopes (req, res) {

    }
}

module.exports = new controller();