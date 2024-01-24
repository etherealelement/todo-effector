import './App.css'
import {TodoList} from "./components/TodoList/TodoList.tsx";
import {todoList} from "./stores/todos.ts";


function App() {
  return (
      <div className={"App"}>
          <TodoList label={"First todo list"} model={todoList} ></TodoList>
      </div>
  )
}

export default App
