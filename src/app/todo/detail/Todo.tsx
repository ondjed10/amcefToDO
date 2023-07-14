import { Todo } from "@/types/types.d";
import Description from "@/app/components/Description";
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/ApiHandler";

export function TodoCard(props: {todo: Todo}){


    const mutation = useMutation({
        mutationFn: (data: Todo) => {
            data.done = true
            return apiClient.put(`/ToDoList/${data.ToDoListId}/ToDoItem/${data.id}`, data)
        }
    })

    const queryClient = useQueryClient()
    const deleteTodo = useMutation({
        mutationFn: (data: Todo) => {
            return apiClient.delete(`/ToDoList/${data.ToDoListId}/ToDoItem/${data.id}`)
        },
        onMutate: async (data: Todo) => {
            await queryClient.cancelQueries(['Todo'])

            const prev = queryClient.getQueryData(['Todo'])

            queryClient.setQueryData(['Todo'], (old: any) => old.filter((todo: Todo) => todo.id !== data.id) )

            return { prev }
        }
    })


    const onDone = (data: Todo) => mutation.mutate(data)

    const onDelete = (data: Todo) => deleteTodo.mutate(data)

    const crossed = props.todo.done ? "line-through" : ""

    return (
        <div className="px-6 py-4 mt-3">
        
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <span className={"font-semibold text-lg " + crossed}>{props.todo.title}</span>
                    <span className="text-gray-500 text-xs">Created: {dayjs(new Date(props.todo.createdAt)).format("DD.MM.YYYY HH:mm")}</span>
                    <span className={props.todo.done ? "text-green-600 text-md" : "text-red-600 text-md"}>{props.todo.done ? "Done" : "Active"}</span>
                    <div className="card-actions justify-end">
                        {!props.todo.done && <button onClick={() => onDone(props.todo)} className="btn btn-success">Mark as complete</button>}
                        <button onClick={() => onDelete(props.todo)} className="btn btn-error">Delete todo</button>
                    </div>
                    <Description todo={props.todo} />
                </div>

            </div>
            
        
        </div>
    )
}