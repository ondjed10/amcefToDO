"use client";

import apiClient from "@/ApiHandler";
import { Todo } from "@/types/types.d";
import { useQuery } from "@tanstack/react-query";
import dayjs from 'dayjs'
import Description from "./Description";
import { TodoList } from "../hydration/detail/TodoList";
import { useState } from "react";


export function TodoListDetail(props: {listId: string}){

    async function getTodos() {
        const res = await apiClient.get(`/ToDoList/1/ToDoItem`).then((res)=>res.data);
        const todos = res as Todo[];
        return todos;
    }
    
    const { data, isLoading, isError } = useQuery({queryKey: ['Todo'], queryFn: () => getTodos()})

    const [search, setSearch] = useState("")

    const changeSearch = (value: string) => {
        setSearch(value)
    }

    let filteredData = data
    if (search) {
        filteredData = filteredData?.filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
    }

    return (
        <div className="bg-teal-400">


            {isLoading ? <div>
                Loading items...
            </div> : <></>}

            <div className="bg-white pl-16 pr-16">
                <div className="ps-16 pt-24  flex justify-center">   
                <div>
                <input value={search} type="text" id="first_name" onChange={(e) => changeSearch(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                </div>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add new one</button>
                </div>
            </div>
            
            
            <div className="ps-36 pt-7 flex justify-center">
            
                {filteredData ? <TodoList data={filteredData} /> : <p>No match found</p>}
            </div>
           
        </div>
    )




}