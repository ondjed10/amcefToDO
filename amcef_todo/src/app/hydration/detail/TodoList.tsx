import Description from "@/app/components/Description";

import dayjs from 'dayjs'
import { Todo } from "@/types/types.d";
import { TodoCard } from "./Todo";

export function TodoList(props: {data: Todo[]}){

    return (
        <ul className="bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm">
            {props.data.map((todo) => {
                return (
                    <TodoCard todo={todo}/>
                )
            })}
        </ul>
    )

}