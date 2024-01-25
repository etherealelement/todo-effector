import { useUnit} from "effector-react";
import {TodoListProps} from "./TodoList.props.ts";


export const TodoList = ({label, model}: TodoListProps) => {
    const [input, todo] = useUnit([model.$input, model.$todos]);

   console.log(todo)

    return  <div>
        <h1>{label}</h1>
        <ul>{todo[0].map(item => <li key={item.id}>{item.title}</li>)}</ul>
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