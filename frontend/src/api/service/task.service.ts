import {api} from '../api.ts';
import type {AxiosResponse} from 'axios';
import type {TaskItem} from '../type/task_item.response.ts';
import type {CreateTaskItemRequest, UpdateTaskItemRequest} from '../type/task_item.request.ts';

export const findAllTasks = (listId: string): Promise<AxiosResponse<TaskItem[]>> => {
  return api.get(`/item/${listId}`);
};
export const createTasks = async (payload: CreateTaskItemRequest): Promise<void> => {
  await api.post('/item', payload);
};

export const updateTasks = async (itemId: string, payload: UpdateTaskItemRequest): Promise<void> => {
  await api.patch(`/item/${itemId}`, payload);
};

export const deleteTasks = async (itemId: string): Promise<void> => {
  await api.delete(`/item/${itemId}`);
};

export const completeTasks = async (itemId: string): Promise<void> => {
  await api.patch(`/item/complete/${itemId}`);
};
