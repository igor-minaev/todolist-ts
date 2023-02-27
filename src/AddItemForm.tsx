import React, {ChangeEvent, FC, KeyboardEvent, useRef, useState} from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import {IconButton, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    //const addItemFormRef = useRef<HTMLInputElement>(null)


    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    // const addItemRef = () => {
    //     if (addItemFormRef.current) {
    //         const trimmedTitle = addItemFormRef.current.value.trim()
    //         if (trimmedTitle !== '') {
    //             props.addItem(trimmedTitle)
    //         } else {
    //             setError(true)
    //         }
    //         addItemFormRef.current.value = ''
    //     } else {
    //         console.log()
    //     }
    // }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const errorMessage = error && <p style={{color: 'red', fontWeight: 'bold', margin: '0'}}>Title is required</p>
    const inputErrorClass = error ? 'input-error' : ''
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem()


    return (
        <div>
            <TextField variant='outlined'
                       size='small'
                       label="Enter title"
                       error={error}
                       helperText={error && 'Title is required!'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>

            <IconButton onClick={addItem} color='secondary'>
                <AddTaskIcon/>
            </IconButton>
        </div>
    );
};

