import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeTodoListFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
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
                    <Checkbox onChange={changeTaskStatus} checked={task.isDone}/>
                    {/*<span>{task.title}</span>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton color="secondary" onClick={removeTask}>
                        <DeleteIcon/>
                    </IconButton>
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
                <IconButton color="secondary" onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <Button
                    sx={{mr: '3px'}}
                    variant={props.filter === 'all' ? 'outlined' : 'contained'}
                    color={'primary'}
                    size={'small'}
                    disableElevation
                    onClick={handlerCreator('all')}>All</Button>
                <Button
                    sx={{mr: '3px'}}
                    variant={props.filter === 'active' ? 'outlined' : 'contained'}
                    color={'primary'}
                    size={'small'}
                    disableElevation
                    onClick={handlerCreator('active')}>Active</Button>
                <Button
                    variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    color={'primary'}
                    size={'small'}
                    disableElevation
                    onClick={handlerCreator('completed')}>Completed</Button>
            </div>
        </div>
    )
        ;
};

export default TodoList;