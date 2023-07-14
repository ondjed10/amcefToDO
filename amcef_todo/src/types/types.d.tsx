import { z } from "zod"

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
    title: string,
    done: boolean
}

export type TodoCreationData = {
    title: string,
    deadline: Date,
    desc: string
}

export const todoSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const todoItemSchema = z.object({
    id: z.number().optional(),
    ToDoListId: z.number().positive(),
    createdAt: z.date(),
    deadline: z.date().min(new Date()),
    desc: z.string(),
    title: z.string(),
    done: z.boolean()
})

export const todoSchemaArray = z.array(todoSchema)
export const todoItemSchemaArray = z.array(todoItemSchema)

export type todo = z.infer<typeof todoSchemaArray>