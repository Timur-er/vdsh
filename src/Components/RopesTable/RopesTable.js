import React from 'react';
import styles from './RopesTable.module.scss';
import SelectQuantity from "../SelectQuanity/SelectQuantity";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../store/ropesOrder/selectors";
import {getUserId} from "../../store/User/selectors";
import {createOrder} from "../../http/orderAPI";
import {clearOrder} from "../../store/ropesOrder/actions";
import Button from "../Button/Button";


const RopesTable = ({ropes}) => {
    const orderData = useSelector(getOrder);
    const user_id = useSelector(getUserId);
    const dispatch = useDispatch();

    const ropesTable = ropes.map(rope => {
        return (
            <div key={rope.id} className={styles.ropeItem}>
                <div className={styles.ropeId}>
                    {rope.color_id}
                </div>
                <div>
                    <SelectQuantity color_id={rope.color_id}/>
                </div>
            </div>
        )
    })

    const confirmOrder = async (e) => {
        // e.preventDefault();
        const {shop_id, brandData, order} = orderData;
        const {id: brand_id} = brandData;
        await createOrder(user_id, shop_id, brand_id, order);
        dispatch(clearOrder())
    }

    return (
        <>
            <div>
                <div className={styles.table}>
                    {ropes.length !== 0 ? ropesTable : "Нажаль товарів ще нема"}
                </div>
                {ropes.length !== 0 ? <Button onClick={(e) => confirmOrder(e)} text={'Оформить заказ'}/> : null}
            </div>
        </>
    );
};

export default RopesTable;