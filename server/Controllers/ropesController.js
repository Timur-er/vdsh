const {ropesInStock, ropesBrand} = require('../models/models');


class controller {
    async addRopeBrand(req, res) {
        const {brandName} = req.body;
        const isBrandExist = await ropesBrand.findAll({where: {brandName}});
        if (!isBrandExist.length) {
            const newRopeBrand = await ropesBrand.create({brandName});
            return res.json(newRopeBrand.id);
        } else {
            const {dataValues} = isBrandExist[0];
            return res.json(dataValues.id)
        }
    }

    async addRopesItems(req, res) {
        const {order, brandId} = req.body;
        try {
            for (const rope of order) {
                const {color_id, quantity} = rope;
                await ropesInStock.create({color_id, quantity, brandId})
            }
        } catch (e) {
           return  res.json(e.message);
        }
        res.json('added ropes to bd')
    }

    async getAllRopesByBrand(req, res) {
        const brandId = req.params.id;
        const ropes = await ropesInStock.findAll({where: {brandId}});
        return res.json(ropes);
    }

    async createOrder(req, res) {
    }

    async addProduct(req, res) {

    }

    async getAllRopes(req, res) {
        const ropes = await ropesInStock.findAll();
        return res.json(ropes)
    }

    async isBrandExist(req, res) {
        const brandName = req.body.brandName
        const brand = await ropesBrand.findAll({where: {brandName}})
        return res.json(brand)
    }

    async getAllBrands(req, res) {
        const brand = await ropesBrand.findAll();
        return res.json(brand);
    }
}


module.exports = new controller();