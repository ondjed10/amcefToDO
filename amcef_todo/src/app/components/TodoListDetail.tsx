"use client";

import apiClient from "@/ApiHandler";
import { Todo } from "@/types/types.d";
import { useQuery } from "@tanstack/react-query";
import dayjs from 'dayjs'
import Description from "./Description";
import { TodoList } from "../hydration/detail/TodoList";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { TodoItemModal } from "./TodoItemModal";
import Link from "next/link";


export function TodoListDetail(props: {listId: string, showModal: string}){

    async function getTodos() {
        const res = await apiClient.get(`/ToDoList/${props.listId}/ToDoItem`).then((res)=>res.data);
        const todos = res as Todo[];
        return todos;
    }
    
    const { data, isLoading, isError } = useQuery({queryKey: ['Todo'], queryFn: () => getTodos()})

    const [search, setSearch] = useState("")
    const [done, setDone] = useState(false)
    const [active, setActive] = useState(false)
    const [toggleNew, setToggleNew] = useState(false)

    const changeSearch = (value: string) => {
        setSearch(value)
    }

    let filteredData = data

    if (done && active) {
        console.log('nothing happens')
    }
    else if (done) {
        filteredData = filteredData?.filter((todo) => todo.done === true)
    }
    else if (active){
        filteredData = filteredData?.filter((todo) => todo.done === false)
    }

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
                    
                    <Switch.Group>
                        <div className="flex items-center">
                        <Switch.Label className="mr-4">Show only done todos</Switch.Label>
                        <Switch
                            checked={done}
                            onChange={() => setDone(!done)}
                            className={`${done ? 'bg-teal-900' : 'bg-teal-700'}
                            relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                            aria-hidden="true"
                            className={`${done ? 'translate-x-9' : 'translate-x-0'}
                                pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                    </div>
                    </Switch.Group>

                    <Switch.Group>
                        <div className="flex items-center">
                        <Switch.Label className="mr-4">Show only active todos</Switch.Label>
                        <Switch
                            checked={active}
                            onChange={() => setActive(!active)}
                            className={`${active ? 'bg-teal-900' : 'bg-teal-700'}
                            relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                            aria-hidden="true"
                            className={`${active ? 'translate-x-9' : 'translate-x-0'}
                                pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                    </div>
                    </Switch.Group>
                </div>
                    <Link 
                    href={{
                        pathname: "/hydration/detail",
                        query: {
                            id: props.listId,
                            modal: true
                        }
                    }} 
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add new one</Link>
                </div>
            </div>
            
            
            <div className="ps-36 pt-7 flex justify-center">
                
                {filteredData ? <TodoList data={filteredData} /> : <p>No match found</p>}
            </div>
            {props.showModal && <TodoItemModal todoListId={props.listId}/>}
        </div>
    )

}