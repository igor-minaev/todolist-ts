import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
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
            const removeTask = () => props.removeTask(task.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
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
            props.addTask(trimmedTitle)
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


    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const errorMessage = error && <p style={{color: 'red', fontWeight: 'bold', margin: '0'}}>Title is required</p>
    const inputErrorClass = error ? 'input-error' : ''


    return (
        <div>
            <h3>{props.title}</h3>
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