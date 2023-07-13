"use client";

import apiClient from "@/ApiHandler";
import { Todo, TodoList } from "@/types/types.d";
import { useQuery } from "@tanstack/react-query";
import dayjs from 'dayjs'
import { Disclosure } from "@headlessui/react";
import Description from "./Description";


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

            <div className="ps-16 pt-24 flex justify-center">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add new one</button>
            </div>
            
            <div className="ps-36 pt-7 flex justify-center">
            
            {data && <ul className="bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm">
                {data.map((todo) => {
                    return (
                        <li className="px-6 py-4 mt-3">
                        
                            <div className="flex justify-between">
                                <span className="font-semibold text-lg">{todo.title}</span>
                                <span className="text-gray-500 text-xs">Dátum vytvorenia: {dayjs(new Date(todo.createdAt)).format("DD.MM.YYYY HH:mm")}</span>
                            </div>
                            <Description todo={todo} />
                        
                        </li>
                    )
                })}
              </ul> }  
            </div>
           
        </div>
    )




}