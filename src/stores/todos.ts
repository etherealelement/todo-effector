import {createEvent, createStore, sample} from "effector";

function createTodoListApi(initial: string[] = []) {
    // Events
    const insert = createEvent();
    const remove = createEvent();
    const change = createEvent();
    const reset = createEvent();

    // Stores
    const $input = createStore<string>("");
    const $todos = createStore<string[]>(initial)

    $input.on(change, (_,value) => value);

    $input.reset(insert);
    $todos.on(insert, (todos, newTodo) => [...todos, newTodo]);
    $todos.on(remove, (todos, index) => todos.filter((_,i) => i !== index));
    $input.reset(reset);


    const submit = createEvent<React.SyntheticEvent>();
    submit.watch((event) => event.preventDefault());

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
        $todos,
        $input,
    };
}

export const todoList = createTodoListApi(["hello"]);