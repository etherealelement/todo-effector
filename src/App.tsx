import './App.css'
import {TodoList} from "./components/TodoList/TodoList.tsx";
import { firstTodoList } from './stores/todos.ts';


function App() {
  return (
      <div className={"App"}>
          <TodoList label={"First todo list"} model={firstTodoList}></TodoList>
      </div>
  )
}

export default App
