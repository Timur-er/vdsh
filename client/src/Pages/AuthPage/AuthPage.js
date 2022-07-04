import React, {useState} from 'react';
import {Tab, TabList, Tabs, TabPanel} from "react-tabs";
import RegistrationForm from "../../Components/RegAuth/RegistarationForm/RegistrationForm";
import AuthenticateForm from "../../Components/RegAuth/AuthenticateForm/AuthenticateForm";
import AppContainer from "../../Components/AppContainer/AppContainer";
import styles from './AuthPage.module.scss'

const AuthPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <AppContainer>
            <div className={styles.authPage}>
                <Tabs selectedIndex={tabIndex}
                      onSelect={index => {
                          setTabIndex(index)
                      }}
                      className={styles.tabs}
                >
                    <TabList className={styles.authWayButtons}>
                        <Tab
                            className={tabIndex === 0 ? `${styles.authWay} ${styles.activeAuthWay}` : `${styles.authWay}`}>Зарегистрироваться</Tab>
                        <Tab
                            className={tabIndex === 1 ? `${styles.authWay} ${styles.activeAuthWay}` : `${styles.authWay}`}>Войти</Tab>
                    </TabList>

            
                    <TabPanel className={tabIndex === 0 ? `${styles.form} ${styles.activeAuthForm}` : `${styles.form}`}>
                        <RegistrationForm/>
                    </TabPanel>
            
                    <TabPanel className={tabIndex === 1 ? `${styles.form} ${styles.activeAuthForm}` : `${styles.form}`}>
                        <AuthenticateForm/>
                    </TabPanel>
                </Tabs>
            </div>
        </AppContainer>
    );
};

export default AuthPage;