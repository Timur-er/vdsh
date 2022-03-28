import React from 'react';
import styles from './RopesTable.module.scss';
import SelectQuantity from "../SelectQuanity/SelectQuantity";
import {useSelector} from "react-redux";
import {getOrder} from "../../store/ropesOrder/selectors";
import {getUserId} from "../../store/User/selectors";
import {createOrder} from "../../http/orderAPI";


const RopesTable = ({ropes}) => {
    const orderData = useSelector(getOrder);
    const user_id = useSelector(getUserId);

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
        e.preventDefault();
        const {shop_id, brandData, order} = orderData;
        const {id: brand_id} = brandData;
        await createOrder(user_id, shop_id, brand_id, order);
    }

    return (
        <>
            <div>
                <div className={styles.table}>
                    {ropesTable}
                </div>
                <button onClick={(e) => confirmOrder(e)} className={styles.submitOrder}>Оформить заказ</button>
            </div>
        </>
    );
};

export default RopesTable;