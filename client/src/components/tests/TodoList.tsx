import { useQuery } from "@tanstack/react-query";

import fetchTodos from "@/services/fetch-summy-todos";
import { Todo } from "@/types/declaration";

const TodosList: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {data &&
          data.todos.map((todo: Todo) => <li key={todo.id}>{todo.todo}</li>)}
      </ul>
    </div>
  );
};

export default TodosList;
