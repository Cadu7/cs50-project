export type CreateTaskItemRequest = {
  taskListId: string;
  content: string;
  endDate: string; // yyyy-MM-dd
  priority: number;
};

export type UpdateTaskItemRequest = {
  content?: string;
  endDate?: string; // yyyy-MM-dd
  priority?: number;
};