"use client";

import { useState } from "react";
import { useCreateTodo } from "@/hooks/use-todo";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createTodo = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTodo.mutate(
      { title, description: description || undefined },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="説明（任意）"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={!title.trim() || createTodo.isPending}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {createTodo.isPending ? "追加中..." : "追加"}
      </button>
    </form>
  );
}
