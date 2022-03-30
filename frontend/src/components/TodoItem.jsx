import React, { useState } from 'react'
import cn from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import { getDateTime } from '../utils/date'
import { useDeleteRequest, usePutRequest } from '../hooks/request'
import { TODO_DETAIL } from '../urls'
import Dropdown, { DropdownItem } from './common/Dropdown'
import Loader from './common/Loader'
import TodoUpdate from './TodoUpdate'


export default function TodoItem({ item, onUpdate, onDelete }) {
    const update = usePutRequest({ url: TODO_DETAIL.replace('{id}', item.id) })
    const remove = useDeleteRequest({ url: TODO_DETAIL.replace('{id}', item.id) })
    const [showUpdate, setShowUpdate] = useState(false)

    async function handleDelete() {
        if (global.confirm('Вы действительно хотите удалить?')) {
            await remove.request()
            onDelete()
        }
    }

    async function updateActive(isActive) {
        await update.request({ data: { ...item, isActive } })
        onUpdate()
    }

    if (update.loading) return <div className="media"><Loader className="is-size-3" center /></div>

    return (
        <div className="media mx-0 my-0 pt-2">
            <div className="media-left">
                {!item.isActive ? (
                    <span className="has-text-success is-size-3" onClick={() => updateActive(true)}>
                        <ion-icon name="checkmark-circle" />
                    </span>
                ) : (
                    <span className="has-text-grey-lighter is-size-3" onClick={() => updateActive(false)}>
                        <ion-icon name="ellipse" />
                    </span>
                )}
            </div>

            <div className="media-content">
                {showUpdate ? (
                    <TodoUpdate item={item} onUpdate={onUpdate} />
                ) : (
                    <span className={cn({ [css(styles.del)]: !item.isActive })}>
                        <p className="title is-6">{item.title}</p>
                        <p className="subtitle is-7">{getDateTime(item.createdAt)}</p>
                    </span>
                )}
            </div>

            <div className="media-right">
                <Dropdown right trigger={(
                    <span className="pointer">
                        <ion-icon name="ellipsis-vertical-outline" />
                    </span>
                )}>
                    <DropdownItem text="Изменить" onClick={() => setShowUpdate(!showUpdate)} />
                    <DropdownItem text="Удалить" onClick={handleDelete} />
                </Dropdown>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    del: {
        textDecoration: 'line-through',
    },
})
