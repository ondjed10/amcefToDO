"use client";
import * as z from 'zod';
import apiClient from "@/ApiHandler";
import { TodoList, TodoListCreationData } from "@/types/types.d";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from "react";

const todoSchema = z.object({
  name: z.string(),
});

type todo = z.infer<typeof todoSchema>
export function TodoListCreationModal() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<todo>({
    resolver: zodResolver(todoSchema)
  })

  const mutation =  useMutation({
    mutationFn: (data: TodoListCreationData) => {
        let todo: TodoList = {
            name: data.name,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        return apiClient.post('/ToDoList', todo)
    }
    })
  

  const onSubmit = useCallback((data: todo) => mutation.mutate(data),[])

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      id="error-modal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Nový TODO list
              </h3>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                  <label className="label">
                      <span className="label-text">Name</span>
                  </label>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" {...register('name')}/>
              </div>
            
              <input className='btn btn-primary mt-5' type="submit" />
          </form>  
        
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <Link
              href="/todo"
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Exit
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
