"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { TodoList } from "@/components/todos/todo-list";
import { TodoForm } from "@/components/todos/todo-form";
import { useAuth } from "@/hooks/use-auth";

export default function TodosPage() {
  const { user, signOut } = useAuth();

  return (
    <AuthGuard>
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Todo リスト</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={signOut}
              className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded"
            >
              ログアウト
            </button>
          </div>
        </div>

        <div className="mb-8">
          <TodoForm />
        </div>

        <TodoList />
      </div>
    </AuthGuard>
  );
}
