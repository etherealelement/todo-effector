import { useUnit} from "effector-react";
import {TodoListProps} from "./TodoList.props.ts";


export const TodoList = ({label, model}: TodoListProps) => {
    const [input, todo] = useUnit([model.$input, model.$todos]);

    return  <div>
        <h1>{label}</h1>
        <ul>{todo?.map((item, id) => <li key={id}>{item.title}<input type="checkbox" checked={item.completed} onChange={() => model.setChecked(item.id)}></input> <button type="button" onClick={() => model.remove(id)}>Remove</button></li>)}</ul>
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