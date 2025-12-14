import {Outlet} from 'react-router-dom';
import {Container, Content} from './structure-styles';
import {Header} from '../../components/header';

export const Structure = (): React.JSX.Element => {
  return (
    <Container>
      <Header/>
      <Content>
        <Outlet/>
      </Content>
    </Container>
  );
};