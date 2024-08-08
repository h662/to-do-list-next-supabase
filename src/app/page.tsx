"use client";

import { supabaseClient } from "@/lib/supabaseClient";
import { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabaseClient.from("todos").select("*");

      console.log("data", data);
      console.log("error", error);
    };

    fetchTodos();
  }, []);

  return <div className="bg-red-100">Hello, NextTS!</div>;
};

export default Home;
