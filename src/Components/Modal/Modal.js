import React, {useEffect, useRef, useState} from 'react';
import styles from './Modal.module.scss';
import OrderDetailsTable from "../OrderDetailsTable/OrderDetailsTable";
import {useDispatch} from "react-redux";
import {closeModal} from "../../store/modal/actions";

const Modal = ({children}) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const closeRef = useRef(null);

    if (!children){
        dispatch(closeModal(false))
    }

    const close = (e) => {
        if (!modalRef.current.contains(e.target)) {
            dispatch(closeModal(false))
        }
    }

    return (
        <div onClick={(e) => close(e)} className={styles.modalFade}>
            <div className={styles.modal} ref={modalRef}>
                {/*<div>*/}
                {/*</div>*/}
                <div className='modal__body'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;