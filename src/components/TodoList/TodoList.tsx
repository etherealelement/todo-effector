import {useList, useUnit} from "effector-react";
import {TodoListProps} from "./TodoList.props.ts";


export const TodoList = ({label, model}: TodoListProps) => {
    const input = useUnit(model.$input);
    const todos = useList(model.$todos, (value: string, index: number) => (
        <li>
            {value}{" "}
            <button type="button" onClick={() => model.remove(index)}>
                Remove
            </button>
        </li>
    ))

    console.log(todos);


    return <div>
        <h1>{label}</h1>
        <ul>{todos}</ul>
        <form>
            <label>Insert todo: </label>
            <input
                type="text"
                value={input}
                onChange={(event) => model.change(event.currentTarget.value)}
            />
            <input type="submit" onClick={model.submit} value="Insert"/>
        </form>
    </div>
}