import React from 'react'
import { usePostRequest } from '../hooks/request'
import { TODO_LIST } from '../urls'
import { auth } from '../utils/auth'
import TodoForm from './TodoForm'


export default function TodoCreate({ onSuccess }) {
    const create = usePostRequest({ url: TODO_LIST, ...auth() })

    async function onCreate(data) {
        await create.request({ data })
        onSuccess()
    }

    return (
        <TodoForm onSubmit={onCreate} loading={create.loading} />
    )
}
