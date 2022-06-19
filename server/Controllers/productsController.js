const {ropesInStock, ropesBrand} = require('../models/models');
// rename models to products

class controller {
    async addProductBrand(req, res) {
        const {brand_name} = req.body;
        const is_brand_exist = await ropesBrand.findAll({where: {brand_name}});
        if (!is_brand_exist.length) {
            const new_rope_brand = await ropesBrand.create({brand_name});
            return res.json(new_rope_brand.id);
        } else {
            const {dataValues} = is_brand_exist[0];
            return res.json(dataValues.id)
        }
    }

    async addProducts(req, res) {
        const {order, brand_id} = req.body;
        try {
            for (const rope of order) {
                const {color_id, quantity} = rope;
                await ropesInStock.create({color_id, quantity, brand_id})
            }
        } catch (e) {
           return  res.json(e.message);
        }
        res.json('added ropes to bd')
    }

    async getAllProductsByBrand(req, res) {
        const brand_id = req.params.id;
        const ropes = await ropesInStock.findAll({where: {brand_id}});
        return res.json(ropes);
    }

    async getAllProducts(req, res) {
        const ropes = await ropesInStock.findAll();
        return res.json(ropes)
    }

    async isBrandExist(req, res) {
        const brand_name = req.body.brand_name
        const brand = await ropesBrand.findAll({where: {brand_name}})
        return res.json(brand)
    }

    async getBrandId(req, res) {
        const brand_name = req.params.brand_name;
        const brand = await ropesBrand.findAll({where: {brand_name}});
        return res.json(brand)
    }

    async getAllBrands(req, res) {
        const brand = await ropesBrand.findAll();
        return res.json(brand);
    }
}


module.exports = new controller();