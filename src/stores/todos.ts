import React from "react";
import { createStore, createEvent, sample, createEffect } from "effector";
import { ITodo } from "./todos.interface";
import { appStarted } from "../shared/init";

function createTodoListApi(initial: ITodo[]) {
  const insert = createEvent<ITodo>();
  const remove = createEvent<number>();
  const change = createEvent<string>();
  const reset = createEvent<void>();
  const setChecked = createEvent<number>();

  const $input = createStore<string>("");
  const $todos = createStore(initial);


  const fetchTodoFx = createEffect(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const dataTodo = await response.json();    
    return dataTodo
  })

  

  $input.on(change, (_, value) => value);
  $input.reset(insert);
  $todos.on(insert, (todos, newTodo) => [...todos, {id: Math.random() * 10 , title: newTodo, completed: false, userId: Math.random() * 10}]);
  $todos.on(remove, (todos, index) => todos.filter((_, i) => i !== index));
  $todos.on(setChecked, (todos, id) => todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  
  $input.reset(reset);



  const submit = createEvent<React.SyntheticEvent>();
  submit.watch((event) => event.preventDefault());
  
  sample({
    clock: appStarted,
    target: fetchTodoFx,
  })
  
  sample ({
    clock: fetchTodoFx.doneData,
    target: $todos,
  })

  sample({
    clock: submit,
    source: $input,
    target: insert,
  });


  return {
    submit,
    remove,
    change,
    reset,
    setChecked,
    $todos,
    $input,
  };
}

export const firstTodoList = createTodoListApi([]);