import { styled } from '@mui/material';
import { Header } from './components/Header';

const MainContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const App = () => (
  <>
    <Header />
    <MainContent />
  </>
);

export default App;
