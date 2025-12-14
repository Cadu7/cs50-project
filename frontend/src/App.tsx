import {AppRoutes} from './route';
import {BrowserRouter} from 'react-router-dom';
import {ListsProvider} from './hooks/useListsContext.tsx';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';

function App(): React.JSX.Element{
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ListsProvider>
          <AppRoutes/>
        </ListsProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
