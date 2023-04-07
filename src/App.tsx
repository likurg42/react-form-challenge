import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { styled } from '@mui/material';
import { Header } from './components/Header';
import { StepOne } from './pages/StepOne';
import { StepTwo } from './pages/StepTwo';
import { StepThree } from './pages/StepThree';
import { Result } from './pages/Result';

const MainContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const App = () => (
  <>
    <Header />
    <MainContent>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StepOne />} />
          <Route path="/step-2" element={<StepTwo />} />
          <Route path="/step-3" element={<StepThree />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </MainContent>
  </>
);

export default App;
