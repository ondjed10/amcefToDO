import getQueryClient from "@/app/utils/getQueryClient";
import Hydrate from "@/app/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { TodoList } from "@/types/apiTypes.d";
import apiClient from "@/api/ApiHandler";
import { TodosList } from "./TodosList";

async function getTodos() {
  const res = await apiClient.get('/ToDoList').then((res)=>res.data);
  const todos = res as TodoList[];
  return todos;
}

export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["ToDoList"], getTodos);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <TodosList />
    </Hydrate>
  );
}
