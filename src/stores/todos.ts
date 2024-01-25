import React from "react";
import { createStore, createEvent, sample, createEffect } from "effector";
import { ITodo } from "./todos.interface";
import { appStarted } from "../shared/init";

function createTodoListApi(initial: string[] = []) {
  const insert = createEvent<string>();
  const remove = createEvent<number>();
  const change = createEvent<string>();
  const reset = createEvent<void>();

  const $input = createStore<string>("");
  const $todos = createStore<string[]>(initial);


  const fetchTodoFx = createEffect(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const dataTodo = await response.json();    
    console.log(dataTodo)
    return dataTodo
  })

  

  $input.on(change, (_, value) => value);

  $input.reset(insert);
  $todos.on(insert, (todos, newTodo) => [...todos, newTodo]);
  $todos.on(remove, (todos, index) => todos.filter((_, i) => i !== index));
  
  $input.reset(reset);



  const submit = createEvent<React.SyntheticEvent>();
  submit.watch((event) => event.preventDefault());
  
  sample({
    clock: appStarted,
    target: fetchTodoFx,
  })
  
  sample({
    clock: submit,
    source: $input,
    target: insert,
  });

  sample ({
    clock: fetchTodoFx.doneData,
    target: insert,
  })



  return {
    submit,
    remove,
    change,
    reset,
    $todos,
    $input,
  };
}

export const firstTodoList = createTodoListApi([]);