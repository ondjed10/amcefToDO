"use client";

import apiClient from "@/ApiHandler";
import { TodoList } from "@/types/types.d";
import { useQuery } from "@tanstack/react-query";
import { TodoListCreationModal } from "../components/TodoListCreationModal";


async function getTodos() {
    const res = await apiClient.get('/ToDoList').then((res)=>res.data);
    const todos = res as TodoList[];
    return todos;
}

export function TodosList(props: {showModal: string}){

    const { data } = useQuery({queryKey: ['ToDoList'], queryFn: () => getTodos()})

    if (data){
       return (
        <div className="bg-teal-400">
            <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-slate-900">Moje TodoListy</h2>
                    <a href="/hydration?modal=true" className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                        <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                        <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                        </svg>
                        Nový TODO list
                    </a>
                </div>
                <form className="group relative">
                    <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                    </svg>
                    <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects..." />
                </form>
            </header>
            <div className="p-36 flex justify-center">
                <ul className="bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm">
                        {data.map((td) => {
                            return (
                                <li className="px-6 py-4 mt-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-lg">{td.name}</span>
                                        <span className="text-gray-500 text-xs">Dátum vytvorenia: {new Date(td.createdAt).toISOString()}</span>
                                    </div>
                                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                                </li>
                            )
                        })}
                </ul>
                
                
            </div>
            {props.showModal && <TodoListCreationModal/>}
        </div>      
        ) 
    }
    else {
        return <p>Something went wrong</p>
    }
    
}