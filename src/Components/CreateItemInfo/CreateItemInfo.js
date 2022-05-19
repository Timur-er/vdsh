import React from 'react';
import {Form, Formik, Field} from "formik";

const CreateItemInfo = () => {
    const initialValues = {
        brand: 'DMC',
        shopAddress: 'Крещатик'
    }

    return (
        <Formik
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                console.log('submit');
            }}
        >
            {({values, handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <div>
                        Бренд ниток:
                        <Field as='select' name='brand' id='brand'>
                            <option value="DMC">DMC</option>
                            <option value="KIROVO">Kirovo</option>
                        </Field>
                    </div>
                    <div>
                        Адресс магазина:
                        <Field as='select' name='shopAddress' id='shopAddress'>
                            <option value="Kreschatyk">Kreschatyk</option>
                            <option value="Darnytsa">Darnytsa</option>
                        </Field>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateItemInfo;