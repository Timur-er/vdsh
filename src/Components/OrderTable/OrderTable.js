import React, {useEffect, useRef, useState} from 'react';
import styles from './OrderTable.module.scss';
import Icons from "../Icons/Icons";
import Modal from "../Modal/Modal";
import OrderDetailsTable from "../OrderDetailsTable/OrderDetailsTable";
import {openModal} from "../../store/modal/actions";
import {useDispatch, useSelector} from "react-redux";
import {getIsModalOpen} from "../../store/modal/selectors";
import ChangeStatusSelect from "../ChangeStatusSelect/ChangeStatusSelect";
import Button from "../Button/Button";
import {getExcel} from "../../http/orderAPI";

const OrderTable = ({orders, forManager, forOrder}) => {
    const dispatch = useDispatch();
    const [details, setDetails] = useState(null);
    const isModalOpen = useSelector(getIsModalOpen)
    const selectRef = useRef();

    const openDetails = (details) => {
        dispatch(openModal(true))
        setDetails(details);
    }

    const downloadExcel = async (orderId) => {
        await getExcel(orderId);
    }

    const renderRows = orders !== null && orders.map((order, index) => {
        const {brand_name, order_date, order_id, order_status, order_details, shop_address} = order
        return (
            <tr key={index} className={styles.table__row}>
                <td className={styles.table__cell}>
                    {order_id}
                </td>

                <td className={styles.table__cell}>
                    {brand_name}
                </td>

                {
                    forManager &&
                    <td className={styles.table__cell}>
                        {shop_address}
                    </td>
                }

                <td className={styles.table__cell}>
                    {order_date}
                </td>

                <td className={styles.table__cell} ref={selectRef}>
                    {forManager ? <ChangeStatusSelect order_id={order_id} currentStatus={order_status} forOrder={forOrder}/> : order_status}
                </td>
                <td className={styles.table__cell}>
                    <div className={styles.table__buttonsWrapper}>
                        <Button text='Деталі' type='detailsBtn' onClick={() => openDetails(order_details)}/>
                        {forManager && <Button text='Завантажити таблицю' type='detailsBtn' onClick={() => downloadExcel(order_id)}/>}
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <>
            {orders !== null && orders.length !== 0 ? (<div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.table__header}>
                    <tr>
                        <td className={styles.table__headerCell}>ID</td>
                        <td className={styles.table__headerCell}>Бренд</td>
                        {forManager && <td className={styles.table__headerCell}>Магазин</td>}
                        <td className={styles.table__headerCell}>Дата</td>
                        <td className={styles.table__headerCell}>Статус</td>
                    </tr>
                    </thead>
                    <tbody className={styles.table__body}>
                    {renderRows}
                    </tbody>
                </table>
            </div>
          ) : 'нажаль товарів ще немає'}
            {isModalOpen &&
                <Modal>
                    <OrderDetailsTable orderDetails={details}/>
                </Modal>
            }
        </>
    );
};

export default OrderTable;