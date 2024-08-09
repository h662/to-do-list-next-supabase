"use client";

import CreateTodo from "@/components/CreateTodo";
import TodoCard from "@/components/TodoCard";
import { supabaseClient } from "@/lib/supabaseClient";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabaseClient
        .from("todos")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching todos: ", error);
      } else {
        setTodos(data);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="bg-red-100">
      <CreateTodo todos={todos} setTodos={setTodos} />
      <ul className="mt-8 flex flex-col items-center gap-1">
        {todos.map((v) => (
          <TodoCard key={v.id} todo={v} todos={todos} setTodos={setTodos} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
