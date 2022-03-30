import { css, StyleSheet } from 'aphrodite'
import { Form, Formik } from 'formik'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import { usePostRequest } from '../hooks/request'
import { RESET_LINK } from '../urls'
import { email, required, validator } from '../utils/validators'
import LayoutAuth from '../components/LayoutAuth'
import logo from '../static/logo.svg'


export default function ResetLink() {
    const resetLink = usePostRequest({ url: RESET_LINK, headers: {} })
    const history = useHistory()

    async function onSubmit(data) {
        const { success } = await resetLink.request({ data })

        if (success) {
            history.push('/reset-password-message')
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
                <h2 className="is-size-4 has-text-weight-bold">Восстановление пароля</h2>
                <br />
            </div>

            <Formik onSubmit={onSubmit} initialValues={{ email: '' }}>
                <Form className={css(styles.container)}>
                    <ServerError error={resetLink.error} />

                    <Input
                        name="email"
                        label="Емайл адрес"
                        validate={validator(required, email)}
                        placeholder="monday@gmail.com" />

                    <div className="field columns">
                        <p className="control column">
                            <Button
                                loading={resetLink.loading}
                                className="is-primary is-blue is-medium is-fullwidth"
                                text="Восстановить пароль"
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
