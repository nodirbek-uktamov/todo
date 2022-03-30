import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import ConfirmEmail from './pages/ConfirmEmail'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import ResetLink from './pages/ResetLink'
import ResetPasswordMessage from './pages/ResetPasswordMessage'
import BaseContextWrapper from './components/common/BaseContext'
import EmailConfirmationMessage from './pages/EmailConfirmationMessage'
import Todo from './pages/Todo'


export default function App() {
    return (
        <BrowserRouter>
            <BaseContextWrapper>
                <Switch>
                    <ProtectedRoute path="/todo" component={Todo} exact />
                    <Route path="/" name="auth" component={Login} exact />
                    <Route path="/sign-up" name="auth" component={SignUp} exact />
                    <Route path="/email-confirmation-message" component={EmailConfirmationMessage} exact />
                    <Route path="/reset-password/:key" name="auth" component={ResetPassword} exact />
                    <Route path="/reset-link" name="auth" component={ResetLink} exact />
                    <Route path="/confirm/:confirmationCode" component={ConfirmEmail} exact />
                    <Route path="/reset-password-message" component={ResetPasswordMessage} exact />
                    <Route path="" component={NotFound} exact />
                </Switch>
            </BaseContextWrapper>
        </BrowserRouter>
    )
}
