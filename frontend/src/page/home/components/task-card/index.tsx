import {alpha, Box, Checkbox, IconButton, MenuItem, Select, TextField, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import type {Task} from '../../home.tsx';
import {useState} from 'react';
import {formatDate} from '../../../../utils/date.utils.ts';

type Props = {
  task: Task,
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string, priority: number) => void;
}

const getTaskPriorityStyle = (priority: number): { bg: string, border: string, text: string } => {
  switch (priority) {
    case 0:
      return {
        bg: alpha('#E53935', 0.15),
        border: '#E53935',
        text: '#FFCDD2',
      };
    case 1:
      return {
        bg: alpha('#FB8C00', 0.15),
        border: '#FB8C00',
        text: '#FFE0B2',
      };
    case 2:
      return {
        bg: alpha('#FDD835', 0.15),
        border: '#FDD835',
        text: '#FFF9C4',
      };
    case 3:
      return {
        bg: alpha('#43A047', 0.15),
        border: '#43A047',
        text: '#C8E6C9',
      };
    case 4:
      return {
        bg: alpha('#1E88E5', 0.15),
        border: '#1E88E5',
        text: '#BBDEFB',
      };
    case 5:
    default:
      return {
        bg: alpha('#9E9E9E', 0.12),
        border: '#9E9E9E',
        text: '#E0E0E0',
      };
  }
};

export const TaskCard = ({task, onToggleComplete, onDelete, onEdit}: Props): React.JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(task.content);
  const [priority, setPriority] = useState(task.priority);
  const styles = getTaskPriorityStyle(task.priority);
  
  
  const cancelEditing = (): void => {
    setContent(task.content);
    setIsEditing(false);
  };
  
  const confirmEditing = (): void => {
    onEdit(task.id, content, priority);
    setIsEditing(false);
  };
  
  const startEditing = (): void => setIsEditing(true);
  
  const deleting = (): void => {
    cancelEditing();
    onDelete(task.id);
  };
  
  const completing = (): void => {
    cancelEditing();
    onToggleComplete(task.id);
  };
  
  const priorities = [0, 1, 2, 3, 4, 5];
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
        backgroundColor: styles.bg,
        color: styles.text,
        borderLeft: `4px solid ${styles.border}`,
        px: 2,
        py: 1.5,
        mb: 1,
        cursor: 'pointer',
        opacity: task.done ? 0.5 : 1,
        textDecoration: task.done ? 'line-through' : 'none',
        '&:hover': {
          filter: 'brightness(1.1)',
        },
        '&:hover .actions': {
          opacity: 1,
        }
      }}
    >
      <Checkbox
        disabled={task.done}
        checked={task.done}
        onChange={completing}
        size="small"
      />
      
      <Box sx={{flex: 1}}>
        {isEditing ? (
          <>
            <TextField
              value={content}
              sx={{
                input: {
                  color: styles.text,
                  fontSize: '0.9rem',
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: styles.text,
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: styles.border,
                },
              }}
              onChange={(e) => setContent(e.target.value)}
              size="small"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onEdit(task.id, content, priority);
                  setIsEditing(false);
                }
                if (e.key === 'Escape') {
                  setContent(task.content);
                  setIsEditing(false);
                }
              }}
            />
            <Box sx={{mt: 1}}>
              <Typography fontSize="0.75rem" color={styles.text}>
                Prioridade
              </Typography>
              
              <Select
                size="small"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                sx={{
                  color: styles.text,
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: styles.border,
                  },
                  svg: {color: styles.text},
                }}
              >
                {priorities.map(p => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </>
        ) : (
          <>
            <Typography fontSize="0.9rem">
              {task.content}
            </Typography>
            <Typography
              fontSize="0.75rem"
              sx={{opacity: 0.8, mt: 0.5}}
            >
              {formatDate(task.endDate)} • Priority {task.priority}
            </Typography>
          </>
        )}
      </Box>
      
      <Box
        className="actions"
        sx={{
          display: 'flex',
          gap: 0.5,
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      >
        
        {!task.done && (
          <>
            {isEditing ? (
              <>
                <IconButton
                  size="small"
                  onClick={confirmEditing}
                >
                  <CheckIcon fontSize="small" sx={{color: styles.text}}/>
                </IconButton>
                
                <IconButton
                  size="small"
                  onClick={cancelEditing}
                >
                  <CloseIcon fontSize="small" sx={{color: styles.text}}/>
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  size="small"
                  onClick={startEditing}
                >
                  <EditIcon fontSize="small" sx={{color: styles.text}}/>
                </IconButton>
                
                <IconButton
                  size="small"
                  onClick={deleting}
                >
                  <DeleteIcon fontSize="small" sx={{color: styles.text}}/>
                </IconButton>
              </>
            )}
          </>
        )}
      
      
      </Box>
    </Box>
  );
};