import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import {closeModal} from "../../store/modal/actions";
import styles from './Modal.module.scss';

const Modal = ({children}) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);

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
                <div className='modal__body'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;