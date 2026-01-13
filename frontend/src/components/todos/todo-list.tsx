"use client";

import { useTodos } from "@/hooks/use-todo";
import { TodoItem } from "./todo-item";

export function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return <div className="text-center py-4">読み込み中...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        エラー: {error.message}
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">Todo がありません</div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
