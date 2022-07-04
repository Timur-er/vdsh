import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {registrationAPI} from "../../../http/userAPI";
import {USER_PAGE} from "../../../routes/const";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../Hooks/auth.hook";
import {getAllShops} from "../../../http/shopAPI";
import styles from './RegistrationForm.module.scss';

const RegistrationForm = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [shops, setShops] = useState(null);

    useEffect( () => {
        async function fetchShops() {
            return await getAllShops();
        }
        fetchShops().then(data => setShops(data.data));
    }, [])

    const renderShops = shops !== null && shops.map(shop => {
        const {id, address} = shop;
        return (
            <option key={id} value={address}>{address}</option>
        )
    })

    const validationSchema = Yup.object({
        email: Yup.string().email('Не правильный email').required('Укажите email!'),
        name: Yup.string()
            .min(2, 'Минимальное количество символов 2')
            .max(15, 'Максимальное количество символов 15')
            .required('Это обязательное поле!'),
        surname: Yup.string()
            .min(2, 'Минимальное количество символов 2')
            .max(15, 'Максимальное количество символов 15')
            .required('Это обязательное поле!'),
        password: Yup.string()
            .min(6, 'Минимальное кол-во символов 6')
            .required('Это обязательное поле!'),
        confirmPassword: Yup.string()
            .required('Повторите пароль')
            .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
        shopAddress: Yup.string()
            .min(1, 'Виберіть магазин')
            .required('Виберіть магазин')
    })

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    surname: '',
                    password: '',
                    confirmPassword: '',
                    shopAddress: ''
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    const {email, name, surname, shopAddress, password} = values;
                    const newUser = await registrationAPI(email, name, surname, shopAddress, password);
                    const {user_id, email: userEmail, name: userName, surname: userSurname, role, shop_id, is_activated} = newUser.data.user;
                    login(user_id, userEmail, userName, userSurname, shop_id, role, newUser.data.access_token, is_activated);
                    navigate(USER_PAGE)
                    setSubmitting(false);
                }}>
                {(formik) => {
                    return (
                        <div className={styles.formWrapper}>
                            <Form className={styles.form}>
                                <label>
                                    <div>
                                        Email:
                                        <span className={styles.errorMessage}>
                                            <ErrorMessage name={'email'}/>
                                        </span>
                                    </div>
                                    <Field
                                        className={styles.input}
                                        type='email'
                                        name='email'/>
                                </label>

                                <label>
                                    <div>
                                        Имя
                                        <span className={styles.errorMessage}>
                                            <ErrorMessage name={'name'}/>
                                        </span>
                                    </div>
                                    <Field
                                        className={styles.input}
                                        type='text'
                                        name='name'/>
                                </label>

                                <label>
                                    <div>
                                        Фамилия
                                        <span className={styles.errorMessage}>
                                            <ErrorMessage name={'surname'}/>
                                        </span>
                                    </div>
                                    <Field
                                        className={styles.input}
                                        type='text'
                                        name='surname'/>
                                </label>

                                <label>
                                    <div>
                                        Пароль
                                        <span className={styles.errorMessage}>
                                            <ErrorMessage name={'password'}/>
                                        </span>
                                    </div>
                                    <Field
                                        className={styles.input}
                                        type='password'
                                        name='password'/>
                                </label>

                                <label>
                                    <div>
                                        Подтвердите пароль
                                        <span className={styles.errorMessage}>
                                            <ErrorMessage name={'confirmPassword'}/>
                                        </span>
                                    </div>
                                    <Field
                                        className={styles.input}
                                        type='password'
                                        name='confirmPassword'/>
                                </label>

                                <div className={styles.selectBlock}>

                                    <label className={styles.select}>
                                        <div>
                                            Адрес магазина в котором вы работаете:
                                            <span className={styles.errorMessage}>
                                            <ErrorMessage name={'shopAddress'}/>
                                        </span>
                                        </div>
                                        <Field
                                            as='select'
                                            name='shopAddress'>
                                            <option value={''}></option>
                                            {renderShops}
                                        </Field>
                                    </label>
                                </div>

                                <div>
                                    <button className={styles.submitButton} type={'submit'}>Зарегистрироваться</button>
                                </div>
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        </>
    );
};

export default RegistrationForm;