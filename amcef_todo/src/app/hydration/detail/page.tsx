import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { Todo } from "@/types/types.d";
import apiClient from "@/ApiHandler";
// import { Todo }
import { TodoListCreationModal } from '@/app/components/TodoListCreationModal';
import { TodoListDetail } from "@/app/components/TodoListDetail";

async function getTodos() {
    const res = await apiClient.get(`/ToDoList/1/ToDoItem`).then((res)=>res.data);
    const todos = res as Todo[];
    return todos;
}

type Props = {
  searchParams: Record<string, string> | null | undefined
}

export default async function Hydation({ searchParams }: Props) {
  
  const showModal = searchParams?.modal
  
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["Todo"], getTodos);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <TodoListDetail
        listId="1"
      />
    </Hydrate>
  );
}