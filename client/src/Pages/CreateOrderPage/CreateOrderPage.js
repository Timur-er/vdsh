import React, {useEffect, useState} from 'react';
import {getAllBrands} from "../../http/productsAPI";
import ProductsTable from "../../Components/ProductsTable/ProductsTable";
import {useDispatch, useSelector} from "react-redux";
import {setShopAddressOperation} from "../../store/ropesOrder/operations";
import {getShopId} from "../../store/User/selectors";
import styles from './CreateOrderPage.module.scss';
import AsideFilter from "../../Components/AsideFilter/AsideFilter";

const CreateOrderPage = () => {
    const [ropesBrand, setRopesBrand] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const shop_id = useSelector(getShopId);
    const [brandId, setBrandId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchedBrands() {
            const brands = await getAllBrands();
            return brands.data;
        }

        dispatch(setShopAddressOperation(shop_id));
        fetchedBrands().then(data => setRopesBrand(data))
    }, [dispatch, shop_id])

    const getFilteredProducts = (data) => {
        setFilteredProducts(data)
    }

    return (
        <div className={styles.pageContainer}>

            <header className={styles.header}>
                <AsideFilter brands={ropesBrand} getFilteredProducts={getFilteredProducts} setBrandId={setBrandId} />
            </header>

            <main className={styles.body}>
                <div className={styles.ropesTableSection}>
                    {filteredProducts !== null && <ProductsTable ropes={filteredProducts}/>}
                </div>
                <div>

                </div>
            </main>
        </div>


    );
};

export default CreateOrderPage;