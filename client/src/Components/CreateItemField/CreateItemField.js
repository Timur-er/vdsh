import React from 'react';
import styles from './CreateItemField.module.scss';
import {Form, Formik, Field, ErrorMessage, FieldArray} from "formik";
import * as Yup from 'yup';
import {addRopes} from "../../http/ropesAPI";

const CreateItemField = () => {

    const validationSchema = Yup.object().shape({
        brand: Yup
            .string()
            .required('Укажите марку'),
        order: Yup.array(
            Yup.object({
                quantity: Yup
                    .string()
                    .min(1, 'введите кол-во')
                    .required('это обязатенльое поле'),
                color_id: Yup
                    .string()
                    .min(4, '4')
                    .max(4, '4')
                    .required('Это обязательное поле')
            }).required()
        )
    })

    const initialValues = {
        brand: 'DMC',
        order: [
            {
                quantity: '',
                color_id: ''
            }
        ]
    }

    return (
        <>
            <Formik
                validateOnChange={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    const {brand: brandName, order} = values;
                    const fetchedRopes = await addRopes(order, brandName);
                    alert(fetchedRopes.data)
                    resetForm()
                    setSubmitting(false);
                }}
            >
                {({values, handleSubmit, errors, touched, setTouched}) => (
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.orderSameData}>
                            <div>
                                Производитель:
                                <Field as='select' name="brand" id="brand">
                                    <option value="dmc">DMC</option>
                                    <option value="ideal">IDEAL</option>
                                    <option value="kirovo">KIROVO</option>
                                </Field>
                            </div>
                        </div>

                        <FieldArray name={'order'}>
                            {({push, remove}) => (

                                <>
                                    <div className={styles.formRowWrapper}>
                                        {
                                            values.order.map((x, index) => {
                                                return (
                                                    <div key={index} className={styles.formRow}>
                                                        <div className={styles.inputsWrapper}>
                                                            <div className={styles.inputLabel}>
                                                                <label>Цвет №:</label>
                                                                <div className={styles.inputContainer}>
                                                                    <Field name={`order.${index}.color_id`}/>
                                                                </div>
                                                                <span className={styles.errorMsg}><ErrorMessage
                                                                    name={`order.${index}.color_id`}/></span>
                                                            </div>
                                                            <div className={styles.inputLabel}>
                                                                <label>Количество:</label>
                                                                <div className={styles.inputContainer}>
                                                                    <Field className={styles.quantityInput}
                                                                           name={`order.${index}.quantity`}/>
                                                                </div>
                                                                <span className={styles.errorMsg}><ErrorMessage
                                                                    name={`order.${index}.quantity`}/></span>
                                                            </div>
                                                        </div>
                                                        <button type='submit' onClick={() => remove(index)}>Удалить
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className={styles.orderButtons}>
                                        <button type={'submit'} className={styles.orderBtn}>Оформить заказ</button>
                                        <button onClick={() => {
                                            push({quantity: '', color_id: ''})
                                        }} className={styles.orderBtn}>
                                            Добавить цвет
                                        </button>
                                    </div>
                                </>
                            )}
                        </FieldArray>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateItemField;