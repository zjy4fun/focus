import './Current.css';
import {TodoItem} from "../../types/TodoItem.ts";
import {formatTime} from "../../utils/time.ts";

interface CurrentProps {
    currentTodo: TodoItem | null;
}

export const Current = ({currentTodo}: CurrentProps) => {
    return (
        <div className={'currentcontainer'}>
            <h3>{currentTodo ? formatTime(currentTodo.timeStamp) : ''}</h3>
            <h1>{currentTodo ? currentTodo.text : 'No todo selected'}</h1>
        </div>
    );
};