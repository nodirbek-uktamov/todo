import { css, StyleSheet } from 'aphrodite'
import { Form, Formik } from 'formik'
import React from 'react'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import { usePostRequest } from '../hooks/request'
import { SIGNIN } from '../urls'
import { email, required, validator } from '../utils/validators'
import Password from '../components/common/Password'
import { isAuthenticated, signin } from '../utils/auth'
import LayoutAuth from '../components/LayoutAuth'
import logo from '../static/logo.svg'


export default function Login() {
    const history = useHistory()
    const signIn = usePostRequest({ url: SIGNIN, headers: {} })

    if (isAuthenticated()) {
        return <Redirect to="/todo" />
    }

    async function onSubmit(data) {
        const { response, success } = await signIn.request({ data })

        if (success) {
            signin(response, history)
            history.push('todo')
        }
    }

    return (
        <LayoutAuth sidebar={(
            <div>
                <h2 className="is-size-5 has-text-weight-bold">Еще нет аккаунта?</h2>
                <p>Если вы еще не зарегистрировались переходите по ссылке и создайте аккаунт</p>

                <br />

                <NavLink to="/sign-up" className="button is-link is-outlined is-inverted">
                    Создать аккаунт
                </NavLink>
            </div>
        )}>

            <div className="has-text-centered">
                <img src={logo} className={css(styles.img)} alt="Logo" />
                <h2 className="is-size-4 has-text-weight-bold">Войдите в систему</h2>
                <br />
            </div>

            <Formik onSubmit={onSubmit} initialValues={{ email: '', password: '' }}>
                <Form>
                    <ServerError error={signIn.error} />
                    <Input name="email" validate={validator(required, email)} placeholder="Email" />
                    <Password name="password" validate={required} placeholder="Password" />

                    <div className="field">
                        <div className="control">
                            <Button
                                loading={signIn.loading}
                                className="is-primary is-blue is-medium is-fullwidth"
                                text="Войти"
                                type="submit" />
                        </div>
                    </div>
                    <div className={css(styles.onlyMobile)}>
                        <NavLink to="/sign-up">Зарегистрироваться</NavLink>
                        <br />
                        <br />
                    </div>

                    <div className="mt-5 forgot-password">
                        <div className="has-text-centered">
                            <NavLink to="/reset-link" className={css(styles.forgotPassword)}>Забыли пароль?</NavLink>
                        </div>
                    </div>
                </Form>
            </Formik>
        </LayoutAuth>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: '1.25rem',
    },
    img: {
        width: '10rem',
    },
    input: {
        color: '#4a4a4a',
    },
    onlyMobile: {
        textAlign: 'center',
        '@media (min-width: 769px)': {
            display: 'none',
        },
    },
    forgotPassword: {
        color: '#999',
        fontSize: '.9rem',
        ':hover': {
            color: '#0062ff',
        },
    },
})
