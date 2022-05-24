import React, {useEffect, useState} from 'react';
import styles from './CreateOrderPage.module.scss';
import {getAllRopesBrand, getRopesByBrand} from "../../http/ropesAPI";
import RopesTable from "../../Components/RopesTable/RopesTable";
import {useDispatch, useSelector} from "react-redux";
import {setOrderBrandOperation, setShopAddressOperation} from "../../store/ropesOrder/operations";
import {getRopesOrder} from "../../store/ropesOrder/selectors";
import {getShopId} from "../../store/User/selectors";
import Button from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import HeaderButtons from "../../Components/HeaderButtons/HeaderButtons";

const CreateOrderPage = () => {
    const [ropes, setRopes] = useState(null);
    const [ropesBrand, setRopesBrand] = useState([]);
    const shop_id = useSelector(getShopId);
    const order = useSelector(getRopesOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchedBrands() {
            const brands = await getAllRopesBrand();
            return brands.data;
        }

        dispatch(setShopAddressOperation(shop_id));
        fetchedBrands().then(data => setRopesBrand(data))
    }, [dispatch, shop_id])

    const getRopes = async (brand, id) => {
        if (order.length > 0) {
            alert('Ви не підтвердили замовлення')
        } else {
            const ropes = await getRopesByBrand(id)
            dispatch(setOrderBrandOperation(brand, id))
            setRopes(ropes.data)
        }
    }

    const selectBrandButtons = ropesBrand.map(brand => {
        const {brandName, id} = brand;
        return <Button key={id} onClick={() => getRopes(brandName, id)} text={brandName}/>
    })

    return (
        <div className={styles.pageContainer}>

            <HeaderButtons>
                {ropesBrand.length === 0 ? 'Нажаль товарів ще нема' : selectBrandButtons}
            </HeaderButtons>

            <main className={styles.body}>
                <div className={styles.ropesTableSection}>
                    {ropes !== null && <RopesTable ropes={ropes}/>}
                </div>
            </main>
        </div>


    );
};

export default CreateOrderPage;