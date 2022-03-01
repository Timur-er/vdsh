import React from 'react';
import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import styles from './AuthenticateForm.module.scss';
import {loginAPI} from "../../../http/userAPI";
import {useAuth} from "../../../Hooks/auth.hook";
import {useNavigate} from "react-router-dom";
import {USER_PAGE} from "../../../routes/const";

const AuthenticateForm = () => {
    const {login} = useAuth();
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        email: Yup.string().email('Не правильный email').required('Укажите email!'),
        password: Yup.string().required('Это обязательное поле!')
    })

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    const {email: userEmail, password: userPassword} = values;
                    const authUser = await loginAPI(userEmail, userPassword);
                    const {user_id, email, name, surname, shop_id, role} = authUser.data.user;
                    login(user_id, email, name, surname, shop_id, authUser.data.accessToken);
                    navigate(USER_PAGE)
                    setSubmitting(false)
                }}
            >
                {(formik) => {
                    return (
                        <div className={styles.formWrapper}>
                            <Form className={styles.form}>
                                <label>
                                    <div>
                                        User name:
                                        <span className={styles.errorMessage}>
                                            <ErrorMessage name={'email'}/>
                                        </span>
                                    </div>
                                    <Field className={styles.input} type={'email'} name={'email'}/>
                                </label>

                                <label>
                                    <div>
                                        Password:
                                        <span className={styles.errorMessage}>
                                            <ErrorMessage name={'password'}/>
                                        </span>
                                    </div>
                                    <Field className={styles.input} type={'password'} name={'password'}/>
                                </label>

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

export default AuthenticateForm;