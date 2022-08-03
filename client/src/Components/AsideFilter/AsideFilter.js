import React, {useState} from 'react';
import SearchByNoField from "../SeacrhByNoField/SearchByNoField";
import {getProductsByBrand} from "../../http/productsAPI";
import styles from './AsideFilter.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getUserRole} from "../../store/User/selectors";
import {addRopeBrandToOrder, clearOrder} from "../../store/ropesOrder/actions";


const AsideFilter = ({ brands, getFilteredProducts, setBrandId }) => {
    const [dbProducts, setDbProducts] = useState(null);
    const userRole = useSelector(getUserRole);
    const dispatch = useDispatch();

    const renderOptions = brands.map(brand => {
        const { brand_name, id } = brand;
        return <option key={id} value={id}>{brand_name}</option>
    })

    const brandSet = async (e) => {
        const brand_id = +e.target.value;
        const brand_name = e.target.children[brand_id].innerHTML;
        const products = await getProductsByBrand(brand_id)
        if (userRole === 'USER') {
            dispatch(clearOrder());
            dispatch(addRopeBrandToOrder({brand_id, brand_name}))
        } else {
            setBrandId(brand_id)
        }
        setDbProducts(products.data)
        getFilteredProducts(products.data)
    }

    return (
        <div className={styles.aside__wrapper}>
            <div>
                <SearchByNoField getFilteredProducts={getFilteredProducts} products={dbProducts}/>
            </div>
            <div>
                <span className={styles.aside__option_title}>Виробник: </span>
                <select className={styles.aside__options} name="brand" id="1" onChange={(e) => brandSet(e)}>
                    <option value="all"></option>
                    {renderOptions}
                </select>
            </div>
        </div>
    );
};

export default AsideFilter;