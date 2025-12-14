import {Route, Routes} from 'react-router-dom';
import {Structure} from './structure/structure.tsx';
import {Home} from '../page/home/home.tsx';

export const AppRoutes = (): React.JSX.Element => {
  return (
    <Routes>
      <Route path={'/'} element={<Structure/>}>
        <Route path={'/'} element={<Home/>}></Route>
      </Route>
    </Routes>
  );
};