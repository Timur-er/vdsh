import React, {useState} from 'react';
import styles from './OrderTable.module.scss';
import Icons from "../Icons/Icons";
import Modal from "../Modal/Modal";
import OrderDetailsTable from "../OrderDetailsTable/OrderDetailsTable";
import {openModal} from "../../store/modal/actions";
import {useDispatch, useSelector} from "react-redux";
import {getIsModalOpen} from "../../store/modal/selectors";

const OrderTable = ({orders, forManager}) => {
    const dispatch = useDispatch();
    const [details, setDetails] = useState(null);
    const isModalOpen = useSelector(getIsModalOpen)

    const openDetails = (details) => {
        dispatch(openModal(true))
        setDetails(details);
    }

    const renderRows = orders !== null && orders.map(order => {
        const {brandName, order_date, order_id, order_status, orderDetails, shop_address} = order
        return (
            <tr onClick={() => openDetails(orderDetails)} className={styles.table__row}>
                <td className={styles.table__cell}>
                    {order_id}
                </td>

                <td className={styles.table__cell}>
                    {brandName}
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

                <td className={styles.table__cell}>
                    {order_status}
                    {/*{forManager &&*/}
                    {/*    <Icons width={"15px"} height={"15px"} type={'pencilIcon'} color={'#6495EDFF'}/>*/}
                    {/*}*/}
                </td>
            </tr>
        )
    })

    return (
        <>
            <div className={styles.tableWrapper}>
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
            {isModalOpen &&
                <Modal>
                    <OrderDetailsTable orderDetails={details}/>
                </Modal>
            }
        </>
    );
};

export default OrderTable;