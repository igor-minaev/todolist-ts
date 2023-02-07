import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input autoFocus value={title} onBlur={offEditMode} onChange={onChangeHandler}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

