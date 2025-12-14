import * as React from 'react';
import {createContext, useContext, useMemo, useState} from 'react';
import type {TaskList} from '../api/type/task_list.response.ts';

type ListsContextType = {
  selectedList: TaskList | undefined | null,
  setSelectedList: (value: TaskList | null) => void
}

const ListsContext = createContext<ListsContextType>({} as ListsContextType);

export const ListsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [selectedTaskList, setSelectedTaskList] = useState<TaskList | null>();
  
  
  const value: ListsContextType = useMemo(() => ({
    selectedList: selectedTaskList,
    setSelectedList: setSelectedTaskList,
  }), [selectedTaskList]);
  
  return (
    <ListsContext.Provider value={value}>
      {children}
    </ListsContext.Provider>
  );
};
export const useLists = (): ListsContextType => useContext(ListsContext);