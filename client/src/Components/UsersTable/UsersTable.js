import React from 'react';
import styles from './UsersTable.module.scss';

const UsersTable = ({users}) => {


    const renderRow = users !== null && users.map(user => {
        const {email, name, surname, shop_id, role} = user;
        return (
            <div className={styles.tableRow}>
                <div className={styles.tableCell}>
                    {name}
                </div>
                <div className={styles.tableCell}>
                    {surname}
                </div>
                <div className={styles.tableCell}>
                    {email}
                </div>
                <div className={styles.tableCell}>
                    {shop_id}
                </div>
                <div className={styles.tableCell}>
                    {role}
                </div>
            </div>
        )
    })

    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>
                <div className={styles.tableCell}>
                    Имя
                </div>
                <div className={styles.tableCell}>
                    Фамилия
                </div>
                <div className={styles.tableCell}>
                    Email
                </div>
                <div className={styles.tableCell}>
                    Адрес
                </div>
                <div className={styles.tableCell}>
                    Роль
                </div>
            </div>
            <div className={styles.tableBody}>
                {renderRow}
            </div>
        </div>
    );
};

export default UsersTable;