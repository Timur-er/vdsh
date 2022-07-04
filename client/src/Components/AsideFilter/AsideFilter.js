import React, {useState} from 'react';
import SearchByNoField from "../SeacrhByNoField/SearchByNoField";
import {getProductsByBrand} from "../../http/productsAPI";
import styles from './AsideFilter.module.scss';


const AsideFilter = ({ brands, getFilteredProducts, setBrandId }) => {
    const [dbProducts, setDbProducts] = useState(null);

    const renderOptions = brands.map(brand => {
        const { brand_name, id } = brand;
        return <option key={id} value={id}>{brand_name}</option>
    })

    const brandSet = async (e) => {
        const brand_id = e.target.value;
        const products = await getProductsByBrand(brand_id)
        setDbProducts(products.data)
        getFilteredProducts(products.data)
        setBrandId(brand_id)
    }

    return (
        <div className={styles.aside__wrapper}>
            <div>
                <SearchByNoField getFilteredProducts={getFilteredProducts} products={dbProducts}/>
            </div>
            <div>
                <span>Виробник: </span>
                <select className={styles.aside__options} name="brand" id="1" onChange={(e) => brandSet(e)}>
                    <option value="all"></option>
                    {renderOptions}
                </select>
            </div>
        </div>
    );
};

export default AsideFilter;