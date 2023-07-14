import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { TodoList } from "@/types/types.d";
import apiClient from "@/ApiHandler";
import { TodosList } from "./TodosList";
import { TodoListCreationModal } from '@/app/components/TodoListCreationModal';

async function getTodos() {
  const res = await apiClient.get('/ToDoList').then((res)=>res.data);
  const todos = res as TodoList[];
  return todos;
}

type Props = {
  searchParams: Record<string, string> | null | undefined
}

export default async function Hydation({ searchParams }: Props) {
  
  const showModal = searchParams?.modal
  
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["ToDoList"], getTodos);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <TodosList 
        showModal={showModal}
      />
    </Hydrate>
  );
}
