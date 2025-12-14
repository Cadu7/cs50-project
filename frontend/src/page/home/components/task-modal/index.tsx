import {
  Box,
  Button,
  Modal,
  TextField,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {useEffect, useState} from 'react';
import type {Moment} from 'moment';
import {getMonth} from '../../../../utils/date.utils.ts';

type Props = {
  open: boolean;
  month: number;
  onClose: () => void;
  onCreate: (data: {
    content: string;
    priority: number;
    endDate: Date;
  }) => void;
};

export const CreateTaskModal = ({ open, month, onClose, onCreate }: Props) => {

  const [content, setContent] = useState('');
  const [priority, setPriority] = useState(3);
  const [date, setDate] = useState<Moment | null>(getMonth(month));
  
  const darkInputSx = {
    '& .MuiInputLabel-root': {
      color: '#E0E0E0',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#E0E0E0',
    },
    '& .MuiOutlinedInput-root': {
      color: '#E0E0E0',
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.3)',
      },
      '&:hover fieldset': {
        borderColor: '#E0E0E0',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#E0E0E0',
      },
    },
    '& .MuiSvgIcon-root': {
      color: '#E0E0E0',
    },
  };
  
  const priorities = [0, 1, 2, 3, 4, 5];
  
  const submit = (): void => {
    if (!content || !date) return;
    
    onCreate({
      content,
      priority,
      endDate: date.toDate(),
    });
    
    setContent('');
    setPriority(3);
    onClose();
  };
  
  useEffect(() => {
    if (open) {
      setDate(getMonth(month));
      setContent('');
      setPriority(3);
    }
  }, [open, month]);
  
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: '#1E2233',
          p: 3,
          borderRadius: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography mb={2} color="#fff" fontWeight={600}>
          New Task
        </Typography>
        
        <Stack spacing={2}>
          <TextField
            sx={darkInputSx}
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
          />
          
          <TextField
            select
            sx={darkInputSx}
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          >
            {priorities.map(p => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>
          
          <DatePicker
            label="Date"
            disablePast={true}
            value={date}
            slotProps={{
              textField: {
                sx: darkInputSx,
              },
            }}
            onChange={(newValue) => setDate(newValue)}
          />
          
          <Button variant="contained" onClick={submit}>
            Criar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
