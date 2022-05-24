const {ropesBrand} = require('../models/models');

class BrandService {
    async getBrandName(brand_id) {
        const brand_name = await ropesBrand.findOne({where: {id: brand_id}});
        return brand_name.brandName;
    }
}

module.exports = new BrandService();