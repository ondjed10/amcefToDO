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
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
})

export const todoItemSchema = z.object({
    id: z.number().optional(),
    ToDoListId: z.number().positive().optional(),
    createdAt: z.date().optional(),
    deadline: z.date(),
    desc: z.string(),
    title: z.string(),
    done: z.boolean().optional()
})

export const todoSchemaArray = z.array(todoSchema)
export const todoItemSchemaArray = z.array(todoItemSchema)

export type todo = z.infer<typeof todoSchemaArray>