import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getIsPopupError, getIsPopupOpen, getPopupMessage} from "../../store/Popup/selectors";
import {closePopup} from "../../store/Popup/actions";
import styles from './PopupMessage.module.scss';

const PopupMessage = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(getIsPopupOpen);
    const message = useSelector(getPopupMessage);
    const isError = useSelector(getIsPopupError);

    if (isOpen) {
        setTimeout(() => {
            dispatch(closePopup());
        }, 3000)
    }

    return (
        <>
            {isOpen &&
                <div className={styles.popup} style={isError ? {backgroundColor: 'red'} : {backgroundColor: 'cornflowerblue'}}>
                        {message}
                </div>
            }
        </>
    );
};

export default PopupMessage;