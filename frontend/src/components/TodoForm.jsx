import { Form, Formik } from 'formik'
import React from 'react'
import { required } from '../utils/validators'
import Input from './common/Input'
import Button from './common/Button'


export default function TodoForm({ onSubmit, loading, initialValues }) {
    return (
        <Formik initialValues={{ title: '', ...initialValues }} onSubmit={onSubmit}>
            <Form>
                <div className="columns">
                    <div className="column">
                        <Input
                            name="title"
                            placeholder="Введите загаловок"
                            validate={required} /> &nbsp;
                    </div>

                    <div className="column is-narrow">
                        <Button
                            loading={loading}
                            type="submit"
                            icon="checkmark"
                            className="is-success" /> &nbsp;
                    </div>
                </div>
            </Form>
        </Formik>
    )
}
