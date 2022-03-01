import React, {useEffect, useState} from 'react';
import styles from './Button.module.scss';

const Button = ({text, onClick, type}) => {
    const [className, setClassName] = useState('');

    useEffect(() => {
        switch (type) {
            case 'navBtn':
                return setClassName(`${styles.button}`);
            case 'detailsBtn':
                return setClassName(`${styles.detailsBtn}`);
            default:
                return setClassName(`${styles.button}`);
        }
    }, []);

    const buttonHandler = () => {
        onClick()
    }

    return (
        <button className={className} onClick={buttonHandler}>
            {text}
        </button>
    );
};

export default Button;