import { supabaseClient } from "@/lib/supabaseClient";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface TodoCardProps {
  todo: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const TodoCard: FC<TodoCardProps> = ({ todo, todos, setTodos }) => {
  const [isDone, setIsDone] = useState<boolean>(todo.is_done);

  const onClickIsDone = async () => {
    const { error } = await supabaseClient
      .from("todos")
      .update({ is_done: !isDone })
      .eq("id", todo.id);

    if (error) {
      console.error("Error updating todos: ", error);
    } else {
      setIsDone(!isDone);
    }
  };

  const onClickDelete = async () => {
    const { error } = await supabaseClient
      .from("todos")
      .delete()
      .eq("id", todo.id);

    if (error) {
      console.error("Error deleting todos: ", error);
    } else {
      setTodos(todos.filter((v) => v.id !== todo.id));
    }
  };

  return (
    <li className="w-60 flex justify-between">
      <button
        className={`${isDone ? "line-through" : ""}`}
        onClick={onClickIsDone}
      >
        {todo.title}
      </button>
      <button className="underline hover:text-gray-500" onClick={onClickDelete}>
        삭제
      </button>
    </li>
  );
};

export default TodoCard;
