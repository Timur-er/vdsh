import React, {useEffect, useState} from 'react';
import styles from './RopesInStockPage.module.scss';
import {getAllRopesBrand, getRopesByBrand} from "../../http/ropesAPI";
import RopesTable from "../../Components/RopesTable/RopesTable";
import {useDispatch, useSelector} from "react-redux";
import {setOrderBrandOperation, setShopAddressOperation} from "../../store/ropesOrder/operations";
import {getRopesOrder} from "../../store/ropesOrder/selectors";
import {getShopId} from "../../store/User/selectors";
import Button from "../../Components/Button/Button";

const RopesInStockPage = () => {
    const [ropes, setRopes] = useState(null);
    const [ropesBrand, setRopesBrand] = useState([]);
    const shop_id = useSelector(getShopId);
    const order = useSelector(getRopesOrder);
    const dispatch = useDispatch();

    useEffect( () => {
        async function fetchedBrands() {
            const brands = await getAllRopesBrand();
            return brands.data;
        }
        dispatch(setShopAddressOperation(shop_id));
        fetchedBrands().then(data => setRopesBrand(data))
    }, [])

    const getRopes = async (brand, id) => {
        if (order.length > 0) {
            alert('Вы не подтвердили заказ')
        } else {
            const ropes = await getRopesByBrand(id)
            dispatch(setOrderBrandOperation(brand, id))
            setRopes(ropes.data)
        }
    }

    const selectBrandButtons = ropesBrand.map(brand => {
        const {brandName, id} = brand;
        // return <button className={styles.selectBrandButton} key={id}
        //                onClick={() => getRopes(brandName, id)}>{brandName}</button>
        return <Button onClick={() => getRopes(brandName, id)} text={brandName} />
    })

    return (

        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>Выберете производителя:</h1>
                <div className={styles.headerButtons}>
                    {selectBrandButtons}
                </div>
            </header>

            <main className={styles.ropesTableSection}>
                {ropes !== null && <RopesTable ropes={ropes}/>}
            </main>
        </div>

    );
};

export default RopesInStockPage;