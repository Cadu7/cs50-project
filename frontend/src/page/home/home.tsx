import {Box, Card, CardContent, IconButton, Typography} from '@mui/material';
import {useLists} from '../../hooks/useListsContext.tsx';
import {useEffect, useState} from 'react';
import type {TaskList} from '../../api/type/task_list.response.ts';
import {completeTasks, createTasks, deleteTasks, findAllTasks, updateTasks} from '../../api/service/task.service.ts';
import {getNextMonths} from '../../utils/date.utils.ts';
import type {TaskItem} from '../../api/type/task_item.response.ts';
import {TaskCard} from './components/task-card';
import AddIcon from '@mui/icons-material/Add';
import {CreateTaskModal} from './components/task-modal';
import moment from 'moment';

export type Task = {
  id: string;
  content: string;
  endDate: Date;
  priority: number;
  done: boolean;
}

type MonthColumn = {
  month: string;
  tasks: Task[];
};

export const Home = () => {
  
  const [monthsData, setMonthsData] = useState<MonthColumn[]>([]);
  const [reloadFlag, setReloadFlag] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const {selectedList} = useLists();
  const monthsShows = 4;
  
  const openCreateModal = (monthName: string): void => {
    const monthIndex = getNextMonths(monthsShows)
      .find(m => m.monthName === monthName)?.monthNumber;
    
    if (monthIndex !== undefined) {
      setSelectedMonth(monthIndex - 1);
      setOpenModal(true);
    }
  };
  
  const closeModal = () => setOpenModal(false);
  
  const groupTasksByMonth = (data: TaskItem[]) => {
    const mapped: Task[] = data.map((i) => ({
      ...i,
      endDate: moment(i.endDate, 'YYYY-MM-DD').toDate()
    }));
    
    console.log({
      mapped, data
    });
    
    const months: MonthColumn[] = getNextMonths(monthsShows).map(month => {
      const tasks = mapped.filter(t => (t.endDate.getMonth() + 1) === month.monthNumber);
      return {
        month: month.monthName,
        tasks
      };
    });
    setMonthsData(months);
  };
  
  const loadTasks = (selectedList: TaskList) => {
    findAllTasks(selectedList.id)
      .then(({data}) => groupTasksByMonth(data));
  };
  
  const onEditCard = (id: string, content: string, priority: number): void => {
    updateTasks(id, {content: content, priority: priority}).then(() => setReloadFlag(prev => prev + 1));
  };
  
  const onCompleteCard = async (id: string): Promise<void> => {
    completeTasks(id).then(() => setReloadFlag(prev => prev + 1));
  };
  
  const onDeleteCard = async (id: string): Promise<void> => {
    deleteTasks(id).then(() => setReloadFlag(prev => prev + 1));
  };
  
  const onCreateTask = async (data: { content: string, endDate: Date, priority: number }): Promise<void> => {
    if (!selectedList) {
      return;
    }

    createTasks({
      taskListId: selectedList.id,
      content: data.content,
      priority: data.priority,
      endDate: data.endDate.toISOString().split('T')[0],
    }).then(() => setReloadFlag(prev => prev + 1));
  };
  
  useEffect(() => {
    if (selectedList) {
      loadTasks(selectedList);
    }
  }, [selectedList, loadTasks, reloadFlag]);
  
  if (!selectedList) {
    return (
      <Box
        sx={{
          padding: 3,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#c0c0c0',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>
          Please, select a list to visualize the tasks
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box
      sx={{
        padding: 3,
        minHeight: '100vh',
        background: '#c0c0c0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          width: '100%',
        }}
      >
        {monthsData.map((column) => (
          <Box
            key={column.month}
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Card
              sx={{
                height: '100%',
                backgroundColor: '#1E2233',
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: '#6C6FD9',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#ffffff',
                    textTransform: 'capitalize',
                    letterSpacing: 0.5,
                  }}
                >
                  {column.month}
                </Typography>
                
                <IconButton
                  size="small"
                  onClick={() => openCreateModal(column.month)}
                  sx={{color: '#fff'}}
                >
                  <AddIcon/>
                </IconButton>
              </CardContent>
              
              <CardContent sx={{flex: 1}}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  {column.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={onEditCard}
                      onToggleComplete={onCompleteCard}
                      onDelete={onDeleteCard}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      {selectedMonth !== null && (
        <CreateTaskModal
          open={openModal}
          month={selectedMonth}
          onClose={closeModal}
          onCreate={onCreateTask}
        />
      )}
    </Box>
  );
};