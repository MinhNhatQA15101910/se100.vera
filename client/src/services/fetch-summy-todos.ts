import { TodosResponse } from '@/types/declaration';

const fetchTodos = async (): Promise<TodosResponse> => {
  const response = await fetch('https://dummyjson.com/todos');
  return response.json();
};

export default fetchTodos;
