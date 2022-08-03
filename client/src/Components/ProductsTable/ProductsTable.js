import React from 'react';
import SelectQuantity from "../SelectQuanity/SelectQuantity";
import {useDispatch, useSelector} from "react-redux";
import {getOrder, getRopesOrder} from "../../store/ropesOrder/selectors";
import {getUserId} from "../../store/User/selectors";
import {createOrder} from "../../http/orderAPI";
import {clearOrder} from "../../store/ropesOrder/actions";
import Button from "../Button/Button";
import {openPopup} from "../../store/Popup/actions";
import styles from './ProductsTable.module.scss';

const ProductsTable = ({ropes}) => {
    const orderData = useSelector(getOrder);
    const user_id = useSelector(getUserId);
    const dispatch = useDispatch();
    const storeOrder = useSelector(getRopesOrder);

    const ropesTable = ropes.map(product => {
        const storeQuantity = storeOrder.find(storeProduct => storeProduct.color_id === product.color_id)
        return (
            <div key={product.id} className={styles.ropeItem}>
                <div className={styles.ropeId}>
                    {product.color_id}
                </div>
                <div>
                    <SelectQuantity color_id={product.color_id} storeQuantity={storeQuantity}/>
                </div>
            </div>
        )
    })

    const confirmOrder = async () => {
        const {shop_id, brand_data, order} = orderData;
        const fetchedOrder = await createOrder(user_id, shop_id, brand_data.brand_id, order);
        dispatch(openPopup(fetchedOrder.data, false))
        dispatch(clearOrder())
    }

    return (
        <>
            <div>
                <div className={styles.table}>
                    {
                        ropes.length !== 0
                            ? ropesTable
                            : "Нажаль товарів ще нема"
                    }
                </div>
                {
                    ropes.length !== 0 && orderData.order.length !== 0
                        ? <Button onClick={() => confirmOrder()} text={'Оформить заказ'}/>
                        : null
                }
            </div>
        </>
    );
};

export default ProductsTable;