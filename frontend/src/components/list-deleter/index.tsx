import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { deleteList } from '../../api/service/list.service.ts';
import { useLists } from '../../hooks/useListsContext.tsx';

type Props = {
  onClose: () => void,
  open: boolean
}

export const ListDeleter = ({ open: openCreate, onClose }: Props): React.JSX.Element => {
  const { selectedList } = useLists();

  if (!selectedList) {
    onClose();
    return (<></>);
  }

  const handleDeleteList = (): void => {
    if (!selectedList) { return; }
    deleteList(selectedList.id).then(onClose);
  };

  return (
    <Dialog
      open={openCreate}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Delete list</DialogTitle>

      <DialogContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#ffffff',
            textTransform: 'capitalize',
            letterSpacing: 0.5,
          }}>
        </Typography>
        Are you sure that want to delete the list '{selectedList.name}'
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleDeleteList}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};