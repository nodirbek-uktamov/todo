import React from 'react'
import { useLoad } from '../hooks/request'
import { TODO_LIST } from '../urls'
import TodoItem from '../components/TodoItem'
import Loader from '../components/common/Loader'
import TodoCreate from '../components/TodoCreate'

export default function Todo() {
    const todos = useLoad({ url: TODO_LIST }, [])

    return (
        <div className="has-background-grey-lighter is-fullheight">
            <div className="container mb-1">
                <h1 className="has-text-centered is-size-3">Todo List Monday</h1>

                <div className="box">
                    {!todos.loading ? (
                        <div>
                            <TodoCreate onSuccess={todos.request} />

                            {todos.response ? todos.response.map((item) => (
                                <TodoItem
                                    item={item}
                                    key={item.id}
                                    onUpdate={todos.request}
                                    onDelete={todos.request} />
                            )) : <div className="has-text-centered is-size-2">Пусто</div>}
                        </div>
                    ) : <Loader large center />}
                </div>
            </div>
        </div>
    )
}
