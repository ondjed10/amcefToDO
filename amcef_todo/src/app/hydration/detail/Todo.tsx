import { Todo } from "@/types/types.d";
import Description from "@/app/components/Description";
import dayjs from 'dayjs'

export function TodoCard(props: {todo: Todo}){


    return (
        <li className="px-6 py-4 mt-3">
        
            <div className="flex justify-between">
                <span className="font-semibold text-lg">{props.todo.title}</span>
                <span className="text-gray-500 text-xs">Dátum vytvorenia: {dayjs(new Date(props.todo.createdAt)).format("DD.MM.YYYY HH:mm")}</span>
            </div>
            <Description todo={props.todo} />
        
        </li>
    )
}