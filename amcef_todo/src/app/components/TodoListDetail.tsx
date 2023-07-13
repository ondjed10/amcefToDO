"use client";

import apiClient from "@/ApiHandler";
import { Todo, TodoList } from "@/types/types.d";
import { useQuery } from "@tanstack/react-query";



export function TodoListDetail(props: {listId: string}){

    async function getTodos() {
        const res = await apiClient.get(`/ToDoList/1/ToDoItem`).then((res)=>res.data);
        const todos = res as Todo[];
        return todos;
    }
    
    const { data, isLoading, isError } = useQuery({queryKey: ['Todo'], queryFn: () => getTodos()})

    return (
        <div className="bg-teal-400">


            {isLoading ? <div>
                Loading items...
            </div> : <></>}

            <div className="p-36 flex justify-center">
            {data && <ul className="bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm">
                {data.map((todo) => {
                    return (
                        <li className="px-6 py-4 mt-3">
                        
                            <div className="flex justify-between">
                                <span className="font-semibold text-lg">{todo.title}</span>
                                <span className="text-gray-500 text-xs">Dátum vytvorenia: {new Date(todo.createdAt).toISOString()}</span>
                            </div>
                            <p className="text-gray-700">{todo.desc}</p>

                        
                        </li>
                    )
                })}
              </ul> }  
            </div>
           
        </div>
    )




}