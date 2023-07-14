import { Todo } from "@/types/types.d";
import Description from "@/app/components/Description";
import dayjs from 'dayjs'
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/ApiHandler";

export function TodoCard(props: {todo: Todo}){


    const mutation = useMutation({
        mutationFn: (data: Todo) => {
            data.done = true
            return apiClient.put(`/ToDoList/${data.ToDoListId}/ToDoItem/${data.id}`, data)
        }
    })


    const onDone = (data: Todo) => mutation.mutate(data)

    const crossed = props.todo.done ? "line-through" : ""

    return (
        <li className="px-6 py-4 mt-3">
        
            <div className="flex justify-between">
                <span className={"font-semibold text-lg " + crossed}>{props.todo.title}</span>
                <span className="text-gray-500 text-xs">Dátum vytvorenia: {dayjs(new Date(props.todo.createdAt)).format("DD.MM.YYYY HH:mm")}</span>
                <span className={props.todo.done ? "text-green-600 text-md" : "text-red-600 text-md"}>Stav</span>
                <button onClick={() => onDone(props.todo)} className="border-green-500 border-solid border-2 bg-green-500 text-white">Mark as complete</button>
            </div>
            <Description todo={props.todo} />
        
        </li>
    )
}