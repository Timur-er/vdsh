import React, {useState} from 'react';
import styles from './SelectQuantity.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getRopesOrder} from "../../store/ropesOrder/selectors";
import {ropesOrderOperation} from "../../store/ropesOrder/operations";
import {openPopup} from "../../store/Popup/actions";
import store from "../../store/store";

const SelectQuantity = ({color_id, storeQuantity}) => {
    let [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const order = useSelector(getRopesOrder);

    const incrementQuantity = () => {
        setQuantity(++quantity)
        dispatch(ropesOrderOperation(order, color_id, quantity))
    }

    const decrementQuantity = () => {
        if (quantity <= 0) {
            dispatch(openPopup('Кількість не може бути менше 0!', true))
        } else {
            setQuantity(--quantity);
            dispatch(ropesOrderOperation(order, color_id, quantity))
        }
    }

    const changeQuantity = (e) => {
        e.preventDefault();
        const newQuantity = e.target.value;
        setQuantity(newQuantity)
        dispatch(ropesOrderOperation(order, color_id, newQuantity))
    }

    return (
        <div className={styles.buttonsWrapper}>
            <button onClick={decrementQuantity} className={styles.buttons} type={"button"}>
                -
            </button>
            <input onChange={changeQuantity} className={styles.inputWrapper} value={storeQuantity && storeQuantity.quantity || 0} type="text"/>
            <button onClick={incrementQuantity} className={styles.buttons} type={"button"}>
                +
            </button>
        </div>
    );
};

export default SelectQuantity;