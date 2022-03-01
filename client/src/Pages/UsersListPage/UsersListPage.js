import React, {useEffect, useState} from 'react';
import {getAllUsers} from "../../http/userAPI";
import UserInfo from "../../Components/UserInfo/UserInfo";
import styles from './UsersListPage.module.scss';
import UsersTable from "../../Components/UsersTable/UsersTable";

const UsersListPage = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function fetchUsers () {
            const users = await getAllUsers();
            return users;
        }
        fetchUsers().then(users => setUsers(users.data))
    }, [])

    // const renderUsers = users !== null && users.map(user => {
    //     const {email, name, surname, shop_id, role, id} = user;
    //     return (
    //      <UserInfo
    //          shop_id={shop_id}
    //          surname={surname}
    //          email={email}
    //          name={name}
    //          role={role}
    //      />
    //     )
    // })

    return (
        <main className={styles.pageContainer}>
            <header className={styles.header}><h1 className={styles.title}>Список сотрудников</h1></header>
            <main className={styles.body}>
                <UsersTable users={users}/>
            </main>
        </main>
    );
};

export default UsersListPage;