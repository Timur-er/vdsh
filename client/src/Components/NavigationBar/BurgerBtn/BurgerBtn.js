import React, {useState} from 'react';
import styles from './BurgerBtn.module.scss';
import {useDispatch} from "react-redux";
import {menuBarToggleOperation} from "../../../store/MenuBar/operations";

const BurgerBtn = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [topLineClass, setTopLineClass] = useState(`${styles.burgerLines} ${styles.activeTopLine}`);
    const [middleLineClass, setMiddleLineClass] = useState(`${styles.burgerLines} ${styles.activeMiddleLine}`);
    const [bottomLineClass, setBottomLineClass] = useState(`${styles.burgerLines} ${styles.activeBottomLine}`);
    const dispatch = useDispatch();

    const burgerHandler = () => {
        setIsMenuOpen(!isMenuOpen);
        setTopLineClass(isMenuOpen ? `${styles.burgerLines}` : `${styles.burgerLines} ${styles.activeTopLine}`)
        setMiddleLineClass(isMenuOpen ? `${styles.burgerLines}` : `${styles.burgerLines} ${styles.activeMiddleLine}`)
        setBottomLineClass(isMenuOpen ? `${styles.burgerLines}` : `${styles.burgerLines} ${styles.activeBottomLine}`)
        dispatch(menuBarToggleOperation(!isMenuOpen));
    }

    return (
        <div onClick={burgerHandler} className={styles.burgerBtn}>
            <div className={topLineClass}/>
            <div className={middleLineClass}/>
            <div className={bottomLineClass}/>
        </div>

    );
};

export default BurgerBtn;