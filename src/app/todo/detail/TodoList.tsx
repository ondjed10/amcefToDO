import Description from "@/app/components/Description";

import dayjs from 'dayjs'
import { Todo } from "@/types/types.d";
import { TodoCard } from "./Todo";

export function TodoList(props: {data: Todo[]}){

    return (
        <div className="">
            {props.data.map((todo) => {
                return (
                    <TodoCard key={todo.id} todo={todo}/>
                )
            })}
        </div>
    )

}