"use client";

import apiClient from "@/api/ApiHandler";
import { TodoList } from "@/types/apiTypes.d";
import { useQuery } from "@tanstack/react-query";


async function getTodos() {
    const res = await apiClient.get('/ToDoList').then((res)=>res.data);
    const todos = res as TodoList[];
    return todos;
}

export function TodosList(){

    const { data } = useQuery({queryKey: ['ToDoList'], queryFn: () => getTodos()})

    if (data){
       return (
            <div>
                {data.map((td) => {
                    return (
                        <div>
                            <p>{td.name}</p>
                        </div>
                    )
                })}
            </div>
        ) 
    }
    else {
        return <p>Something went wrong</p>
    }
    
}