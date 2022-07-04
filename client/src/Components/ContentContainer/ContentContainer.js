import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getIsMenuBarOpen} from "../../store/MenuBar/selectors";
import styles from './ContentContainer.module.scss';

const ContentContainer = ({children}) => {
    const isMenuOpen = useSelector(getIsMenuBarOpen);
    const [contentContainerStyle, setContentContainerStyle] = useState(`${styles.contentContainer}`);

    useEffect(() => {
        if (isMenuOpen) {
            setContentContainerStyle(`${styles.contentContainer}`);
        } else {
            setContentContainerStyle(`${styles.contentContainer} ${styles.whenMenuBarClosed}`);
        }

    }, [isMenuOpen])


    return (
        <div className={contentContainerStyle}>
            {children}
        </div>
    );
};

export default ContentContainer;