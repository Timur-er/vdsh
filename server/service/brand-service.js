const {ropesBrand} = require('../models/models');

class BrandService {
    async getBrandName(brand_id) {
        const brand = await ropesBrand.findOne({where: {id: brand_id}});
        return brand.brand_name;
    }

    async getBrandId(brand_name) {
        const data = await ropesBrand.findOne({where: {brand_name: brand_name}});
        return data.id;
    }
}

module.exports = new BrandService();