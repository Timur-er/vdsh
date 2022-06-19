import React, {useEffect, useState} from 'react';
import styles from './CreateOrderPage.module.scss';
import {getAllBrands, getProductsByBrand} from "../../http/productsAPI";
import ProductsTable from "../../Components/ProductsTable/ProductsTable";
import {useDispatch, useSelector} from "react-redux";
import {setOrderBrandOperation, setShopAddressOperation} from "../../store/ropesOrder/operations";
import {getRopesOrder} from "../../store/ropesOrder/selectors";
import {getShopId} from "../../store/User/selectors";
import Button from "../../Components/Button/Button";
import HeaderButtons from "../../Components/HeaderButtons/HeaderButtons";
import {openPopup} from "../../store/Popup/actions";

const CreateOrderPage = () => {
    const [ropes, setRopes] = useState(null);
    const [ropesBrand, setRopesBrand] = useState([]);
    const shop_id = useSelector(getShopId);
    const order = useSelector(getRopesOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchedBrands() {
            const brands = await getAllBrands();
            return brands.data;
        }

        dispatch(setShopAddressOperation(shop_id));
        fetchedBrands().then(data => setRopesBrand(data))
    }, [dispatch, shop_id])

    const getRopes = async (brand, id) => {
        if (order.length > 0) {
            dispatch(openPopup('Ви не підтвердили замовлення!', true))
        } else {
            const ropes = await getProductsByBrand(id)
            dispatch(setOrderBrandOperation(brand, id))
            setRopes(ropes.data)
        }
    }

    const selectBrandButtons = ropesBrand.map(brand => {
        const {brand_name, id} = brand;
        return <Button key={id} onClick={() => getRopes(brand_name, id)} text={brand_name}/>
    })

    return (
        <div className={styles.pageContainer}>

            <HeaderButtons>
                {ropesBrand.length === 0 ? 'Нажаль товарів ще нема' : selectBrandButtons}
            </HeaderButtons>

            <main className={styles.body}>
                <div className={styles.ropesTableSection}>
                    {ropes !== null && <ProductsTable ropes={ropes}/>}
                </div>
            </main>
        </div>


    );
};

export default CreateOrderPage;