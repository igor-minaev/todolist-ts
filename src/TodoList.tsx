import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeTodoListFilter: (todoListId: string, filter: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todoListsId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)


    const tasksItems = props.tasks.length ?
        props.tasks.map((task) => {
            const removeTask = () => props.removeTask(props.todoListId, task.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked)
            const taskClass = task.isDone ? 'task done' : 'task'

            return (
                <li key={task.id} className={taskClass}>
                    <input type="checkbox" onChange={changeTaskStatus} checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your tasks list is empty!</span>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(props.todoListId, trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const removeTodoList = () => props.removeTodolist(props.todoListId)

    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(props.todoListId, filter)
    const errorMessage = error && <p style={{color: 'red', fontWeight: 'bold', margin: '0'}}>Title is required</p>
    const inputErrorClass = error ? 'input-error' : ''


    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input className={inputErrorClass} value={title} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'btn-active' : ''} onClick={handlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'btn-active' : ''}
                        onClick={handlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'btn-active' : ''}
                        onClick={handlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;