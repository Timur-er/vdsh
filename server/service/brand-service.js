const {ropesBrand} = require('../models/models');

class BrandService {
    async getBrandName(brand_id) {
        const brand = await ropesBrand.findOne({where: {id: brand_id}});
        return brand.brand_name;
    }
}

module.exports = new BrandService();