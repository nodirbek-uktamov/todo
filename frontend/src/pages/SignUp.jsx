import { css, StyleSheet } from 'aphrodite'
import { Form, Formik } from 'formik'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import { usePostRequest } from '../hooks/request'
import { SIGNUP } from '../urls'
import { email, required, validator } from '../utils/validators'
import Password from '../components/common/Password'
import LayoutAuth from '../components/LayoutAuth'
import logo from '../static/logo.svg'

export default function SignUp() {
    const signUp = usePostRequest({ url: SIGNUP, headers: {} })
    const history = useHistory()

    async function onSubmit(data) {
        const { success } = await signUp.request({ data })

        if (success) {
            history.push('/email-confirmation-message')
        }
    }

    return (
        <LayoutAuth sidebar={(
            <div>
                <h2 className="is-size-5 has-text-weight-bold">Уже есть аккаунт?</h2>
                <p>Вы уже зарегистрированы в MondayLabs.tech? Войдите в систему и наслаждайтесь</p>

                <br />

                <NavLink to="" className="button is-link is-outlined is-inverted">
                    Войти в систему
                </NavLink>
            </div>
        )}>
            <div className="has-text-centered">
                <img src={logo} className={css(styles.img)} alt="Logo" />
                <h2 className="is-size-4 has-text-weight-bold">Зарегистрироваться</h2>
                <br />
            </div>

            <Formik onSubmit={onSubmit}
                initialValues={{
                    password: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    companyName: '',
                    companyPhone: '',
                }}>
                <Form className={css(styles.container)}>
                    <ServerError error={signUp.error} />

                    <div className="field is-horizontal">
                        <div className="field-body">
                            <Input name="firstName" label="Имя" validate={required} placeholder="Игорь" />
                            <Input name="lastName" label="Фамилия" validate={required} placeholder="Игорьев" />
                        </div>
                    </div>

                    <Input
                        name="email"
                        label="Электронная почта"
                        validate={validator(required, email)}
                        placeholder="monday@gmail.com" />

                    <Password name="password" validate={required} placeholder="********" label="Пароль" />

                    <div className="field">
                        <p className="control">
                            <Button
                                loading={signUp.loading}
                                className="is-primary is-blue is-medium is-fullwidth"
                                text="Зарегистрироваться"
                                type="submit" />
                        </p>
                    </div>

                    <div className={css(styles.onlyMobile)}>
                        <br />
                        Уже есть аккаунт?
                        <NavLink to="" className={css(styles.isRegistered)}> Войти</NavLink>
                    </div>
                </Form>
            </Formik>
        </LayoutAuth>
    )
}

const styles = StyleSheet.create({
    img: {
        width: '10rem',
    },
    onlyMobile: {
        fontSize: '.9rem',
        textAlign: 'center',
        '@media (min-width: 769px)': {
            display: 'none',
        },
    },
    isRegistered: {
        color: '#999',
        ':hover': {
            color: '#0062ff',
        },
    },
})
