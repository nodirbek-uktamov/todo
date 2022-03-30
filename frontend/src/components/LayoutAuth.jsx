import { css, StyleSheet } from 'aphrodite'
import React from 'react'
import cn from 'classnames'


export default function LayoutAuth({ children, sidebar }) {
    return (
        <div className="login-wrapper columns is-gapless">
            <div className="column is-7">
                <div className="hero form-hero is-fullheight">
                    <div className="hero-body px-0 py-0">
                        <div className={css(styles.formWrapper)}>
                            <div className="px-4 py-4">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cn(
                'column is-5 is-hidden-mobile hero-banner', css(styles.sidebar),
            )}>
                <div className="hero is-fullheight">
                    <div className="hero-body">
                        <div className="container has-text-centered has-text-white">
                            <div className="columns">
                                <div className="column is-10 is-offset-1">
                                    {sidebar}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    sidebar: {
        backgroundColor: '#37b54c !important',
    },
    formWrapper: {
        maxWidth: '540px',
        minWidth: '380px',
        margin: '0 auto',
    },
})
