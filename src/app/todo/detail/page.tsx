import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { Todo, todoItemSchemaArray } from "@/types/types.d";
import apiClient from "@/ApiHandler";
// import { Todo }
import { TodoListCreationModal } from '@/app/components/TodoListCreationModal';
import { TodoListDetail } from "@/app/todo/detail/TodoListDetail";

async function getTodos(id: string) {
    const res = await apiClient.get(`/ToDoList/${id}/ToDoItem`).then((res)=>res.data);
    const todos = res as Todo[];
    // try {
    //   todoItemSchemaArray.parse(todos)
    //   // alert('success')
    // }
    // catch ( e ){
    //   console.log(e)
    //   alert('Something went wrong with request data')
    // }
    

    return todos;
}

type Props = {
  searchParams: Record<string, string> | null | undefined
}

export default async function Hydation({ searchParams }: Props) {
  
  const id = searchParams?.id || "1"
  const showModal = searchParams?.modal || ""
  
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["Todo"], () => getTodos(id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <TodoListDetail
        listId={id}
        showModal={showModal}
      />
    </Hydrate>
  );
}