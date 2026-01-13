export type Todo = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTodoInput = {
  title: string;
  description?: string;
};

export type UpdateTodoInput = {
  title?: string;
  description?: string;
  completed?: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};
