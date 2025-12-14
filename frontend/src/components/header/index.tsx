import {
  AppBar,
  Box,
  Dialog,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import {useLists} from '../../hooks/useListsContext.tsx';
import {useEffect, useState} from 'react';
import {findAllLists} from '../../api/service/list.service.ts';
import type {TaskList} from '../../api/type/task_list.response.ts';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ListCreator } from '../list-creator';
import { ListDeleter } from '../list-deleter';

export const Header = (): React.JSX.Element => {
  
  const [options, setOptions] = useState<TaskList[]>([]);
  const [selectId, setSelectId] = useState<string>('');
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const {setSelectedList} = useLists();
  
  const handleChange = (event: SelectChangeEvent<string>): void => {
    const selectedId = event.target.value;
    const selectedFilter = options.find(
      (option) => option.id === selectedId
    ) || null;
    if (selectedFilter) {
      setSelectId(selectedId);
      setSelectedList(selectedFilter);
    }
  };
  
  const loadOptions = (): void => {
    findAllLists().then(({data}) => setOptions(data));
  };
  
  useEffect(() => {
    loadOptions();
  }, []);
  
  
  const closeCreateNewList = (): void => {
    setOpenCreate(false);
    loadOptions();
  };
  
  const openCreateNewList = (): void => setOpenCreate(true);
  
  const closeDeleteList = (): void => {
    setOpenDelete(false);
    setSelectId('');
    setSelectedList(null);
    loadOptions();
  };
  
  const openDeleteList = (): void => setOpenDelete(true);
  
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        
        <Box sx={{flex: 1, display: 'flex', alignItems: 'center', gap: 1}}>
          <Tooltip title="Create new list of tasks">
            <IconButton
              color="primary"
              size="small"
              onClick={openCreateNewList}
            >
              <AddIcon sx={{color: 'black'}}/>
            </IconButton>
          </Tooltip>
          {selectId !== '' && (
            <Tooltip title="Delete current list of tasks">
              <IconButton
                color="primary"
                size="small"
                onClick={openDeleteList}
              >
                <RemoveIcon sx={{color: 'black'}}/>
              </IconButton>
            </Tooltip>
          )}
          <FormControl size="small" required>
            <Select
              value={selectId}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        <Typography
          variant="h4"
          component="h1"
          sx={{flex: 1, textAlign: 'center', fontWeight: 600}}
        >
          tasks to do
        </Typography>
        
        <Box sx={{flex: 1}}/>
      </Toolbar>
      <Dialog
        open={openCreate}
        onClose={closeCreateNewList}
        fullWidth
        maxWidth="xs"
      >
        <ListCreator open={openCreate} onClose={closeCreateNewList}/>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={closeDeleteList}
        fullWidth
        maxWidth="xs"
      >
        <ListDeleter open={openDelete} onClose={closeDeleteList}/>
      </Dialog>
    </AppBar>
  );
};