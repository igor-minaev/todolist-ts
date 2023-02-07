import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: 'WHISKEY', isDone: true},
            {id: v1(), title: 'COLA', isDone: true},
            {id: v1(), title: 'ACE', isDone: false}
        ]
    })

    console.log(tasks)


    /* const todoListTitle: string = 'What to learn'
     const [tasks, setTasks] = useState<Array<TaskType>>([
         {id: v1(), title: 'HTML', isDone: true},
         {id: v1(), title: 'CSS', isDone: true},
         {id: v1(), title: 'JS/TS', isDone: false}
     ])*/

    /* const [filter, setFilter] = useState<FilterValuesType>('all')*/

    const removeTodolist = (todoListsId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsId))
        delete tasks[todoListsId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodoListType =
            {
                id: newTodolistId,
                title,
                filter: 'all'
            }
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeTodoListFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl))
    }

    const changeTodoListTitle = (todoListId: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
    }

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const addTask = (todoListId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const todoListComponents = todoLists.length ? todoLists.map(tl => {
            const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
            return (
                <TodoList
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={filteredTasksForRender}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}/>
            )
        })
        : <span>Create your first todolist!</span>


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoListComponents}
        </div>
    );
}

export default App;
