import {Box, styled} from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
}));

export const Content = styled(Box)(() => ({
  margin: '0',
  height: '95vh',
  width: '100vw',
}));
