import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
  ApiResponse,
} from "@/types/todo";

// Todo 一覧取得
export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await apiClient<ApiResponse<Todo[]>>("/todos");
      return response.data;
    },
  });
}

// Todo 作成
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTodoInput) => {
      const response = await apiClient<ApiResponse<Todo>>("/todos", {
        method: "POST",
        body: JSON.stringify(input),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

// Todo 更新
export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateTodoInput & { id: string }) => {
      const response = await apiClient<ApiResponse<Todo>>(`/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

// Todo 削除
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient(`/todos/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
