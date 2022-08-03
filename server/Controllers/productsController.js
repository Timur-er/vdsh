const {products, brand: brand_model} = require('../models/models');

class controller {
    async addProductBrand(req, res) {
        const {brand_name} = req.body;
        const is_brand_exist = await brand_model.findAll({where: {brand_name}});
        if (!is_brand_exist.length) {
            const new_rope_brand = await brand_model.create({brand_name});
            return res.json(new_rope_brand.id);
        } else {
            const {dataValues} = is_brand_exist[0];
            return res.json(dataValues.id)
        }
    }

    async addProducts(req, res) {
        const {order, brand_id} = req.body;
        let duplicate = [];
        try {
            for (const rope of order) {
                const {color_id, quantity} = rope;
                const id = `${color_id}${brand_id}`;
                const duplicateItem = await products.findAll({where: {id, color_id, brand_id}});
                if  (duplicateItem?.length) {
                    const {dataValues} = duplicateItem[0];
                    duplicate.push({color_id: dataValues.color_id, brand_id: dataValues.brand_id});
                } else {
                    await products.create({id, color_id, quantity, brand_id})
                }
            }
        } catch (e) {
            return  res.json(e.message);
        }
        if (duplicate.length !== 0 ) {
            res.statusMessage = 'Duplicate'
            res.json(duplicate)
        } else {
            res.json('Товар успішно додано!')
        }
    }

    async getAllProductsByBrand(req, res) {
        const brand_id = req.params.id;
        let prod;
        if (brand_id === 'all') {
            prod = null
        } else {
            prod = await products.findAll({where: {brand_id}});
        }
        return res.json(prod);
    }

    async getAllProducts(req, res) {
        const prod = await products.findAll();
        return res.json(prod)
    }

    async isBrandExist(req, res) {
        const brand_name = req.body.brand_name
        const brand = await brand_model.findAll({where: {brand_name}})
        return res.json(brand)
    }

    async getBrandId(req, res) {
        const brand_name = req.params.brand_name;
        const brand = await brand_model.findAll({where: {brand_name}});
        return res.json(brand)
    }

    async getAllBrands(req, res) {
        const brand = await brand_model.findAll();
        return res.json(brand);
    }

    async changeProductInfo(req, res) {
        const { prev_product_id, new_product_id, quantity, brand_id } = req.params;
        console.log(req.params);
        const product = await products.update({color_id: new_product_id, quantity: quantity}, {where: {color_id: prev_product_id, brand_id: brand_id}});
        return res.json('Дані змінено успішно!')
    }
}


module.exports = new controller();