import React, {useState} from 'react';
import {Tab, TabList, Tabs, TabPanel} from "react-tabs";
import Container from "../../Components/Container/Container";
import RegistrationForm from "../../Components/RegAuth/RegistarationForm/RegistrationForm";
import AuthenticateForm from "../../Components/RegAuth/AuthenticateForm/AuthenticateForm";
import styles from './AuthPage.module.scss'
import {useSelector} from "react-redux";
import {getIsActivated, getIsAuth} from "../../store/User/selectors";

const AuthPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <Container>
            <div className={styles.authPage}>
                <Tabs selectedIndex={tabIndex}
                      onSelect={index => {setTabIndex(index)}}
                    className={styles.tabs}
                >
                    <TabList className={styles.authWayButtons}>
                        <Tab className={tabIndex === 0 ? `${styles.authWay} ${styles.activeAuthWay}` : `${styles.authWay}`}>Зарегистрироваться</Tab>
                        <Tab className={tabIndex === 1 ? `${styles.authWay} ${styles.activeAuthWay}` : `${styles.authWay}`}>Войти</Tab>
                    </TabList>


                    <TabPanel className={tabIndex === 0 ? `${styles.form} ${styles.activeAuthForm}` : `${styles.form}`}>
                        <RegistrationForm/>
                    </TabPanel>

                    <TabPanel className={tabIndex === 1 ? `${styles.form} ${styles.activeAuthForm}` : `${styles.form}`}>
                        <AuthenticateForm/>
                    </TabPanel>
                </Tabs>
            </div>
        </Container>
    );
};

export default AuthPage;