"use client";

import { Todo } from "@/types/todo";
import { useUpdateTodo, useDeleteTodo } from "@/hooks/use-todo";

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleToggle = () => {
    updateTodo.mutate({ id: todo.id, completed: !todo.completed });
  };

  const handleDelete = () => {
    if (confirm("削除しますか？")) {
      deleteTodo.mutate(todo.id);
    }
  };

  return (
    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-5 h-5 cursor-pointer"
      />
      <div className="flex-1">
        <p
          className={`font-medium ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.title}
        </p>
        {todo.description && (
          <p className="text-sm text-gray-500">{todo.description}</p>
        )}
      </div>
      <button
        onClick={handleDelete}
        disabled={deleteTodo.isPending}
        className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded"
      >
        削除
      </button>
    </li>
  );
}
