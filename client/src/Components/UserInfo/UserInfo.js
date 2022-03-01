import React from 'react';
import styles from './UserInfo.module.scss';

const UserInfo = ({email, name, surname, shop_id, role}) => {
    return (
        <div className={styles.userWrapper}>
            <div>
                <span>Имя: </span>
                <span>{name}</span>
            </div>
            <div>
                <span>Фамилия: </span>
                <span>{surname}</span>
            </div>
            <div>
                <span>Емейл: </span>
                <span>{email}</span>
            </div>
            <div>
                <span>Адрес: </span>
                <span>{shop_id}</span>
            </div>
            <div>
                <span>Роль: </span>
                <span>{role}</span>
            </div>
            <div>
                <span>Name: </span>
                <span>{name}</span>
            </div>
        </div>
    );
};

export default UserInfo;