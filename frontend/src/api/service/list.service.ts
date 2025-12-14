import {api} from '../api.ts';
import type {AxiosResponse} from 'axios';
import type {TaskList} from '../type/task_list.response.ts';
import type {TaskListRequest} from '../type/task_list.request.ts';

export const findAllLists = (): Promise<AxiosResponse<TaskList[]>> => {
  return api.get('/list');
};

export const createNewLists = async (data: TaskListRequest): Promise<void> => {
  await api.post('/list', data);
};
export const deleteList = async (id: string): Promise<void> => {
  await api.delete(`/list/${id}`);
};