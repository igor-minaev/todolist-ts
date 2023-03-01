import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todolistId: string
    }
}

export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId:string
    }
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        todolistId: string
        filter: FilterValuesType
    }
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        todolistId: string
        title: string
    }
}

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            const newTodolist: TodoListType =
                {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    filter: 'all'
                }
            return [...todolists, newTodolist]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.filter
            } : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.title
            } : tl)
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => ({
    type: 'REMOVE-TODOLIST',
    payload: {todolistId}
})
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: 'ADD-TODOLIST', payload: {title,todolistId:v1()}})
export const ChangeTodoListFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {todolistId, filter}
})
export const ChangeTodoListTitleAC = (todolistId: string, title: string): ChangeTodoListTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {todolistId, title}
})