"use client";

import apiClient from "@/ApiHandler";
import { Todo } from "@/types/types.d";
import { useQuery } from "@tanstack/react-query";
import dayjs from 'dayjs'
import Description from "./Description";
import { TodoList } from "@/app/todo/TodosList";
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

    // filteredData = filteredData?.sort((todo1, todo2) => todo2.deadline.getTime() - todo1.deadline.getTime())

    return (
        <div className="bg-gray-600">

            <div className="bg-white h-fit">
                {isLoading ? <div>
                    Loading items...
                </div> : <></>}
                <div className="flex justify-center">   
                
                    
                    <Switch.Group>
                        <div className="flex items-center">
                        <Switch.Label className="mr-4">Done</Switch.Label>
                        <Switch
                            checked={done}
                            onChange={() => setDone(!done)}
                            className={`${done ? 'bg-blue-700' : 'bg-gray-700'}
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
                        <Switch.Label className="mr-4">Active</Switch.Label>
                        <Switch
                            checked={active}
                            onChange={() => setActive(!active)}
                            className={`${active ? 'bg-blue-700' : 'bg-gray-700'}
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
                
                    <Link 
                    href={{
                        pathname: "/todo/detail",
                        query: {
                            id: props.listId,
                            modal: true
                        }
                    }} 
                    >
                    <button className="btn btn-primary ml-6">Add new item</button> </Link>
                    
                    <div className="max-h-fit ml-6">
                        <input value={search} onChange={(e) => changeSearch(e.target.value)} type="text" placeholder="type here to filter results" className="input input-bordered w-full max-w-xs" />

                    </div>
                </div>
            </div>
            
            
            <div className="ps-36 pt-7 flex justify-center">
                
                {filteredData ? <TodoList data={filteredData} /> : <p>No match found</p>}
            </div>
            {props.showModal && <TodoItemModal todoListId={props.listId}/>}
        </div>
    )

}