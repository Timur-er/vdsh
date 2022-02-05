import React, {useCallback, useEffect, useState} from 'react';
import Container from "../../Components/Container/Container";
import {useHttp} from "../../Hooks/http.hook";
import styles from './RopesInStockPage.module.scss';
import CreateItemInfo from "../../Components/CreateItemInfo/CreateItemInfo";
import {getAllRopes, getAllRopesBrand, getRopesByBrand} from "../../http/ropesAPI";
import RopesTable from "../../Components/RopesTable/RopesTable";
import {useDispatch, useSelector} from "react-redux";
import {setOrderBrandOperation, setShopAddressOperation} from "../../store/ropesOrder/operations";
import {getRopesOrder} from "../../store/ropesOrder/selectors";
import {getShopId} from "../../store/User/selectors";

const RopesInStockPage = () => {
    const [ropes, setRopes] = useState(null);
    const [ropesBrand, setRopesBrand] = useState([]);
    const shop_id = useSelector(getShopId);
    const order = useSelector(getRopesOrder);
    const dispatch = useDispatch();

    useEffect(async () => {
        const fetchedBrands = await getAllRopesBrand();
        dispatch(setShopAddressOperation(shop_id));
        setRopesBrand(fetchedBrands.data)
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
        return <button className={styles.selectBrandButton} key={id} onClick={() => getRopes(brandName, id)}>{brandName}</button>
    })

    return (
        <Container>
            <div>
                <h1>Выберете производителя:</h1>
                <div className={styles.selectBrandSection}>
                    {selectBrandButtons}
                </div>
                {/*<CreateItemInfo/>*/}
                <div className={styles.ropesTableSection}>
                    {ropes !== null && <RopesTable ropes={ropes}/>}
                </div>
                {/*<div className={styles.confirmOrderSection}>*/}
                {/*    <button className={styles.confirmOrderBtn}>confirm order</button>*/}
                {/*</div>*/}
            </div>
        </Container>
    );
};

export default RopesInStockPage;