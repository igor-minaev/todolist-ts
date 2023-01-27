import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn'
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
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


    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                filter={filter}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;
