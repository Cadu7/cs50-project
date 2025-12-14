import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {useState} from 'react';
import {createNewLists} from '../../api/service/list.service.ts';

type Props = {
  onClose: () => void,
  open: boolean
}

export const ListCreator = ({open: openCreate, onClose}: Props): React.JSX.Element => {
  const [newListName, setNewListName] = useState('');
  
  const handleCreateList = (name: string): void => {
    createNewLists({
      name
    }).then(onClose);
  };
  
  return (
    <Dialog
      open={openCreate}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Create new list</DialogTitle>
      
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name of list"
          fullWidth
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        
        <Button
          variant="contained"
          disabled={!newListName.trim()}
          onClick={() => handleCreateList(newListName)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};