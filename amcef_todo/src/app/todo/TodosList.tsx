"use client";
import * as z from 'zod';
import apiClient from "@/ApiHandler";
import { TodoList, todo, todoSchemaArray } from "@/types/types.d";
import { useQuery } from "@tanstack/react-query";
import { TodoListCreationModal } from "../components/TodoListCreationModal";
import Link from "next/link";
import dayjs from 'dayjs';


async function getTodos() {
    const res = await apiClient.get('/ToDoList').then((res)=>res.data);
    const todos = res as TodoList[];
    // try {
    //     // todoSchemaArray.parse(res)
    // }
    // catch ( e ) {
    //     console.log(e)
    //     alert('Something went wrong with request data')
    // }
    return todos
    
    
}

export function TodosList(props: {showModal: string}){

    const { data } = useQuery({queryKey: ['ToDoList'], queryFn: () => getTodos()})

    if (data){
       return (
        <div className="bg-gray-600">
            <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-slate-900">Moje TodoListy</h2>
                    <a href="/todo?modal=true" className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                        <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                        <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                        </svg>
                        Nový TODO list
                    </a>
                </div>
                
            </header>
            <div className="p-36 grid grid-cols-4 gap-4 justify-center">
                {/* <ul className="bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm"> */}
                        {data.map((td) => {
                            return (
                                <div className="px-6 py-4 mt-3">
                                    <Link href={{
                                        pathname: "/todo/detail",
                                        query: {
                                            id: td.id
                                        }
                                    }}  >
                                        <div className="card w-96 bg-base-100 shadow-xl">
                                            <div className='card-body'>
                                                <span className="font-semibold text-lg">{td.name}</span>
                                                <span className="text-gray-500 text-xs">Dátum vytvorenia: {dayjs(new Date(td.createdAt)).format("DD.MM.YYYY HH:mm")}</span>

                                            </div>
                                            
                                        </div>
                                        {/* <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                                 */}
                                    </Link>
                                </div>
                            )
                        })}
                {/* </ul> */}
                
                
            </div>
            {props.showModal && <TodoListCreationModal/>}
        </div>      
        ) 
    }
    else {
        return <p>Something went wrong</p>
    }
    
}