import React, {useEffect, useState} from 'react';
import {getAllUsers} from "../../http/userAPI";
import UsersTable from "../../Components/UsersTable/UsersTable";
import styles from './UsersListPage.module.scss';

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
            <h1>Список працівників</h1>
            <main className={styles.body}>
                <UsersTable users={users}/>
            </main>
        </main>
    );
};

export default UsersListPage;