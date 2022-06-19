import React from 'react';
import styles from './ChangeStatusSelect.module.scss';
import {changeOrderStatus} from "../../http/orderAPI";
import {useDispatch} from "react-redux";
import {openPopup} from "../../store/Popup/actions";

const ChangeStatusSelect = ({ order_id, currentStatus, forOrder }) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        changeOrderStatus(order_id, e.target.value, forOrder).then(data => dispatch(openPopup(data.data, false)))
    }

    return (
        <select onChange={(e) => handleChange(e)} className={styles.select}>
            <option value={currentStatus}>{currentStatus}</option>
            <option value="Активний">Активний</option>
            <option value="В роботі">В роботі</option>
            <option value="Відправленно">Відправленно</option>
        </select>
    );
};

export default ChangeStatusSelect;