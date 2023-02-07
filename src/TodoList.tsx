import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (todoListId: string, taskId: string, title: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    const tasksItems = props.tasks.length ?
        props.tasks.map((task) => {
            const removeTask = () => props.removeTask(props.todoListId, task.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked)
            const changeTaskTitle = (title: string) => props.changeTaskTitle(props.todoListId, task.id, title)
            const taskClass = task.isDone ? 'task done' : 'task'

            return (
                <li key={task.id} className={taskClass}>
                    <input type="checkbox" onChange={changeTaskStatus} checked={task.isDone}/>
                    {/*<span>{task.title}</span>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your tasks list is empty!</span>

    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }
    const removeTodoList = () => props.removeTodolist(props.todoListId)
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(props.todoListId, filter)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(props.todoListId, title)

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}> x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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
    )
        ;
};

export default TodoList;