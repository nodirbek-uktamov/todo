import React from 'react'
import { usePutRequest } from '../hooks/request'
import { TODO_DETAIL } from '../urls'
import TodoForm from './TodoForm'


export default function TodoUpdate({ item, onUpdate }) {
    const update = usePutRequest({ url: TODO_DETAIL.replace('{id}', item.id) })

    async function handleUpdate(data) {
        await update.request({ data })
        onUpdate()
    }

    return (
        <TodoForm item={item} onSubmit={handleUpdate} initialValues={item} />
    )
}
