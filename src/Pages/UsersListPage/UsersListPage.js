import React, {useEffect, useState} from 'react';
import {getAllUsers} from "../../http/userAPI";
import styles from './UsersListPage.module.scss';
import UsersTable from "../../Components/UsersTable/UsersTable";
import Header from "../../Components/Header/Header";

const UsersListPage = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function fetchUsers () {
            const users = await getAllUsers();
            return users;
        }
        fetchUsers().then(users => setUsers(users.data))
    }, [])

    return (
        <main className={styles.pageContainer}>
            <Header title={'Список сотрудников'} />
            {/*<header className={styles.header}><h1 className={styles.title}>Список сотрудников</h1></header>*/}
            <main className={styles.body}>
                <UsersTable users={users}/>
            </main>
        </main>
    );
};

export default UsersListPage;