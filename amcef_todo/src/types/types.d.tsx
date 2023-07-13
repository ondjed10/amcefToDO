export type TodoList = {
    id?: number,
    name: string,
    createdAt: Date,
    updatedAt: Date
}

export type TodoListCreationData = {
    name: string
}

export type Todo = {
    ToDoListId: number,
    id? : number,
    createdAt: Date,
    deadline: Date,
    desc: string,
    title: string
}

export type TodoCreationData = {
    title: string,
    deadline: Date,
    desc: string
}