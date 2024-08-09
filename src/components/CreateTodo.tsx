import { useAuth } from "@/context/AuthContext";
import { supabaseClient } from "@/lib/supabaseClient";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

interface CreateTodoProps {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const CreateTodo: FC<CreateTodoProps> = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const { session } = useAuth();

  const onSubmitCreateTodo = async (e: FormEvent) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    const { error } = await supabaseClient
      .from("todos")
      .insert({ title: newTodo, user_id: session?.user.id });

    if (error) {
      console.error("Error creating todo: ", error);
    } else {
      const { data } = await supabaseClient
        .from("todos")
        .select("*")
        .order("id", { ascending: false })
        .limit(1)
        .single();

      setTodos([...todos, data]);
    }
  };

  return (
    <form
      className="flex justify-center mt-8 gap-4"
      onSubmit={onSubmitCreateTodo}
    >
      <input
        className="border-2 focus:outline-none focus:border-gray-500 px-2 py-1"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <input className="underline hover:text-gray-500" type="submit" />
    </form>
  );
};

export default CreateTodo;
